import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [MongooseModule.forFeature([{
    name: User.name, schema: UserSchema,
  }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
