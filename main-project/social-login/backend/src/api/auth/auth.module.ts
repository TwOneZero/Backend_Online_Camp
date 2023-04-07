import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh..strategy';
import { AuthController } from './auth.controller';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-goole.strategy';
import { JwtNaverStrategy } from 'src/common/auth/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from 'src/common/auth/jwt-social-kakao.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthResolver,
    AuthService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
