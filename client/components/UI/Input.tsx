import { ComponentPropsWithoutRef, FC } from 'react';
import { FlexContainer, StyledInput } from './uiStyles';
import { LuLayoutDashboard } from 'react-icons/lu';

type InputType = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>;

const Input: FC<InputType> = ({ label, id, ...props }) => {
  return (
    <FlexContainer $flow="column" $size="tiny">
      <label htmlFor={id}> {label}</label>
        < LuLayoutDashboard />
      <StyledInput id={id} {...props} name={id} />
    </FlexContainer>
  );
};

export default Input;
