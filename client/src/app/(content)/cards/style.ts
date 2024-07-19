'use client';

import styled from 'styled-components';
import { MainContainer } from '../../../../styles/RootStyles';
import { FlexContainer } from '../../../../components/UI/uiStyles';
import { ClampComponent } from '../../../../styles/clampBuilder';

export const CardComponentWrapper = styled(MainContainer)`
  display: grid;

  grid-template-columns: 1fr auto;

  gap: ${() => ClampComponent(900, 1250, 1.5, 2)};
`;

export const CardContainer = styled(FlexContainer)`
  padding-inline: ${() => ClampComponent(900, 1250, 1, 1.5)};

  background-color: aliceblue;
`;

export const CardOverviewContainer = styled.section`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  grid-template-rows: 1fr 1.5fr;

  gap: ${() => ClampComponent(900, 1250, 1.5, 3)};

  & > * {
    border-radius: ${() => ClampComponent(900, 1250, 1, 1.4)};

    box-shadow: var(--box-shadow-light);

    padding: ${() => ClampComponent(900, 1250, 1, 1.5)};
  }
`;

export const CardExpence = styled(FlexContainer)`
  grid-column: 1 / 2;
  grid-row: 1 /2;
`;

export const CardAnalytics = styled(FlexContainer)`
  grid-column: 2 / -1;
  grid-row: 1 / 2;
`;

export const RecentTransaction = styled(FlexContainer)`
  grid-column: 1 / -1;

  grid-row: 2 / -1;
`;

export const CreditCard = styled.div`
  border-radius: ${() => ClampComponent(900, 1250, 1, 1.4)};

  box-shadow: var(--box-shadow-light);

  padding: ${() => ClampComponent(900, 1250, 1, 1.5)};

  width: 15rem;

  aspect-ratio: 16 / 9;
`;
