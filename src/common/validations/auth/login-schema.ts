import { LoginType } from '@/common/types/auth';
import Joi from 'joi';

export const loginValidationSchema = (
  user: LoginType
): Joi.ValidationResult<LoginType> => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};
