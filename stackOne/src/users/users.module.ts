import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import {User} from "../typeorms/entity/User";
import { JwtModule } from '@nestjs/jwt'
import {Task} from "../typeorms/entity/Task.entity";

@Module({
  imports:[TypeOrmModule.forFeature([User,Task]),
    JwtModule.register({
      secret:'secret',
      signOptions:{expiresIn:'1d'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
