import { Response, NextFunction } from 'express';
import { AuthorizedRequest } from '@/common/types';
import { sendResponse } from '@/common/helpers/send-response';
import { HTTP_CODES, RESPONSE_MESSAGES } from '@/common/constants';

export const userController = (
  request: AuthorizedRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    return sendResponse(
      response,
      { user: request.user },
      HTTP_CODES.SUCCESS,
      RESPONSE_MESSAGES.SUCCESSFULLY_RETRIEVED_USER
    );
  } catch (error) {
    next(error);
  }
};
