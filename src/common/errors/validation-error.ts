import { ValidationError } from 'joi';
import { BaseError } from './base-error';
import { HTTP_CODES } from '../constants/http-codes';
import { RESPONSE_STATUS } from '../constants/response-status';

export class RequestValidationError extends BaseError {
  _statusCode = HTTP_CODES.BAD_REQUEST;

  constructor(private errors: ValidationError) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializerError() {
    const data = this.errors.details.map((error) => ({
      reason: error.message,
    }));

    return {
      status: RESPONSE_STATUS.ERROR,
      data,
    };
  }
}
