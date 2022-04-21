import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [MongooseModule.forFeature([{
    name: User.name, schema: UserSchema,
  }]), AuthModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
