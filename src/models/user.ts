import { DataTypes } from 'sequelize';
import { sequelize } from '../db';
import { UserInstance } from '../common/types/model-types.ts/user';

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
  },

  channel: {
    type: DataTypes.STRING,
    defaultValue: 'local',
    values: ['local', 'google', 'facebook'],
  },

  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

export default User;
