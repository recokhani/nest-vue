export type CreateUserParams = {
    username: string;
    password: string;
    email: string;
}

export type UpdateUserParams = {
    username: string;
    password: string;
    email: string;
}

export type CreateTaskParams = {
    title:string;
    user:object;
}

export type ShowTaskParams = {
    id:number;
}