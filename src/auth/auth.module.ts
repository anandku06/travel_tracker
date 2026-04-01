import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModModule } from 'src/prisma_mod/prisma_mod.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModModule,
    // register the JwtModule with a factory function to get the secret from environment variables
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET is not defined in environment variables');
        }
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

/**
 * Why not using the JwtModule.register()?
 * Using JwtModule.register() would require us to directly access process.env.JWT_SECRET at the time of module registration, which can lead to issues if the environment variable is not set or if we want to have more control over how the secret is provided (e.g., through a configuration service). 
 * By using JwtModule.registerAsync(), we can inject the ConfigService and retrieve the JWT secret in a more flexible and robust way, ensuring that our application can handle missing or misconfigured environment variables gracefully.
 */

/**
 * registerAsync() allows us to use a factory function to dynamically provide the configuration for the JwtModule, which is particularly useful when we need to access environment variables or other asynchronous sources of configuration.
 */