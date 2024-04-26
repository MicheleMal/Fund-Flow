import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectIdValidationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const objectId = req.params.id;

    if (!isValidObjectId(objectId)) {
      throw new BadRequestException('Id non valido');
    }

    next();
  }
}
