import axios from 'axios';
import https from 'https';
import { FormSchema, User } from '../type/User';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export const signupApi: (formData: FormSchema) => Promise<User> = async (
  formData: FormSchema
) => {
  try {
    const res = await axiosInstance.get('/user');
    const data = res.data;
    console.log(data, 'from the signup api');
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
