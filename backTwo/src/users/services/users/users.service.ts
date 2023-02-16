import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm'
import {User} from "../../../typeorm/entitis/User";
import {Repository} from "typeorm";
import {CreateUserParams, UpdateUserParams} from "../../../utils/Types";

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User) private userRepository:Repository<User>){};

    getUsersList(){
        return this.userRepository.find();
    }


  async saveNewUser(createUserParam:CreateUserParams){
        const newUser = this.userRepository.create(createUserParam);
        await this.userRepository.save(newUser);
    }



   async deleteUser(id:number){
         await this.userRepository.delete({id});
    }



    async updateUserInfo(id:number, updateUserParam:UpdateUserParams){
       await this.userRepository.update({id}, {...updateUserParam})
    }


    findUser(username:string){
       return this.userRepository.findOneBy({username});

    }
}
