import { FC, ReactNode } from 'react';
import { StyledNavLinks } from './NavStyles';

const NavLinks: FC<{ children: ReactNode }> = ({ children }) => {
  return <StyledNavLinks>{children}</StyledNavLinks>;
};

export default NavLinks;


