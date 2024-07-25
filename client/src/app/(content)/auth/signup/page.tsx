import { signupApi } from '../../../../../services/signup';
import FormPage from './SignupForm';

const Page = () => {
  return <FormPage action={signupApi} />;
};

export default Page;
