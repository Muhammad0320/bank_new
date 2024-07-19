'use client';

import styled, { css } from 'styled-components';
import { ClampComponent } from '../../styles/clampBuilder';

export const StyledH1 = styled.h1`
  color: var(--black-color);
  font-weight: 600;
  font-size: ${() => ClampComponent(900, 1250, 2.5, 3.5)};
`;

export const StyledH2 = styled.h2`
  color: var(--black-color);

  font-weight: 500;

  font-size: ${() => ClampComponent(900, 1250, 1.5, 2.5)};
`;

export const StyledH3 = styled.h3`
  color: var(--black-color);

  font-weight: 500;

  font-size: ${() => ClampComponent(900, 1250, 1.5, 2)};
`;



export const Text = styled.p<{ $size?: 'small' | 'large' }>`
  color: var(--black-color-light);

  font-size: ${() => ClampComponent(900, 1250, 1.2, 1.5)};

  ${props =>
    props.$size === 'small' &&
    css`
      font-size: ${() => ClampComponent(900, 1250, 0.6, 1)};
      color: var(--card-color);
      font-size: 400;
    `}
`;

export const StyledH4 = styled.h4`
  color: var(--black-color);
  font-weight: 500;

  font-size: ${() => ClampComponent(900, 1250, 1.2, 1.7)};
`;



