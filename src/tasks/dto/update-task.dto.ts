import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The title of the task',
    required: false,
    example: 'Optimize product sales iterative code',
  })
  title?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Check if the task is assembled',
    required: false,
    example: false,
  })
  isCompleted?: boolean;
}
