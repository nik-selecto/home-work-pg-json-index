import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ProjectConfigType } from "../../general-modules/config/config.type";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, UsersModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory(config: ConfigService<ProjectConfigType>) {
      return {
        secret: config.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: '20s',
        },
      };
    },
  })],
  providers: [LocalStrategy, AuthService],
})
export class AuthModule { }