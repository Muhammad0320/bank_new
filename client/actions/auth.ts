'use server';

import z from 'zod';
import { UserStatus } from '../utils/enums';
import { UserUpdatesObj } from '../utils/types';
import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { formDataConverter } from '../utils/formatter';
import { signupApi } from '../services/signup';
import { fromZodError } from 'zod-validation-error';

const PasswordType = z.object({
  password: z.string().min(8, 'Password too short'),
});

const SigninWithEmailForm = z
  .object({
    email: z.string().email({ message: 'Provide a valid email' }),
  })
  .merge(PasswordType);

const SigninWithUsername = z
  .object({
    username: z.string().min(6, 'Invalid username format: min of 6 chars'),
  })
  .merge(PasswordType);

const UserSchema = z.object({
  name: z.string({ message: 'Invalid name format' }),
  email: z.string().email('Invalid email format'),
  phone: z.number().min(13, 'Invalid phone format'),
  password: z.string().min(8, 'Password too short'),
  passwordConfirm: z.string(),
  username: z.string().min(6, 'Invalid username format: min of 6 chars'),
});

export type FormSchema = z.infer<typeof UserSchema>;

export type User = FormSchema & {
  id: string;
  version: number;
  createdAt: Date;
  status: UserStatus;
  avatar?: string;
  signinTimeStamps: Date[];
  updates: UserUpdatesObj[];
};

export const signupAction = async (prevState: any, formData: FormData) => {
  const parsedData = formDataConverter<FormSchema>(formData);

  const user = UserSchema.safeParse(parsedData);

  console.log(user);

  if (!user.success) {
    console.log(fromZodError(user.error));
    throw new Error('Something has gone wrong');
  }

  const data = await signupApi(user.data);

  console.log(data);

  // revalidateTag('signup');
  // redirect('/');
};


