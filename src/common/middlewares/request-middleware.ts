import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

export const requestMiddleWare = (app: Express) => {
  app.use(morgan('dev'));
  app.use(
    cors({
      credentials: true,
      origin: [
        'http://localhost:3000',
        '127.0.0.1:3000',
        'http://localhost:5173',
      ],
    })
  );
  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
