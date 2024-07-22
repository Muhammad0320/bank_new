import { SigninWUsernameSchema, User } from '../type/User';
import { rootUrl } from '../utils/variable';

export const signinWithUsername = async (formData: SigninWUsernameSchema) => {
  const res = await fetch(rootUrl + '/user/signin/username', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    console.log(res);

    throw new Error('something happened while signining in');
  }

  const data = (await res.json()) as User;

  return data;
};
