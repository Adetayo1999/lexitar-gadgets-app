import { Request, Response, NextFunction } from 'express';
import { BaseError as DatabaseError } from 'sequelize';
import { BaseError } from '../errors';
import { HTTP_CODES, RESPONSE_STATUS } from '../constants';
import { JsonWebTokenError } from 'jsonwebtoken';

export const errorHandler = (
  error: Error,
  _: Request,
  response: Response,
  __: NextFunction
) => {
  let data, status: number;

  if (error instanceof BaseError) {
    status = error._statusCode;
    data = error.serializerError();
  } else if (error instanceof DatabaseError) {
    status = HTTP_CODES.SERVER_ERROR;
    data = {
      status: RESPONSE_STATUS.ERROR,
      data: [{ reason: error.message || 'Unable to perform operation' }],
    };
  } else if (error instanceof JsonWebTokenError) {
    status = HTTP_CODES.UNAUTHORIZED;
    data = {
      status: RESPONSE_STATUS.ERROR,
      data: [{ reason: 'Unauthorised. Please login with your details.' }],
    };
  } else {
    status = HTTP_CODES.SERVER_ERROR;
    data = {
      status: RESPONSE_STATUS.ERROR,
      data: [{ reason: 'Something went wrong' }],
    };
  }

  response.status(status).send(data);

  // logger to send the backend the error message for debugging purpose
};
