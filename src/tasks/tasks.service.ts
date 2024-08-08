import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITasksService } from './interfaces/tasks-service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TasksService implements ITasksService {

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ){}

  findByTitle(title: string, isCompleted: boolean): Promise<Task[]> {
    return this.tasksRepository.createQueryBuilder('task')
    .where('task.title LIKE :title', {title: `%${title}%`})
    .andWhere('task.isCompleted = :isCompleted', {isCompleted})
    .getMany();
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }
  async findById(taskId: number): Promise<Task> {
    const taskFind = await this.tasksRepository.findOneBy({id: taskId});
    if(!taskFind) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return taskFind;
  }
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(newTask);
  }
  async update(taskId: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
   const updateTask = await this.tasksRepository.preload({
    id: taskId,
    ...updateTaskDto
   });

   return await this.tasksRepository.save(updateTask);
  }
  async delete(taskId: number): Promise<void> {
    const result = await this.tasksRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
  }


}
