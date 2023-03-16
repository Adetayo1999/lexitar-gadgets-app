import { sign } from 'jsonwebtoken';
import { ENV } from '../config/env';
import { AccessTokenJWTPayload } from '../types/auth';

export const createJWTToken = (secret: string, exp: string, payload: any) => {
  return sign(payload, secret, {
    expiresIn: exp,
  });
};

export const createAccessToken = (data: AccessTokenJWTPayload) => {
  const token = createJWTToken(ENV.ACCESS_TOKEN_SECRET!, '1h', data);
  return token;
};

export const createRefreshToken = (data: AccessTokenJWTPayload) => {
  const token = createJWTToken(ENV.REFRESH_TOKEN_SECRET!, '7d', data);
  return token;
};
