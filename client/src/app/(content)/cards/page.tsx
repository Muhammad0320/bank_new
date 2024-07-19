import React from 'react';
import {
  CardAnalytics,
  CardComponentWrapper,
  CardContainer,
  CardExpence,
  CardOverviewContainer,
  CreditCard,
  RecentTransaction,
} from './style';
import { StyledH3, Text, StyledH4 } from '../../../../components/UI/Text';
import { FlexContainer } from '../../../../components/UI/uiStyles';

const Page: React.FC = () => {
  return (
    <CardComponentWrapper>
      <CardOverviewContainer>
        <CardExpence $flow="column" $size="small">
          <StyledH3> Card Expence </StyledH3>
          <div>The pie chart</div>
        </CardExpence>

        <CardAnalytics $flow="column" $size="small">
          <StyledH3> Card Expence </StyledH3>
          <div> The grapth </div>
        </CardAnalytics>

        <RecentTransaction $flow="column" $size="small">
          <StyledH3> Recent Transactions </StyledH3>
          <div> Transaction Table </div>
        </RecentTransaction>
      </CardOverviewContainer>

      <CardContainer $flow="column" $size="small">
        <CreditCard>Visa</CreditCard>

        <FlexContainer $flow="column" $size="tiny">
          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Card Balance </Text>
            <Text $size="small"> $25,000 </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Credit Limit </Text>
            <Text $size="small"> $10,000 </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Daily txn Limit </Text>
            <Text $size="small"> $1000 </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Weekly txn Limit </Text>
            <Text $size="small"> $10,000 </Text>
          </FlexContainer>
          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Daily txn Limit </Text>
            <Text $size="small"> $20,000 </Text>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $flow="column" $size="tiny">
          <StyledH4> Information </StyledH4>

          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Provider </Text>
            <Text $size="small"> Visa </Text>
          </FlexContainer>

          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Status </Text>
            <Text $size="small"> Active </Text>
          </FlexContainer>

          <FlexContainer $flow="row" $size="btw">
            <Text $size="small"> Type </Text>
            <Text $size="small"> Credit </Text>
          </FlexContainer>
        </FlexContainer>
      </CardContainer>
    </CardComponentWrapper>
  );
};

export default Page;
