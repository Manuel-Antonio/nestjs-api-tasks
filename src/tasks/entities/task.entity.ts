import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the task', example: 1 })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Title of the task', example: 'Buy groceries' })
  title: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({ description: 'Status of the task', example: false })
  isCompleted: boolean;
}
