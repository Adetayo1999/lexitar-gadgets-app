import express from 'express';
import morgan from 'morgan';

export const getApp = () => {
  const app = express();

  // middlewares
  app.use(morgan('dev'));

  app.get('/', (_, response) => {
    response.send({
      message: 'Hi there, welcome to Lexitar Gadgets',
    });
  });

  return app;
};
