import { Express } from 'express';
import {
  loginRouter,
  registerRouter,
  userRouter,
  emailVerifyRouter,
} from './auth-routes.ts';

const getRoutes = (app: Express) => {
  const ROUTERS = [loginRouter, registerRouter, userRouter, emailVerifyRouter];

  ROUTERS.forEach((route) => app.use('/api/v1', route));
};

export default getRoutes;
