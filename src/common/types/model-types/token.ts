import { Optional, Model } from 'sequelize';

export interface TokenAttributes {
  id: number;
  token: string;
  status: 'valid' | 'invalid';
  expiry_date: Date;
  ip_address: string;
  scope: 'refresh_token' | 'email_verification' | 'password_reset';
}

export interface TokenCreationAttributes
  extends Optional<TokenAttributes, 'id'> {}

export interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
