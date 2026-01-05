import { ForbiddenException, Injectable } from '@nestjs/common';
import { metadata, module } from 'src/common/metadata';
import { ExternalService } from './external.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly externalService: ExternalService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    const { data, error } = await this.externalService.signup(email, password);

    if (error || !data.user) {
      throw new ForbiddenException({
        code: metadata.AUTH.EXTERNAL_ERROR,
        module: module.AUTH,
        message: error?.message,
      });
    }

    const user = await this.usersService.create(data.user.id, email);

    const token = this.jwtService.sign({
      id: user?.id,
      email: user?.email,
    });

    return { code: metadata.AUTH.SUCCESS, module: module.AUTH, token };
  }

  async login(email: string, password: string) {
    const { data, error } = await this.externalService.login(email, password);

    if (error || !data.user) {
      throw new ForbiddenException({
        code: metadata.AUTH.EXTERNAL_ERROR,
        module: module.AUTH,
        message: error?.message,
      });
    }

    const user = await this.usersService.findByExternalId(data.user.id);

    if (!user) {
      throw new ForbiddenException({
        code: metadata.AUTH.INVALID,
        module: module.AUTH,
      });
    }

    const token = this.jwtService.sign({
      id: user?.id,
      email: user?.email,
    });

    return { code: metadata.AUTH.SUCCESS, module: module.AUTH, token };
  }
}
