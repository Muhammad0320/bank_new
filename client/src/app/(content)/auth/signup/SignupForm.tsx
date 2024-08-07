'use client';

import axios from 'axios';
import { FC, FormEvent } from 'react';
import { useFormState } from 'react-dom';
import Input from '../../../../../components/UI/Input';
import Button from '../../../../../components/UI/Button';

const FormPage: FC<{
  action: (prevState: any, formData: FormData) => Promise<{ errors: {}[] }>;
}> = ({ action }) => {
  const [state, formAction] = useFormState(action, { errors: [] });

  console.log(state, 'The error state from code');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await axios.get('https://banking.com/api/v1/user');

    const data = res.data;

    console.log(data, 'Test Data gotten back from signup form ts');
  };

  // return (
  //   <div>
  //     <form action={formAction}>
  //       <Input id="name" label="name" type="string" />
  //       <Input id="email" label="email" type="email" />
  //       <Input id="password" label=" password" type="password" />
  //       <Input id="passwordConfirm" label="password confirm" type="password" />
  //       <Input id="phone" label="phone" type="number" />
  //       <Input id="username" label="username" type="text" />

  //       <Button pending="Submitting"> Submit </Button>
  //     </form>
  //   </div>
  // );

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
