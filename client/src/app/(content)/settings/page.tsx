import { Metadata } from 'next';
import Input from '../../../../components/UI/Input';
import { FlexContainer } from '../../../../components/UI/uiStyles';
import { SectionStyle } from '../../../../components/UI/SectionStyle';
import { StyledH1, StyledH3, Text } from '../../../../components/UI/Text';
import TextArea from '../../../../components/UI/TextArea';

export const metadata: Metadata = {
  title: 'Settings page',
};



const SettingsPage = () => {
  return (
    <SectionStyle>
      <FlexContainer $flow="column" $size="medium">
        <StyledH1>Settings</StyledH1>

        {/*  For the Profile settings  */}
        <FlexContainer $flow="column" $size="small">
          <StyledH3> Profile Settings </StyledH3>
          <FlexContainer $flow="row" $size="small">
            <Input label="Avatar" id="avatar" type="file" />
            <Input label="Your name" id="name" type="text" />
            <Input label="Your email address" id="email" type="email" />
            <Input label="Your Phone number" id="phone" type="number" />

            <Input label="Your Contact address" id="address" type="text" />
            <Input label="Date of birth" id="dob" type="date" />
          </FlexContainer>
        </FlexContainer>

        {/*  For Account settings */}
        <FlexContainer $flow="column" $size="small">
          <StyledH3> Account Settings </StyledH3>

          <FlexContainer $flow="row" $size="small">
            <Input label="Current pin" id="currentPin" type="password" />
            <Input label="New pin" id="newPin" type="password" />
            <Input label="Confirm pin" id="confirmPin" type="password" />
          </FlexContainer>

          <Text> Disply Account Number </Text>
          <Text> Disply Account Balace </Text>
          <Text> Disply Account Type </Text>
        </FlexContainer>

        {/*  Security settings  */}

        <FlexContainer $flow="column" $size="small">
          <StyledH3>Security Settings</StyledH3>

          <FlexContainer $flow="row" $size="small">
            <Input
              label="Current Password"
              id="currentPassword"
              type="password"
            />
            <Input label="New Password" id="newPassword" type="password" />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
            />
          </FlexContainer>
        </FlexContainer>

        {/*  Card settings  */}

        <FlexContainer $flow="column" $size="small">
          <StyledH3>Billing and Card settings</StyledH3>

          <FlexContainer $flow="row" $size="small">
            <Input label="Billing Address" id="billingAddress" type="text" />
            <Input label="Daily Card Limit" id="daily" type="text" />
            <Input label="Weekly Card Limit" id="weekly" type="text" />

            <Input label="Monthly Card Limit" id="monthly" type="text" />
          </FlexContainer>
        </FlexContainer>

        {/*  Notification settings.  */}

        <FlexContainer $flow="column" $size="small">
          <StyledH3>Notification Settings</StyledH3>

          <FlexContainer $flow="row" $size="small">
            <Text> Signin and Signout email notification </Text>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $flow="column" $size="small">
          <StyledH3> Support and Feedback </StyledH3>

          <TextArea
            label="Contact support"
            id="support"
            placeholder="Your coumplaint to customer support..."
          />
          <TextArea
            label="Submit Feedback"
            id="feedback"
            placeholder="Your Observation about our website and service"
          />
        </FlexContainer>
      </FlexContainer>
    </SectionStyle>
  );
};

export default SettingsPage;
