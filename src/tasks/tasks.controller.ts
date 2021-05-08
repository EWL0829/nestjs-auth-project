import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // we set the TaskService as one of the Providers of TaskModule. So we can use it here in the constructor of TasksController
  // also it will be a class property of TasksController
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }
}
