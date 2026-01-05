import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  findByExternalId(externalUserId: string) {
    return this.usersRepository.findByExternalId(externalUserId);
  }

  create(externalUserId: string, email: string) {
    return this.usersRepository.create(externalUserId, email);
  }
}
