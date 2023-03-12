import 'dotenv/config';
import { getApp } from './app';
import { ENV } from './common/config/env';
import connectDB from './db';

const startUp = async () => {
  if (Object.keys(ENV).some((env) => env === undefined)) {
    throw new Error('ENVIRONMENT ERROR');
  }

  const app = getApp();

  await connectDB();

  app.listen(ENV.PORT, () => {
    console.log(`Listening On Port ${ENV.PORT} 🚀`);
  });
};

startUp();
