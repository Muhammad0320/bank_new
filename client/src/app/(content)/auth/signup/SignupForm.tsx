'use client';

import { FC, FormEvent } from 'react';
import { useFormState } from 'react-dom';
import { signupAction } from '../../../../../actions/auth';
import Button from '../../../../../components/UI/Button';
import Input from '../../../../../components/UI/Input';

const FormPage: FC<{
  action: (prevState: any, data: FormData) => Promise<{ error: [] }>;
}> = () => {
  const initialState: any = { error: [] };

  const [state, formAction] = useFormState(signupAction, initialState);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form action={formAction}>
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
