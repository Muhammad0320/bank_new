import { FormSchema, User } from '../type/User';
import { rootUrl } from '../utils/variable';

export const signupApi: (data: FormSchema) => Promise<User> = async (
  formData: FormSchema
) => {
  const res = await fetch('/api/v1/user/signup', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(formData),

    next: {
      tags: ['signup'],
    },
  });

  if (!res.ok) {
    console.log(res);

    throw new Error('Something went wrong');
  }

  const data = (await res.json()) as User;

  console.log(data, 'from the signup api ');

  return data;
};
