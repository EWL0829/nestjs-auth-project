import { IsNotEmpty } from 'class-validator';

// classes or interface can be used to make dto fro specific case. but classes are better choices
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
