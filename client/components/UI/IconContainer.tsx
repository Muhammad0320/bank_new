import { ReactNode } from 'react';
import { StyledIConContainer } from './uiStyles';

const IconContainer = ({ children }: { children: ReactNode }) => {
  return <StyledIConContainer>{children}</StyledIConContainer>;
};

export default IconContainer;
