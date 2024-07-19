'use client';

import styled from 'styled-components';
import { MainContainer } from '../../../../styles/RootStyles';
import { ClampComponent } from '../../../../styles/clampBuilder';
import { FlexContainer } from '../../../../components/UI/uiStyles';

export const ReportContainer = styled(MainContainer)`
  display: grid;

  grid-template-columns: repeat(4, 1fr) 1.2fr;

  grid-template-rows: 1fr 3fr 1fr;

  gap: ${() => ClampComponent(900, 1250, 1.5, 3)};
`;

export const FirstReportRow = styled(FlexContainer)`
  grid-row: 1/ 2;
  grid-column: 1 / -1;

  gap: inherit;

  & > * {
    flex: 1;
    min-width: fit-content;
    padding: ${() => ClampComponent(900, 1250, 1, 1.5)};

    border-radius: ${() => ClampComponent(900, 1250, 1, 1.4)};

    box-shadow: var(--box-shadow-light);
  }
`;

export const SigninReport = styled(FlexContainer)`
  grid-column: 5 / -1;
  grid-row: 2 / 3;

  background-color: aliceblue;
  padding: ${() => ClampComponent(900, 1250, 1, 1.5)};

  border-radius: ${() => ClampComponent(900, 1250, 1, 1.4)};

  box-shadow: var(--box-shadow-light);
`;

export const LastReportRow = styled(FlexContainer)`
  grid-column: 1 / -1;

  grid-row: 3 / -1;

  gap: inherit;

  & > * {
    flex: 1;
    min-width: fit-content;

    padding: ${() => ClampComponent(900, 1250, 1, 1.5)};

    border-radius: ${() => ClampComponent(900, 1250, 1, 1.4)};

    box-shadow: var(--box-shadow-light);
  }
`;

export const MiddleReportRow = styled.section`
  grid-row: 2 / 3;
  grid-column: 1 / 5;

  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: inherit;
  grid-template-rows: repeat(2, 1fr);

  & > * {
    padding: ${() => ClampComponent(900, 1250, 1, 1.5)};

    border-radius: ${() => ClampComponent(900, 1250, 1, 1.4)};

    box-shadow: var(--box-shadow-light);
  }
`;

export const BalanceSummaryReport = styled(FlexContainer)`
  grid-row: 1 / -1;
  grid-column: 1 / 2;
`;

export const RecentTxnReport = styled(FlexContainer)`
  grid-row: 2 / -1;

  grid-column: 2 / -1;
`;

export const UpdatesReport = styled(FlexContainer)`
  grid-column: 2 / -1;
  grid-row: 1 / 2;
`;
