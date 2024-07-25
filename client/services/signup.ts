import axios from 'axios';
import { FormSchema } from '../type/User';

export const signupApi = async (formData: FormSchema) => {
  try {
    // const res = await axiosInstance.get('/user');


    const errors = [{}];

    const res = await axios.get('/api/v1/user');

    const data = res.data;
    console.log(data, 'from the signup api');

    if (errors && errors.length) {
      return {
        errors,
      };
    }

  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
// pass1234
