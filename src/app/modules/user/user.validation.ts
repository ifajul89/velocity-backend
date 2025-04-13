import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name must be provided and must be a string',
      })
      .min(3)
      .max(50),

    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email(),

    password: z
      .string({
        required_error: 'Password is required for your safety',
      })
      .max(20, { message: 'Password can not be more than 20 characters' }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
