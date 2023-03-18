import {
  RefreshTokenCreationAttributes,
  RefreshTokenAttributes,
} from '@/common/types';

import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user';

@Table({ tableName: 'refresh-tokens' })
export default class RefreshToken extends Model<
  RefreshTokenAttributes,
  RefreshTokenCreationAttributes
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

  @ForeignKey(() => User)
  @Column
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;
}
