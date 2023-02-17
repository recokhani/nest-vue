import {BeforeInsert, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcrypt'
import {Task} from "./Task.entity";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    createdAt:Date;

    @OneToMany(()=>Task, ta => ta.user)
    tasks:Task;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 10);
    }
}