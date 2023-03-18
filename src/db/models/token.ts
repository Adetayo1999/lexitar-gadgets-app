import { TokenCreationAttributes, TokenAttributes } from '@/common/types';

import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user';

@Table({ tableName: 'tokens' })
export default class Token extends Model<
  TokenAttributes,
  TokenCreationAttributes
> {
  @Column({ type: DataType.STRING, allowNull: false })
  declare token: string;

  @Column({
    type: DataType.STRING,
    defaultValue: 'valid',
    values: ['valid', 'invalid'],
  })
  declare status: 'valid' | 'invalid';

  @Column({ type: DataType.DATE, allowNull: false })
  declare expiry_date: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  declare ip_address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare scope: 'refresh_token' | 'email_verification' | 'password_reset';

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}
