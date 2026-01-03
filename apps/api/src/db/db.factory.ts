import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export function createDbConnection(uri: string) {
  const pool = new Pool({ connectionString: uri });
  const db = drizzle(pool, { schema });
  return { pool, db };
}
