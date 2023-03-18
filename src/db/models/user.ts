import { UserAttributes, UserCreationAttributes } from '../../common/types';
import { Table, Model, Column, HasMany, DataType } from 'sequelize-typescript';
import Token from './token';

@Table({ tableName: 'users' })
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @Column({ type: DataType.STRING, allowNull: false })
  declare firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_verified: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: 'local',
    values: ['local', 'google', 'facebook'],
  })
  declare channel: 'local' | 'google' | 'facebook';

  @HasMany(() => Token)
  declare token: Token[];
}
