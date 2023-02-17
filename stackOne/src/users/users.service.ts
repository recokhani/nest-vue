import {Injectable} from '@nestjs/common';
import {User} from "../typeorms/entity/User";
import {InjectRepository} from '@nestjs/typeorm';
import {getRepository, Repository} from "typeorm";
import {CreateTaskParams, CreateUserParams, UpdateUserParams} from "../utils/types";
import {Task} from "../typeorms/entity/Task.entity";
import {ShowUserTaskDto} from "./dtos/ShowUserTask.dto";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Task) private taskRepository: Repository<Task>,
    ) {
    };

    async createUser(createUserParams: CreateUserParams) {
        const user = await this.userRepository.create({
            ...createUserParams,
            createdAt: new Date()
        });

        return this.userRepository.save(user);
    }


    getAllUser() {
        return this.userRepository.find();
    }


    findOneUser(condition: any) {
        return this.userRepository.findOneBy(condition);
    }


    async updateUser(id: number, updateUserParam: UpdateUserParams) {
        return this.userRepository.update({id}, {...updateUserParam})
    }


    async deleteUser(id: number) {
        this.userRepository.delete({id})
    }


    async createTask(createTaskParams: CreateTaskParams) {
        const task = this.taskRepository.create(createTaskParams);

        return this.taskRepository.save(task);
    }


    async getUserTask(id:number) {
        return await this.taskRepository
            .createQueryBuilder("task")
            .where("task.userId= :userId", { userId: id })
            .getMany()
    }


    async getAllTask() {
        return this.taskRepository.find();
    }
}
