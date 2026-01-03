import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { createDbConnection } from '.';

@Global()
@Module({
  providers: [
    {
      provide: 'DB_CONNECTION',
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('DATABASE_URL');
        if (!uri) {
          throw new Error();
        }
        return createDbConnection(uri);
      },
      inject: [ConfigService],
    },
    {
      provide: 'DB',
      useFactory: (connection: { db: unknown; pool: Pool }) => connection.db,
      inject: ['DB_CONNECTION'],
    },
    {
      provide: 'DB_POOL',
      useFactory: (connection: { db: unknown; pool: Pool }) => connection.pool,
      inject: ['DB_CONNECTION'],
    },
  ],
  exports: ['DB', 'DB_POOL'],
})
export class DbModule implements OnModuleDestroy {
  constructor(@Inject('DB_POOL') private pool: Pool) {}

  async onModuleDestroy() {
    await this.pool.end();
  }
}
