'use server';

import { fromZodError } from 'zod-validation-error';
import { signupApi } from '../services/signup';
import { FormSchema, UserSchema } from '../type/User';
import { formDataConverter } from '../utils/formatter';

export const signupAction = async (prevState: any, formData: FormData) => {
  const parsedData = formDataConverter<FormSchema>(formData);

  const user = UserSchema.safeParse(parsedData);

  console.log(user);

  if (!user.success) {
    console.log(fromZodError(user.error), 'The error sent back from zod error');
    throw new Error('Something has gone wrong');
  }

  const data = await signupApi(user.data);

  console.log(data);

  // revalidateTag('signup');
  // redirect('/');
};
