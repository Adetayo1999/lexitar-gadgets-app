import { NextFunction, Request, Response } from 'express';
import AuthService from '@/services/auth-service';
import { registerValidationSchema } from '@/common/validations/auth';
import { RequestValidationError } from '@/common/errors';
import { createMailToken, getIp, sendResponse } from '@/common/helpers';
import { HTTP_CODES } from '@/common/constants/http-codes';
import { RESPONSE_MESSAGES } from '@/common/constants/response-message';
import TokenService from '@/services/token-service';
import { EmailService } from '@/services/email-service';

const Auth = new AuthService();
const Token = new TokenService();
const Mail = new EmailService();

export const localRegisterController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error } = await registerValidationSchema(request.body);
    if (error) throw new RequestValidationError(error);
    const user = await Auth.register(request.body);

    const ip = getIp();
    const token = createMailToken({ email: user.email, id: user.id });

    await Token.create(token, user.id, ip, 'email_verification');

    sendResponse(
      response,
      { user },
      HTTP_CODES.CREATED,
      RESPONSE_MESSAGES.USER_CREATED
    );

    Mail.sendEmailVerificationMail(user, token);
  } catch (error) {
    next(error);
  }
};
