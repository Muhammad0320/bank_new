import axios from 'axios';
import { FormSchema, User } from '../type/User';
import { rootUrl } from '../utils/variable';
import https from 'https';

const axiosInstance = axios.create({
  baseURL: 'https://banking.dev/api/v1',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Ignore self-signed certificate
  }),
});

export const signupApi: (formData: FormSchema) => Promise<User> = async (
  formData: FormSchema
) => {
  const res = await axiosInstance.get('https://banking.dev/api/v1/user');

  const data = res.data();

  console.log(data, 'from the signup api ');

  return data;
};
