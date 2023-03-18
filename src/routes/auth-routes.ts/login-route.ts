import { localLoginController } from '../../controllers/auth-controller';
import { Router } from 'express';

export const loginRouter = Router();

loginRouter.post('/auth/login', localLoginController);
