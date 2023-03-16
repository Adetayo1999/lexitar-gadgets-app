import { NextFunction, Request, Response } from 'express';
import AuthService from '../../services/auth-service';
import { registerValidationSchema } from '../../common/validations/auth';
import RequestValidationError from '../../common/errors/validation-error';
import { sendResponse } from '../../common/helpers/send-response';
import { HTTP_CODES } from '../../common/constants/http-codes';
import { RESPONSE_MESSAGES } from '../../common/constants/response-message';

const Auth = new AuthService();

export const localRegisterController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error } = await registerValidationSchema(request.body);
    if (error) throw new RequestValidationError(error);
    const user = await Auth.register(request.body);
    return sendResponse(
      response,
      user,
      HTTP_CODES.CREATED,
      RESPONSE_MESSAGES.USER_CREATED
    );
  } catch (error) {
    next(error);
  }
};
