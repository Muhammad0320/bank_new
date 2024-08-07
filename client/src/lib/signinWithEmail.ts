import { SigninWEmailSchema, User } from '../../type/User';
import { rootUrl } from '../../utils/variable';

export const SigninWithEmail = async (formData: SigninWEmailSchema) => {
  const res = await fetch(`${rootUrl}/user/signin/email`, {
    method: 'POST',
    body: JSON.stringify(formData),

    headers: {
      'Content-Type': 'application/json',
    },

    next: {
      tags: ['signin', 'email'],
    },
  });

  if (!res.ok) {
    console.log(res);

    throw new Error('Something happended while tying to signin');
  }

  const data = (await res.json()) as User;

  return data;
};
