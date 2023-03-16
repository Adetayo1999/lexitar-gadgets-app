import { localRegisterController } from '../../controllers/auth-controller';
import { Router } from 'express';

export const registerRouter = Router();

registerRouter.post('/auth/register', localRegisterController);
