import {BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Render, Res} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from "./dtos/CreateUser.dto";
import {LoginUserDto} from "./dtos/LoginUser.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import { UpdateUserDto} from "./dtos/UpdateUser.dto";
import {DeleteUserDto} from "./dtos/DeleteUser.dto";
import {CreateTaskDto} from "./dtos/CreateTask.dto";
import {ShowUserTaskDto} from "./dtos/ShowUserTask.dto";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {
    };

    // @Get('users')
    // @Render('index')



    @Get()
    async fetchAllUserList(@Res() res) {
        const allUser =await  this.usersService.getAllUser();
        return res.json({
            data:allUser,
        })
    }


    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto, @Res() res) {
      const user =   await this.usersService.createUser(createUserDto);

      const {password, ...result} = user;
        return res.status(200).json({
            data:result,
            message: 'user successfully created'
        })
    }


    @Post('login')
    async userLoginByUserName(@Body() loginUserDto: LoginUserDto, @Res() res) {
        const username = loginUserDto.username;
        const password = loginUserDto.password;
        const user = await this.usersService.findOneUser({username});

        if (!user) {
            throw new BadRequestException('user dont exist')
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('password is not correct')
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        return res.status(200).json({
            token: jwt,
            message: ' user successfully loggedIn'
        })
    }


    @Post('update')
    async updateUserInfo(@Body() updateUserDto: UpdateUserDto, @Res() res) {
        const userId = updateUserDto.id;
        const user = await this.usersService.updateUser(userId, updateUserDto);

        return res.status(200).json({
            data: user,
            message: 'user successfully updated'
        })
    }


    @Post('delete')
    async deleteUser(@Body() deleteUserDto: DeleteUserDto, @Res() res){
        const userId = deleteUserDto.id;
         await this.usersService.deleteUser(userId);

        return res.status(200).json({
            message:'user successfully deleted'
        })
    }


    @Post('task/save')
    async saveTask(@Body() createTaskDto: CreateTaskDto){
        const task = await this.usersService.createTask(createTaskDto);
        return task;
    }


    @Post('tasks')
    showUserTask(@Body() showUserTaskDto: ShowUserTaskDto){
        return this.usersService.getUserTask(showUserTaskDto.id);

    }

    @Get('tasks')
    getAllTask(){
        return this.usersService.getAllTask()
    }
}
