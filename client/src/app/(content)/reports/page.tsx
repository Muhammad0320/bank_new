import React from 'react';
import {
  BalanceSummaryReport,
  FirstReportRow,
  LastReportRow,
  MiddleReportRow,
  RecentTxnReport,
  ReportContainer,
  SigninReport,
  UpdatesReport,
} from './style';
import { FlexContainer } from '../../../../components/UI/uiStyles';
import IconContainer from '../../../../components/UI/IconContainer';
import { StyledH3, Text } from '../../../../components/UI/Text';

const Page: React.FC = () => {
  return (
    <ReportContainer>
      <FirstReportRow $flow="row" $size="inherit" style={{ flex: '1' }}>
        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> $12,00 </StyledH3>
            <Text> Avg. Trasnsaction </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> $100 </StyledH3>
            <Text> Min. Trasnsaction </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> $15,000 </StyledH3>
            <Text> Max. Trasnsaction </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> 40 </StyledH3>
            <Text> Transactions </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>
      </FirstReportRow>

      <MiddleReportRow>
        <BalanceSummaryReport $flow="column" $size="small">
          <StyledH3> Balance Report </StyledH3>
          <div> Actual report... </div>
        </BalanceSummaryReport>

        <UpdatesReport $flow="column" $size="small">
          <StyledH3> Updates </StyledH3>
          <div> Updates... </div>
        </UpdatesReport>

        <RecentTxnReport $flow="column" $size="small">
          <StyledH3> Recent Transactions </StyledH3>
          <div> Recent Transaction... </div>
        </RecentTxnReport>
      </MiddleReportRow>

      <LastReportRow $flow="row" $size="inherit">
        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> $12,00 </StyledH3>
            <Text> Total Deposits </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> 12 </StyledH3>
            <Text> Total Deposit </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> $199 </StyledH3>
            <Text> Total withdrawal </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>

        <FlexContainer $flow="row" $size="small">
          <IconContainer> I </IconContainer>
          <FlexContainer $flow="column" $size="unset">
            <StyledH3> 50 </StyledH3>
            <Text> Total withdrawal </Text>
            <Text $size="small"> +1.2% than last month </Text>
          </FlexContainer>
        </FlexContainer>
      </LastReportRow>

      <SigninReport $flow="column" $size="small">
        <StyledH3> Signins </StyledH3>

        <div> Actual signin content </div>
      </SigninReport>
    </ReportContainer>
  );
};

export default Page;

