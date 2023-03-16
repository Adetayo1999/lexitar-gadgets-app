import express from 'express';
import { errorHandler } from '../common/middlewares/error-handler';
import { NotFoundError } from '../common/errors';
import { requestMiddleWare } from '../common/middlewares/request-middleware';
import getRoutes from '../routes';

export const getApp = () => {
  const app = express();

  // middlewares
  requestMiddleWare(app);
  getRoutes(app);

  app.get('/', (_, response) => {
    response.send({
      status: 'success',
      message: 'Hi there, welcome to Lexitar Gadgets',
    });
  });

  app.use((_, __, next) => {
    next(new NotFoundError('Entry Does Not Exist'));
  });

  app.use(errorHandler);

  return app;
};
