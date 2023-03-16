import 'module-alias/register';
import 'dotenv/config';
import { getApp } from './app/index';
import { ENV } from './common/config/env';
import connectDB from './db/index';

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
