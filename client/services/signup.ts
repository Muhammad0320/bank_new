import axios from 'axios';
import https from 'https';
import { FormSchema, User } from '../type/User';

const axiosInstance = axios.create({
  baseURL: 'https://banking.com/api/v1',
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

export const signupApi = async (formData: FormSchema) => {
  try {
    // const res = await axiosInstance.get('/user');
    const res = await fetch('https://banking.com/api/v1/user');
    const data = res;
    console.log(data, 'from the signup api');
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
// pass1234