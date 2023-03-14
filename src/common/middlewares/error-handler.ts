import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/base-error';
import { HTTP_CODES } from '../constants/http-codes';
import { RESPONSE_STATUS } from '../constants/response-status';

export const errorHandler = (
  error: Error,
  _: Request,
  response: Response,
  __: NextFunction
) => {
  if (error instanceof BaseError) {
    return response.status(error._statusCode).send(error.serializerError());
  }

  response.status(HTTP_CODES.SERVER_ERROR).send({
    error: RESPONSE_STATUS.ERROR,
    data: [{ reason: 'Something went wrong' }],
  });

  // logger to send the backend the error message for debugging purpose
};