import { SigninWUsernameSchema, User } from '../../type/User';
import { rootUrl } from '../../utils/variable';

export const signinWithUsername = async (formData: SigninWUsernameSchema) => {
  const res = await fetch('/api/v1/user/signin/username', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(formData),

    next: {
      tags: ['signin', 'username'],
    },
  });

  if (!res.ok) {
    console.log(res);

    throw new Error('something happened while signining in');
  }

  const data = (await res.json()) as User;

  return data;
};
