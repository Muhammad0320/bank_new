import { type ComponentPropsWithoutRef, FC } from 'react';
import { FlexContainer } from './uiStyles';

type TextAreaType = ComponentPropsWithoutRef<'textarea'> & {
  label: string;
  id: string;
};

const TextArea: FC<TextAreaType> = ({ label, id, ...props }) => {
  return (
    <FlexContainer $flow="column" $size="small">
      <label htmlFor={id}> {label} </label>
      <textarea id={id} {...props} />
    </FlexContainer>
  );
};

export default TextArea;
