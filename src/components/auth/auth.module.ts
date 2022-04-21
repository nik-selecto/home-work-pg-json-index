import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { ProjectConfigType } from "../../general-modules/config/config.type";
import { User, UserSchema } from "../users/user";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.registerAsync({
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
  providers: [LocalStrategy, JwtStrategy, AuthService],
  exports: [JwtStrategy],
})
export class AuthModule { }