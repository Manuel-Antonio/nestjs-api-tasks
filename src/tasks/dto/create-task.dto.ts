import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({
    description: 'The title of the task',
    required: true,
    example: 'Optimize product sales iterative code',
  })
  title: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Check if the task is assembled',
    required: false,
    example: false,
  })
  isCompleted?: boolean;
}
