import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { createDbConnection } from './db.factory';
import { DATABASE_URL, DB, DB_CONNECTION, DB_POOL } from 'src/common/constants';

export const dbProviders: Provider[] = [
  {
    provide: DB_CONNECTION,
    useFactory: (configService: ConfigService) => {
      const uri = configService.get<string>(DATABASE_URL);
      if (!uri) {
        throw new Error();
      }
      return createDbConnection(uri);
    },
    inject: [ConfigService],
  },
  {
    provide: DB,
    useFactory: (connection: { db: unknown; pool: Pool }) => connection.db,
    inject: [DB_CONNECTION],
  },
  {
    provide: DB_POOL,
    useFactory: (connection: { db: unknown; pool: Pool }) => connection.pool,
    inject: [DB_CONNECTION],
  },
];
