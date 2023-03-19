import { emailVerificationController } from '@/controllers/auth-controller';
import { Router } from 'express';

export const emailVerifyRouter = Router();

emailVerifyRouter.post('/auth/verify-email', emailVerificationController);
