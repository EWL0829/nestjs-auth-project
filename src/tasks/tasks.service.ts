import { Injectable } from '@nestjs/common';

// the component within the NestJS ecosystem can inject a provider that is  decorated with the @Injectable
// the @Injectable makes a class becoming a dependency that can be injected into another Module
@Injectable()
export class TasksService {
  private tasks = [1, 2, 3];

  getAllTasks() {
    return this.tasks;
  }
}
