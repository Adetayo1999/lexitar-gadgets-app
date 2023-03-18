import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth-service';
import TokenService from '@/services/token-service';
import { loginValidationSchema } from '@/common/validations/auth';
import { BadRequestError, RequestValidationError } from '@/common/errors';
import { HTTP_CODES } from '@/common/constants/http-codes';
import { RESPONSE_MESSAGES } from '@/common/constants/response-message';
import {
  createAccessToken,
  createRefreshToken,
  sendResponse,
} from '@/common/helpers';
import { getIp } from '@/common/helpers/ip-address';

const Auth = new AuthService();
const Token = new TokenService();

export const localLoginController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error } = await loginValidationSchema(request.body);
    if (error) throw new RequestValidationError(error);
    const user = await Auth.login(request.body);

    if (!user.is_verified) throw new BadRequestError('Verification Required');

    const access_token = createAccessToken({ email: user.email, id: user.id });
    const refresh_token = createRefreshToken({
      email: user.email,
      id: user.id,
    });

    const ip_address = getIp();

    await Token.create(refresh_token, user.id, ip_address, 'refresh_token');

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
