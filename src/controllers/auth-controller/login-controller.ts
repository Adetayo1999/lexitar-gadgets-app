import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth-service';
import AuthTokenService from '@/services/token-service';
import { loginValidationSchema } from '@/common/validations/auth';
import { RequestValidationError } from '@/common/errors';
import { sendResponse } from '@/common/helpers/send-response';
import { HTTP_CODES } from '@/common/constants/http-codes';
import { RESPONSE_MESSAGES } from '@/common/constants/response-message';
import {
  createAccessToken,
  createRefreshToken,
} from '@/common/helpers/jwt-tokens';

const Auth = new AuthService();
const AuthToken = new AuthTokenService();

export const localLoginController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error } = await loginValidationSchema(request.body);
    if (error) throw new RequestValidationError(error);
    const user = await Auth.login(request.body);
    const access_token = createAccessToken({ email: user.email, id: user.id });
    const refresh_token = createRefreshToken({
      email: user.email,
      id: user.id,
    });
    await AuthToken.create(refresh_token, user.id);
    const data = {
      user,
      refresh_token,
      access_token,
    };

    return sendResponse(
      response,
      data,
      HTTP_CODES.SUCCESS,
      RESPONSE_MESSAGES.LOGIN_SUCCESSFUL
    );
  } catch (error) {
    next(error);
  }
};
