import { BaseError } from './base-error';
import { HTTP_CODES } from '../constants/http-codes';
import { RESPONSE_STATUS } from '../constants/response-status';

export class BadRequestError extends BaseError {
  _statusCode = HTTP_CODES.BAD_REQUEST;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializerError() {
    return {
      status: RESPONSE_STATUS.ERROR,
      data: [{ reason: this.message }],
    };
  }
}
