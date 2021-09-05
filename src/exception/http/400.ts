import { BaseException } from '~/exception/baseException';

export class UnprocessableEntityException extends BaseException {
  public status: number;
  public message: string;

  constructor(error: Error) {
    super(error.message);
    this.status = 422;
    this.message = 'Unprocessable Entity';
  }
}
