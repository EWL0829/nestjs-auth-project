import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity {
  // this decorator means that database will generate IDS automatically for us. so we don't need to generate IDs with uuid package amnymore.
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;

  // 这其实是typeorm生成的，但是还是要在实体里进行定义
  @Column()
  userId: number;
}
