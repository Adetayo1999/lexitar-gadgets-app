import { ENV } from '@/common/config/env';
import { HTTP_CODES, RESPONSE_MESSAGES } from '@/common/constants';
import { BadRequestError } from '@/common/errors';
import { sendResponse, verifyMailToken } from '@/common/helpers';
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
    const { token } = request.body;

    if (!token || typeof token !== 'string')
      throw new BadRequestError('Token Required For Verification');

    const dbToken = await Token.tokenVerification(token);

    if (!dbToken) throw new BadRequestError('Invalid or expired token');

    const payload = verifyMailToken(dbToken.token) as JWTPayload;

    const user = await Auth.verifyUser(payload.id);

    if (!user) throw new BadRequestError('User does not exist in our database');

    sendResponse(
      response,
      null,
      HTTP_CODES.SUCCESS,
      RESPONSE_MESSAGES.USER_VERIFIED
    );
  } catch (error) {
    next(error);
  }
};
