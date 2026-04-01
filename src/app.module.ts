import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModModule } from './prisma_mod/prisma_mod.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
