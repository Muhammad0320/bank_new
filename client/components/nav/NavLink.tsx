import { FC, PropsWithChildren } from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLinkContainer } from './NavStyles';

type NavLinkType = PropsWithChildren & {
  href: string;
  icon: typeof FaHome;
};

const NavLink: FC<NavLinkType> = ({ children, href, ...props }) => {
  return (
    <NavLinkContainer href={href}>
      <props.icon />

      <span> {children} </span>
    </NavLinkContainer>
  );
};

export default NavLink;
