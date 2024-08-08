import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseSearchQueryPipe implements PipeTransform {
  transform(value: any): { title: string, isCompleted: boolean } {
    const title = value.title || 'Default title of a created Task';
    const isCompleted = value.isCompleted === 'true';

    if (typeof title !== 'string' || title.trim().length === 0) {
      throw new BadRequestException('Title must be a non-empty string');
    }

    if (typeof isCompleted !== 'boolean') {
      throw new BadRequestException('isCompleted must be a boolean value');
    }

    return { title, isCompleted };
  }
}
