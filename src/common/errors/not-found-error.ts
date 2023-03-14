import { BaseError } from './base-error';
import { HTTP_CODES } from '../constants/http-codes';
import { RESPONSE_STATUS } from '../constants/response-status';

export class NotFoundError extends BaseError {
  _statusCode = HTTP_CODES.NOT_FOUND;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializerError() {
    return {
      error: RESPONSE_STATUS.ERROR,
      data: [{ reason: this.message }],
    };
  }
}
