import { NextFunction, Request, Response } from 'express';
import AuthService from '../../services/auth-service';
import { loginValidationSchema } from '../../common/validations/auth';
import RequestValidationError from '../../common/errors/validation-error';
import { sendResponse } from '../../common/helpers/send-response';
import { HTTP_CODES } from '../../common/constants/http-codes';
import { RESPONSE_MESSAGES } from '../../common/constants/response-message';

const Auth = new AuthService();

export const localLoginController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error } = await loginValidationSchema(request.body);
    if (error) throw new RequestValidationError(error);
    const user = await Auth.login(request.body);
    return sendResponse(
      response,
      user,
      HTTP_CODES.SUCCESS,
      RESPONSE_MESSAGES.LOGIN_SUCCESSFUL
    );
  } catch (error) {
    next(error);
  }
};
