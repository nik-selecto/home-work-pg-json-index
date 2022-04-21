import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { User, UserSchema } from "../users/user";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({})],
  providers: [LocalStrategy, JwtAccessStrategy, AuthService],
  exports: [JwtAccessStrategy],
})
export class AuthModule { }