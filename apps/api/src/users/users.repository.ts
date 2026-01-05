import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DB } from 'src/common/constants';
import { UserStatus } from 'src/common/enums';
import type { Database } from 'src/db/db.types';
import * as schema from 'src/db/schema';

@Injectable()
export class UsersRepository {
  constructor(@Inject(DB) private readonly db: Database) {}

  findByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  }

  findByExternalId(externalUserId: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.externalUserId, externalUserId),
    });
  }

  async create(externalUserId: string, email: string) {
    const [user] = await this.db
      .insert(schema.users)
      .values({
        externalUserId,
        email,
        status: UserStatus.ACTIVE,
      })
      .returning();

    return user;
  }
}
