
import { ApiProperty } from '@nestjs/swagger'
export class UpdateUserDto {
    @ApiProperty()
    id:number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    email: string;
}