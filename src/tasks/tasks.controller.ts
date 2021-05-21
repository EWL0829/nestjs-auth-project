import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-validation-status.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  // we set the TaskService as one of the Providers of TaskModule. So we can use it here in the constructor of TasksController
  // also it will be a class property of TasksController
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe) // this handler-level pipe can validate title and description is empty or not, then throw exception with bad request code 400
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  //
  @Get('/:id') // below the line, ParseIntPipe is used for validating the passed id is a number or not
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }
  //
  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
  //
  @Patch('/:id/status')
  updateTaskStatus(
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(status, id);
  }
}
