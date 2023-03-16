import { RegisterType } from '../../../common/types/auth';
import Joi from 'joi';

export const registerValidationSchema = (
  user: RegisterType
): Joi.ValidationResult<RegisterType> => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .ruleset.min(8)
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .rule({
        message:
          'Password must be strong. At least one upper case alphabet. At least one lower case alphabet. At least one digit. At least one special character. Minimum eight in length',
      }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  });

  return schema.validate(user);
};
