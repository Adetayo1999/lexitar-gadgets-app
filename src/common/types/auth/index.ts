import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import User from '@/db/models/user';

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type JWTPayload = JwtPayload & {
  email: string;
  id: number;
};

export type AuthorizedRequest = Request & {
  user?: User;
};
