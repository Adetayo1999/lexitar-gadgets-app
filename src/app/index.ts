import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from '../common/middlewares/error-handler';
import { NotFoundError } from '../common/errors';

export const getApp = () => {
  const app = express();

  // middlewares
  app.use(morgan('dev'));
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:3000', '127.0.0.1:3000'],
    })
  );
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/', (_, response) => {
    response.send({
      message: 'Hi there, welcome to Lexitar Gadgets',
    });
  });

  app.use((_, __, next) => {
    next(new NotFoundError('Entry Does Not Exist'));
  });

  app.use(errorHandler);

  return app;
};
