import { BaseException } from '~/exception/baseException';

export class BaseHttpException extends BaseException {
    public status: number;
    public message: string;

    constructor(error: Error) {
      super(error.message);
      this.status = 500;
      this.message = 'Internal Server Error';
    }
}
