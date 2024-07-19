import IconContainer from '../../../../components/UI/IconContainer';
import { StyledH3, StyledH4, Text } from '../../../../components/UI/Text';
import { FlexContainer } from '../../../../components/UI/uiStyles';
import {
  AccountBalanceContainer,
  AccountContainer,
  AccountDetailsComponent,
  AccountExpenceContainer,
  AccountFooterContainer,
} from './style';

const AccountPage = () => {
  return (
    <AccountContainer>
      <AccountBalanceContainer $flow="row" $size="inherit" as="ul">
        <FlexContainer $flow="row" $size="small" as="li">
          <IconContainer> I </IconContainer>

          <FlexContainer $flow="column" $size="tiny">
            <StyledH4> Total account Balance </StyledH4>
            <Text> $1,200,000 </Text>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer $flow="row" $size="small" as="li">
          <IconContainer> I </IconContainer>

          <FlexContainer $flow="column" $size="tiny">
            <StyledH4> Saving Account Balance </StyledH4>
            <Text> $500,000 </Text>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer $flow="row" $size="small" as="li">
          <IconContainer> I </IconContainer>

          <FlexContainer $flow="column" $size="tiny">
            <StyledH4> Current Account Balance </StyledH4>
            <Text> $700,000 </Text>
          </FlexContainer>
        </FlexContainer>
      </AccountBalanceContainer>

      <AccountExpenceContainer $flow="column" $size="small" as={'section'}>
        <StyledH3> Account Expence </StyledH3>

        <div>I m gonna be the graph</div>
      </AccountExpenceContainer>

      <AccountFooterContainer>
        <FlexContainer $flow="column" $size="small">
          <StyledH4> Any suspicious movement? </StyledH4>
          <div> buttons </div>
        </FlexContainer>

        <FlexContainer $flow="column" $size="small">
          <StyledH4> Beneficiaries? </StyledH4>
          <div> buttongs </div>
        </FlexContainer>
      </AccountFooterContainer>

      <AccountDetailsComponent as="section" $flow="column" $size="small">
        <FlexContainer $flow="column" $size="tiny">
          <Text> Income </Text>
          <FlexContainer $flow="column" $size="tiny">
            <Text> $12,000 </Text>

            <div>I m gonna be the graph</div>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $flow="column" $size="tiny">
          <Text> Expence </Text>
          <FlexContainer $flow="column" $size="tiny">
            <Text> $12,000 </Text>

            <div>I m gonna be the graph</div>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $flow="column" $size="small" as="ul">
          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> Account Status </Text>
            <Text $size="small"> Active </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> Account No </Text>
            <Text $size="small"> 9640253013 </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> Pin </Text>
            <Text $size="small"> .... </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> Account Name </Text>
            <Text $size="small"> Balogun Muhammad </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> BVN </Text>
            <Text $size="small"> 2291202020 </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> DOB </Text>
            <Text $size="small"> 20rd Nov. 2005 </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> Phone </Text>
            <Text $size="small"> 09166537641 </Text>
          </FlexContainer>

          <FlexContainer $flow="row" $size="btw" as={'li'}>
            <Text> Address </Text>
            <Text $size="small"> G50, Balogun compd... </Text>
          </FlexContainer>
        </FlexContainer>
      </AccountDetailsComponent>
    </AccountContainer>
  );
};

export default AccountPage;
