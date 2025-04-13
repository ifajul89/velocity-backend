import { z } from 'zod';

const loginValidation = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refresh_token: z.string({ required_error: 'Refresh is required.' }),
  }),
});

export const authValidation = { loginValidation, refreshTokenValidationSchema };
