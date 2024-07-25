import axios from 'axios';
import https from 'https';
import { FormSchema, User } from '../type/User';



export const signupApi = async (formData: FormSchema) => {
  try {
    // const res = await axiosInstance.get('/user');

    const res = await axios.get('/api/v1/user');

    const data = res.data;
    console.log(data, 'from the signup api');
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
// pass1234
