import { navData } from './NavData';
import NavLink from './NavLink';
import NavLinks from './NavLinks';
import { StyledSidebar } from './NavStyles';

import { GoSignOut } from 'react-icons/go';
import { HiOutlineCog } from 'react-icons/hi';

const Sidebar = () => {
  return (
    <StyledSidebar>
      <NavLinks>
        {navData.map(({ content, icon, href }) => (
          <NavLink key={content} href={href} icon={icon}>
            {' '}
            {content}{' '}
          </NavLink>
        ))}
      </NavLinks>

      <NavLinks>
        <NavLink icon={HiOutlineCog} href="/settings">
          {' '}
          Settings{' '}
        </NavLink>
        <NavLink icon={GoSignOut} href="/logout">
          {' '}
          Logout{' '}
        </NavLink>
      </NavLinks>
    </StyledSidebar>
  );
};

export default Sidebar;

