import { Optional, Model } from 'sequelize';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  channel?: 'google' | 'facebook';
  is_verified?: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
