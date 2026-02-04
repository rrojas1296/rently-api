import { Injectable, OnModuleDestroy } from '@nestjs/common';
import knex from 'knex';
import { DATABASE_URL } from 'src/config/environments';

@Injectable()
export class KnexService implements OnModuleDestroy {
  private instance: knex.Knex;
  constructor() {
    this.instance = knex({
      client: 'pg',
      connection: DATABASE_URL,
    });
  }

  get db() {
    return this.instance;
  }

  onModuleDestroy() {
    this.instance.destroy();
  }
}
