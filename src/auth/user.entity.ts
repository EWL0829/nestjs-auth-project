import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // eager在有关系的两方之间只有一方可以设置为true，不能两者同时设置为true，表示关系热切，当使用find*方法加载关系的所有者实体时，立即加载关系总是自动加载
  // 仅使用QueryBuilder可以防止加载热切关系
  // 这里任务关联到用户时，任务更在乎自己的所属用户，而用户下面会关联多个任务，所以不需要在find的时候立即加载所有的任务实体，反之则需要
  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
