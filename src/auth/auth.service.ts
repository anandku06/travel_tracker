import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaModService } from 'src/prisma_mod/prisma_mod.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaModService,
    private jwtService: JwtService,
  ) {}

  // handle user registration
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    // check if user already exists
    const existUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existUser) {
      throw new ConflictException('User already exists!');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user to database
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // return user without password
    const { password: _, ...result } = newUser;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ConflictException('Invalid credentials!');
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password!');
    }

    const token = this.jwtService.sign({
      userId: user.id,
    });

    const { password: _, ...result } = user;
    return { ...result, token };
  }
}
