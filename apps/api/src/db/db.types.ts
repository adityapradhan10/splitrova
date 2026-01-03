import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Pool } from 'pg';

export type Database = NodePgDatabase<typeof schema>;

export interface DbConnection {
  db: Database;
  pool: Pool;
}
