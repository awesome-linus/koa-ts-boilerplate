import { NoSuchColumnException } from '~/exception/knex/index';

export const retrieveKnexError = (error: Error): Error => {
  if (error.message.includes('no such column')) {
    return new NoSuchColumnException(error);
  }
  return new Error();
};
