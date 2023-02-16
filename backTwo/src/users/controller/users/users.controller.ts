import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {UpdateUserDto} from "../../dtos/UpdateUser.dto";
import {DeleteUserDto} from "../../dtos/DeleteUser.dto";
import {ApiOkResponse, ApiTags, ApiCreatedResponse, ApiForbiddenResponse, ApiUnprocessableEntityResponse} from '@nestjs/swagger'


@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){};


    @Get()
    @ApiOkResponse({description:'the resource was returned successfully'})
    getUsersList(){
        return this.userService.getUsersList();
    }


    @Get('user/:username')
     findOneUser(@Param('username') username:string){
       return this.userService.findUser(username);
    }


    @Post('create')
    @ApiCreatedResponse({description:'Created successfully'})
    @ApiUnprocessableEntityResponse({description:'Bad request'})
    @ApiForbiddenResponse({description:'Unauthorized request'})
    async createNewUser(@Body() createUserDto:CreateUserDto){
        await this.userService.saveNewUser(createUserDto);
    }


    // delete user get
    @Get('delete/:id')
    async deleteUser(@Param('id', ParseIntPipe) id:number){
        await this.userService.deleteUser(id)
    }


    // delete user post
    @Post('delete')
    async deleteUserPost(@Body() deleteUserDto:DeleteUserDto){
       await this.userService.deleteUser(deleteUserDto.id);
    }

    @Post('update')
    async updateUser(@Body() updateUserDto: UpdateUserDto){
        const userId = updateUserDto.id;
      await this.userService.updateUserInfo(userId, updateUserDto)
    }

}
