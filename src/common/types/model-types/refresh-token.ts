import { Optional, Model } from 'sequelize';

export interface RefreshTokenAttributes {
  id: number;
  token: string;
  status: 'valid' | 'invalid';
  expiry_date: Date;
  // userId?: number;
}

export interface RefreshTokenCreationAttributes
  extends Optional<RefreshTokenAttributes, 'id'> {}

export interface RefreshTokenInstance
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>,
    RefreshTokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
