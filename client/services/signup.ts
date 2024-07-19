import { FormSchema, User } from '../actions/auth';
import { rootUrl } from '../utils/variable';

export const signupApi: (data: FormSchema) => Promise<User> = async (
  formData: FormSchema
) => {
  const res = await fetch(`${rootUrl}/signup`, {
    method: 'Post',
    body: JSON.stringify(formData),

    headers: {
      'Content-Type': 'application/json',
    },
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
