'use client';

import { useFormState } from 'react-dom';
import { signupAction } from '../../../../../actions/auth';
import Input from '../../../../../components/UI/Input';
import Button from '../../../../../components/UI/Button';
import { FormEvent } from 'react';
import axios from 'axios';

const FormPage = () => {
  const initialState: any = { message: [] };

  // const [state, formAction] = useFormState(signupAction, initialState);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.get('/api/v1/user');

      console.log(res.data);
    } catch (error) {
      console.log('Foem Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <Input id="name" label="name" type="string" />
        <Input id="email" label="email" type="email" />
        <Input id="password" label=" password" type="password" />
        <Input id="passwordConfirm" label="password confirm" type="password" />
        <Input id="phone" label="phone" type="number" />
        <Input id="username" label="username" type="text" />

        <Button pending="Submitting"> Submit </Button>
      </form>
    </div>
  );
};

export default FormPage;

