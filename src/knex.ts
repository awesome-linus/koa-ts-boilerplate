import { knex as knexOriginal, Knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'koa_ts_knex',
  },
};

export const knex = knexOriginal(config);
