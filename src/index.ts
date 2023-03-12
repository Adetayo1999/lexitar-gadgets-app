import 'dotenv/config';
import { getApp } from './app';
import { ENV } from './common/config/env';

const startUp = () => {
  if (Object.keys(ENV).some((env) => env === undefined)) {
    throw new Error('ENVIRONMENT ERROR');
  }

  const app = getApp();

  app.listen(ENV.PORT, () => {
    console.log(`Listening On Port ${ENV.PORT} 🚀`);
  });
};

startUp();
