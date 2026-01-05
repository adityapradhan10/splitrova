import { sql } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp, check } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    externalUserId: uuid('external_user_id').notNull().unique(),
    email: text('email').notNull().unique(),
    status: text('status').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [check('status', sql`${table.status} in ('ACTIVE', 'DISABLED', 'DELETED')`)],
);
