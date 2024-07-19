import IconContainer from '../UI/IconContainer';
import { StyledH2, Text } from '../UI/Text';
import { FlexContainer, ImageContainer } from '../UI/uiStyles';
import logo from '/public/assets/images/logo.png';
import { StyledTopNav } from './NavStyles';
import Image from 'next/image';

import { IoNotificationsOutline } from 'react-icons/io5';
import { IoMoonOutline } from 'react-icons/io5';
import { IoSunnyOutline } from 'react-icons/io5';

const TopNav = () => {
  return (
    <StyledTopNav>
      <FlexContainer $flow="row" $size="large">
        <ImageContainer>
          <Image src={logo} alt="YourBank logo" />
        </ImageContainer>

        <FlexContainer $flow="column" $size="unset">
          <StyledH2> Hey, Muhammad 👋 </StyledH2>
          <Text> Welcome back to YourBank </Text>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer $flow="row" $size="small">
        <IconContainer>
          {' '}
          <IoNotificationsOutline />{' '}
        </IconContainer>
        <IconContainer>
          {' '}
          <IoSunnyOutline />{' '}
        </IconContainer>
        <IconContainer> M </IconContainer>
      </FlexContainer>
    </StyledTopNav>
  );
};

export default TopNav;

