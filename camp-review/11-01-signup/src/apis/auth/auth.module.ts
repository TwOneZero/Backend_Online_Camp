import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtAccessStrategy } from './strategy/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => ({
      //   // secret: configService.get<string>('JWT_SECRET'),
      //   // signOptions: {
      //   //   expiresIn: configService.get<string>('JWT_EXPIRE'),
      //   // },
      // }),
    }),
  ],
  providers: [AuthResolver, AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
