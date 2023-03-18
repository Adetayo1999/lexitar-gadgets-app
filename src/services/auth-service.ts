import {
  UnAuthorizedRequestError,
  ConflictError,
  BadRequestError,
} from '@/common/errors';
import { UserAttributes } from '@/common/types/model-types/user';
import UserModel from '@/db/models/user';
import { compare, hash } from 'bcrypt';
import { LoginType } from '@/common/types/auth';

class AuthService {
  private User = UserModel;

  async register(user: UserAttributes) {
    const existingUser = await this.User.findOne({
      where: { email: user.email },
    });
    if (existingUser)
      throw new ConflictError(
        `${existingUser.email} already exists. Please use something else.`
      );
    const hashedPassword = await hash(user.password, 8);
    const newUser = await this.User.create({
      ...user,
      password: hashedPassword,
    });
    return newUser;
  }

  async login(user: LoginType) {
    const dbUser = await this.User.findOne({ where: { email: user.email } });
    if (!dbUser)
      throw new UnAuthorizedRequestError('Invalid Login Credentials');
    const isPasswordValid = await compare(user.password, dbUser.password);
    if (!isPasswordValid)
      throw new UnAuthorizedRequestError('Invalid Login Credentials');

    return dbUser;
  }

  async getUser(userId: number) {
    const user = await this.User.findByPk(userId);
    if (!user) throw new BadRequestError('Suspecious Activities Detected');
    return user;
  }
}

export default AuthService;
