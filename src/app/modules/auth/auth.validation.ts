import { z } from 'zod';

const userSignUp = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required and must be a valid email address',
    }),
    password: z.string({
      required_error: 'Password is required',
    })
  }),
});


const userLogin = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required and must be a valid email address',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

export const AuthValidation = {
  userSignUp,
  userLogin,
};
