import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./typeorm/entitis/User";
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
      TypeOrmModule.forRoot({
        type:'mysql',
        host:'localhost',
        port:3306,
        username:'root',
        password:'reco2626',
        database:'reconest',
        entities:[User],
        synchronize:true,
      })
      ,UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
