'use client';

import { useFormState } from 'react-dom';
import { signupAction } from '../../../../../actions/auth';
import Input from '../../../../../components/UI/Input';
import Button from '../../../../../components/UI/Button';

const FormPage = () => {
  const initialState: any = { message: [] };

  const [state, formAction] = useFormState(signupAction, initialState);

  return (
    <div>
      <form action={formAction}>
        <Input id="name" label="name" type="string" />
        <Input id="email" label="email" type="email" />
        <Input id="password" label=" password" type="password" />
        <Input id="passwordConfirm" label="password confirm" type="password" />
        <Input id="phone" label="phone" type="number" />

        <Button pending="Submitting"> Submit </Button>
      </form>
    </div>
  );
};

export default FormPage;
