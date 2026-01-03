import { ForbiddenException, Injectable } from '@nestjs/common';
import { metadata, module } from 'src/common/metadata';

@Injectable()
export class AuthService {
  signup() {
    throw new ForbiddenException({
      code: metadata.AUTH.INVALID,
      module: module.AUTH,
    });
  }
  login() {
    throw new ForbiddenException({
      code: metadata.AUTH.INVALID,
      module: module.AUTH,
    });
  }
}
