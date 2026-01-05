import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExternalService } from './external.service';
import { JwtModule } from '@nestjs/jwt';
import { authJwtFactory } from './auth.factory';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: authJwtFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ExternalService],
})
export class AuthModule {}
