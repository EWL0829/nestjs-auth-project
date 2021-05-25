import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule, // for jwt strategy
  ],
  controllers: [TasksController],
  providers: [TasksService], // defined as providers while not every provider is service
})
export class TasksModule {}
