import TokenModel from '@/db/models/token';

class TokenService {
  private Token = TokenModel;

  async create(
    token: string,
    userId: number,
    ip_address: string,
    scope: 'refresh_token' | 'email_verification' | 'password_reset'
  ) {
    const timeNow = new Date().getTime();
    const eightDaysFromNow = timeNow + 8 * 24 * 60 * 60 * 1000;
    const expiry_date = new Date(eightDaysFromNow);
    const newToken = await this.Token.create({
      status: 'valid',
      token,
      expiry_date,
      ip_address,
      scope,
    });

    newToken.userId = userId;

    await newToken.save();

    return newToken;
  }

  async tokenVerification(token: string) {
    const dbToken = await this.Token.findOne({ where: { token } });
    return dbToken;
  }
}

export default TokenService;
