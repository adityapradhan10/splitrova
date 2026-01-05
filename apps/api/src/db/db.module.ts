import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import { dbProviders } from './db.providers';
import { DB, DB_POOL } from 'src/common/constants';

@Global()
@Module({
  providers: dbProviders,
  exports: [DB, DB_POOL],
})
export class DbModule implements OnModuleDestroy {
  constructor(@Inject(DB_POOL) private pool: Pool) {}

  async onModuleDestroy() {
    await this.pool.end();
  }
}
