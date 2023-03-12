import { Sequelize } from 'sequelize';
import { ENV } from '../common/config/env';

const sequelize = new Sequelize(ENV.DB_NAME!, ENV.DB_USER!, ENV.DB_PASSWORD!, {
  host: ENV.DB_HOST!,
  dialect: 'postgres',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Posgres DB Started 🎈');
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
