import { NoSuchColumnException } from '~/exception/knex';
import { BaseHttpException } from '~/exception/http/baseHttpException';
import { UnprocessableEntityException } from '~/exception/http/400';

export const retrieveHttpError = (error: Error): Error & {
  status: number,
  message: string
} => {
  if (error instanceof NoSuchColumnException) {
    return new UnprocessableEntityException(error);
  }
  return new BaseHttpException(error);
};
