import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

// the component within the NestJS ecosystem can inject a provider that is  decorated with the @Injectable
// the @Injectable makes a class becoming a dependency that can be injected into another Module
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }

  // put all complex logic into the repository
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
        userId: user.id
      }
    });
    if (!found) {
      throw new NotFoundException(`Task with ID:${id} is not found.`);
    }
    return found;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    // 先看任务是否存在
    const result = await this.taskRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(status: TaskStatus, id: number, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    if (task.status === status) {
      throw new InternalServerErrorException(`The status of Task with ID ${id} is ${status} currently.`);
    }
    task.status = status;
    await task.save();
    return task;
  }
}
