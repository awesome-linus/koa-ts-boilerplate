import { BaseException } from '~/exception/baseException';

export class NoSuchColumnException extends BaseException {
  constructor(error: Error) {
    super(error.message);
  }
}
