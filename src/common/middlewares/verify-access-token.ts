import { Response, NextFunction } from 'express';
import { UnAuthorizedRequestError } from '../errors';
import { verifyAccessToken } from '../helpers/jwt-tokens';
import { JWTPayload, AuthorizedRequest } from '../types';
import AuthService from '@/services/auth-service';

export const verifyAccessTokenMiddleware = async (
  request: AuthorizedRequest,
  _: Response,
  next: NextFunction
) => {
  try {
    const accessToken = request.headers['x-access-token'];

    if (!accessToken || typeof accessToken !== 'string')
      throw new UnAuthorizedRequestError(
        'Unauthorised. Please login with your details.'
      );

    const payload = verifyAccessToken(accessToken) as JWTPayload;
    const user = await new AuthService().getUser(payload.id);
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
