import { z } from 'zod';
import { UserStatus } from '../utils/enums';
import { UserUpdatesObj } from '../utils/types';

export const PasswordType = z.object({
  password: z.string().min(8, 'Password too short'),
});

export const SigninWithEmailFormSchema = z
  .object({
    email: z.string().email({ message: 'Provide a valid email' }),
  })
  .merge(PasswordType);

export const SigninWithUsernameSchema = z
  .object({
    username: z.string().min(6, 'Invalid username format: min of 6 chars'),
  })
  .merge(PasswordType);

export const UserSchema = z.object({
  name: z.string({ message: 'Invalid name format' }),
  email: z.string().email('Invalid email format'),
  phone: z.number().min(13, 'Invalid phone format'),
  password: z.string().min(8, 'Password too short'),
  passwordConfirm: z.string(),
  username: z.string().min(6, 'Invalid username format: min of 6 chars'),
});

export type FormSchema = z.infer<typeof UserSchema>;
export type SigninWEmailSchema = z.infer<typeof SigninWithEmailFormSchema>;
export type SigninWUsernameSchema = z.infer<typeof SigninWithUsernameSchema>;

export type User = FormSchema & {
  id: string;
  version: number;
  createdAt: Date;
  status: UserStatus;
  avatar?: string;
  signinTimeStamps: Date[];
  updates: UserUpdatesObj[];
};
