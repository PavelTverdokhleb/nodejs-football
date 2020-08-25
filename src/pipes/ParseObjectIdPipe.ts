import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, ObjectID> {
  transform(value: string): ObjectID {
    if (!ObjectID.isValid(value)) {
      throw new BadRequestException('Invalid identifier');
    }
    return new ObjectID(value);
  }
}
