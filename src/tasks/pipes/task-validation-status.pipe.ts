// pipes are always classes decorated by the @Injectable;
// pipes implement PipeTransform generic interface. So there must be a transform method in the pipe class.
// transform method has two parameters: value(the value of processed arguments) and metadata(optional, an object with the metadata about the arguments)

import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

// this is a typical validation pipe with a transform method
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: TaskStatus): any {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not valid task status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
