'use client';

import styled from 'styled-components';
import { MainContainer } from '../../styles/RootStyles';
import { ClampComponent } from '../../styles/clampBuilder';
import { FlexContainer } from '../../components/UI/uiStyles';

export const DashBoardContainer = styled(MainContainer)`
  display: grid;

  grid-template-rows: 1fr 10rem 1fr;

  grid-template-columns: none;

  gap: ${() => ClampComponent(900, 1250, 2, 3)};
`;

export const FirstDashBoardRow = styled.section`
  grid-row: 1 / 3;

  grid-column: 1 / 3;

  display: grid;

  // Add code sharing with styled component in both comps

  grid-template-columns: 1.8fr 1fr 1.25fr;

  grid-template-rows: 1fr 10rem;

  gap: ${() => ClampComponent(900, 1250, 2, 3)};

  & > * {
    box-shadow: var(--box-shadow-light);

    padding: ${() => ClampComponent(900, 1250, 1, 1.5)};

    border-radius: ${() => ClampComponent(900, 1250, 1.1, 1.5)};
  }
`;

export const LastDashboardRow = styled.section`
  grid-row: 2 / -1;
  grid-column: 1 / 3;

  display: grid;

  gap: ${() => ClampComponent(900, 1250, 2, 3)};

  grid-template-columns: 1fr 1.2fr 1fr;

  grid-template-rows: 10rem 1fr;
  & > * {
    box-shadow: var(--box-shadow-light);
    padding: ${() => ClampComponent(900, 1250, 1, 1.5)};
    border-radius: ${() => ClampComponent(900, 1250, 1.1, 1.5)};
  }
`;

export const BalaceSummary = styled(FlexContainer)`
  grid-row: 1 / 3;
  grid-column: 1 / 2;
`;

export const MonthlyCardContainer = styled(FlexContainer)`
  grid-row: 1 / 3;
  grid-column: 2 / 3;

  padding: 0;

  border-radius: 0%;

  box-shadow: none;

  & > * {
    padding: ${() => ClampComponent(900, 1250, 1, 1.5)};
    box-shadow: var(--box-shadow-light);
    border-radius: ${() => ClampComponent(900, 1250, 1, 1.5)};
  }
`;

export const TopBeneficiary = styled(FlexContainer)`
  grid-row: 1 / 2;

  grid-column: 3 / -1;
`;

export const Piechart = styled(FlexContainer)`
  grid-row: 1 / -1;
  grid-column: 3 / -1;
`;

export const FlashTransaction = styled(FlexContainer)`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`;

export const BalanceHistory = styled(FlexContainer)`
  grid-row: 2 / 3;

  grid-column: 2 /3;
`;