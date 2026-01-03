import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/db/schema';

@Injectable()
export class UsersRepository {
  constructor(@Inject('DB') private readonly db: NodePgDatabase<typeof schema>) {}

  findByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });
  }
}
