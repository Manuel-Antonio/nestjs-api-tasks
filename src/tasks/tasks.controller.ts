import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { TasksService } from './tasks.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ParseSearchQueryPipe } from './pipes/parse-search-query/parse-search-query.pipe';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  
  constructor(private readonly tasksService: TasksService) {}
  
  
  @Get('/search')
  @ApiOperation({ summary: 'Search tasks by title and completion status' })
  @ApiResponse({
    status: 200,
    description: 'Return tasks matching the search criteria',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'The title of the task to search for',
    type: String,
    example: 'Manuel',
  })
  @ApiQuery({
    name: 'isCompleted',
    required: false,
    description: 'Filter by completion status of the task',
    type: Boolean,
    example: true,
  })
  findByTitle(@Query(ParseSearchQueryPipe) query: { title: string; isCompleted: boolean }) {
    return this.tasksService.findByTitle(
      query.title,
      query.isCompleted,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a Task' })
  @ApiResponse({ status: 201, description: 'Return the created task' })
  @ApiBody({
    type: CreateTaskDto,
    examples: {
      example1: {
        summary: 'Example of a task creation',
        value: { title: 'New Task', isCompleted: false },
      },
    },
  })

  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
  }


  @Get()
  @ApiOperation({ summary: 'Return all Tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks ' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Find a task by id' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the task to retrieve',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the task with searched id',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.findById(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update a Task' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the task to update',
  })


  @ApiBody({
    type: UpdateTaskDto,
    examples: {
      example1: {
        summary: 'Example of updating a task',
        value: {
          title: 'Updated Task Title',
          isCompleted: false,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Return the updated task' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Task' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the task to delete',
  })
  @ApiResponse({ status: 200, description: 'Task successfully deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.delete(id);
  }
}
