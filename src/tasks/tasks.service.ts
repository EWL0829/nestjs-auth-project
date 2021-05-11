import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

// the component within the NestJS ecosystem can inject a provider that is  decorated with the @Injectable
// the @Injectable makes a class becoming a dependency that can be injected into another Module
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter((task: Task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter((task: Task) => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //
  //   return tasks;
  // }
  //

  // put all complex logic into the repository
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID:${id} is not found`);
    }
    return found;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    console.log('result', result);
  }

  //
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id); // By calling getTaskById, the not-found task can be filtered off at the very beginning;
  //   this.tasks = this.tasks.filter((task: Task) => task.id !== found.id);
  // }
  //
  // updateTaskStatus(status: TaskStatus, id: string): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
