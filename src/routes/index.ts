import { Express } from 'express';
import { loginRouter, registerRouter } from './auth-routes.ts';

const getRoutes = (app: Express) => {
  const ROUTERS = [loginRouter, registerRouter];

  ROUTERS.forEach((route) => app.use('/api/v1', route));
};

export default getRoutes;
