'use client';

import styled from 'styled-components';
import { ClampComponent } from './clampBuilder';

export const StyledBody = styled.body`
  margin: 0;
  padding: 0;

  display: grid;

  grid-template-columns: auto 1fr;

  grid-template-rows: auto 1fr;
`;

export const MainContainer = styled.main`
  grid-column: 2 / -1;
  grid-row: 2 / -1;

  padding-block: ${() => ClampComponent(900, 1250, 2.5, 3.5)};
  padding-inline: ${() => ClampComponent(900, 1250, 2, 3)};
`;


