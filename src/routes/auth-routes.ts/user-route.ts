import { verifyAccessTokenMiddleware } from '@/common/middlewares';
import { userController } from '@/controllers/auth-controller';
import { Router } from 'express';

export const userRouter = Router();

userRouter.get('/auth/profile', verifyAccessTokenMiddleware, userController);
