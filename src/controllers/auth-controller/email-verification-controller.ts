import { ENV } from '@/common/config/env';
import { verifyMailToken } from '@/common/helpers';
import { JWTPayload } from '@/common/types';
import AuthService from '@/services/auth-service';
import TokenService from '@/services/token-service';
import { NextFunction, Request, Response } from 'express';

const Token = new TokenService();
const Auth = new AuthService();

export const emailVerificationController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.query['token'];
    if (!token || typeof token !== 'string')
      return response.redirect(ENV.CLIENT_URL! + '/verify?status=error');

    const dbToken = await Token.tokenVerification(token);

    if (!dbToken)
      return response.redirect(ENV.CLIENT_URL! + '/verify?status=error');

    const payload = verifyMailToken(dbToken.token) as JWTPayload;

    const user = await Auth.verifyUser(payload.id);

    if (!user)
      return response.redirect(ENV.CLIENT_URL! + '/verify?status=error');

    return response.redirect(ENV.CLIENT_URL! + '/verify?status=success');
  } catch (error) {
    response.redirect(ENV.CLIENT_URL! + '/verify?status=error');
  }
};
