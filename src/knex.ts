import { knex as knexOriginal, Knex } from 'knex';

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3',
  },
};

export const knex = knexOriginal(config);
