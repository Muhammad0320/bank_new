import axios from 'axios';
import { FormSchema, User } from '../type/User';
import { rootUrl } from '../utils/variable';

export const signupApi: (formData: FormSchema) => Promise<User> = async (
  formData: FormSchema
) => {
  const res = await axios.post('/api/v1/user/signup', { ...formData });

  const data = await res.data();

  console.log(data, 'from the signup api ');

  return data;
};
