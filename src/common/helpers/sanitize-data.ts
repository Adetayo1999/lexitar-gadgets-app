import User from '@/db/models/user';

export const sanitizeUser = (user: User) => {
  const sanitizedUser: any = { ...user, password: null };

  delete sanitizedUser.password;

  return sanitizedUser;
};
