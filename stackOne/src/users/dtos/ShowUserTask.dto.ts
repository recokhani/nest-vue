import { ApiProperty } from '@nestjs/swagger'
export class ShowUserTaskDto {
    @ApiProperty()
    id: number;
}