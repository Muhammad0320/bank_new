import { signupAction } from '../../../../actions/auth';
import FormPage from './SignupForm';

const Page = () => {
  return <FormPage action={signupAction} />;
};

export default Page;
