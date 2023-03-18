import RefreshTokenModel from '@/db/models/refresh-token';

class AuthTokenService {
  private Refreshtoken = RefreshTokenModel;

  async create(token: string, userId: number) {
    const timeNow = new Date().getTime();
    const eightDaysFromNow = timeNow + 8 * 24 * 60 * 60 * 1000;
    const expiry_date = new Date(eightDaysFromNow);
    const refreshToken = await this.Refreshtoken.create({
      status: 'valid',
      token,
      expiry_date,
    });

    refreshToken.userId = userId;

    await refreshToken.save();

    return refreshToken;
  }
}

export default AuthTokenService;
