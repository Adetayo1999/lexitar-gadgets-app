import { sign, verify } from 'jsonwebtoken';
import { ENV } from '../config/env';
import { JWTPayload } from '../types/auth';

export const createJWTToken = (secret: string, exp: string, payload: any) => {
  return sign(payload, secret, {
    expiresIn: exp,
  });
};

export const verifyJWTToken = (jwt: string, secret: string) => {
  return verify(jwt, secret);
};

export const createAccessToken = (data: JWTPayload) => {
  const token = createJWTToken(ENV.ACCESS_TOKEN_SECRET!, '1h', data);
  return token;
};

export const createRefreshToken = (data: JWTPayload) => {
  const token = createJWTToken(ENV.REFRESH_TOKEN_SECRET!, '7d', data);
  return token;
};

export const verifyAccessToken = (token: string) => {
  return verifyJWTToken(token, ENV.ACCESS_TOKEN_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return verifyJWTToken(token, ENV.REFRESH_TOKEN_SECRET!);
};
