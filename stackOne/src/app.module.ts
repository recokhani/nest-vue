import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import {User} from "./typeorms/entity/User";
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import {Task} from "./typeorms/entity/Task.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      port:3306,
      host:'localhost',
      username:'root',
      password:'reco2626',
      database:'stackone',
      entities:[User, Task],
      synchronize:true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
      UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
