
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from "../entities/task.entity";

export interface ITasksService {
    findAll() : Promise<Task[]>;
    findById(taskId : number) : Promise<Task>;
    create(createTaskDto : CreateTaskDto) : Promise<Task>;
    update(taskId : number, updateTaskDto: UpdateTaskDto) : Promise<Task>;
    delete(taskId : number) : Promise<void>;
    findByTitle(title: string, isCompleted: boolean) : Promise<Task[]>;
}