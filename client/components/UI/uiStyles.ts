'use client';

import styled from 'styled-components';
import { ClampComponent } from '../../styles/clampBuilder';

export const StyledIConContainer = styled.span`
  height: ${() => ClampComponent(900, 1250, 3, 4.5)};
  width: ${() => ClampComponent(900, 1250, 3, 4.5)};

  margin-block: auto;

  background: var(--primary-gradient);

  text-transform: uppercase;

  font-size: ${() => ClampComponent(900, 1250, 1.5, 2.5)};

  display: flex;

  justify-content: center;

  align-items: center;

  border-radius: 50%;

  margin-block: auto;
`;

export const FlexContainer = styled.div<{
  $flow: 'row' | 'column';
  $size: 'tiny' | 'small' | 'medium' | 'large' | 'unset' | 'btw' | 'inherit';
}>`
  display: flex;

  gap: ${() => ClampComponent(900, 1250, 2, 2.5)};
  flex-flow: ${prop => prop.$flow};
  gap: ${prop => prop.$size === 'large' && ClampComponent(900, 1250, 3, 3.5)};
  gap: ${prop => prop.$size === 'medium' && ClampComponent(900, 1250, 2, 2.5)};
  gap: ${prop => prop.$size === 'small' && ClampComponent(900, 1250, 1.5, 2)};
  gap: ${prop => prop.$size === 'tiny' && ClampComponent(900, 1250, 0.5, 1)};
  gap: ${prop => prop.$size === 'unset' && '0'};
  gap: ${prop => prop.$size === 'inherit' && 'inherit'};
  justify-content: ${prop => prop.$size === 'btw' && 'space-between'};
  align-items: ${prop => prop.$size === 'btw' && 'center'};

  /* &:first-child:has(svg) {
    width: max-content;
  } */
`;

export const ImageContainer = styled.div`
  position: relative;

  height: fit-content;
  width: auto;
`;

export const StyledInput = styled.input`
  border: 1px solid var(--text-color-dark);

  padding-inline: ${() => ClampComponent(900, 1250, 1.2, 2.4)};

  padding-block: ${() => ClampComponent(900, 1250, 1, 2)};

  background-color: transparent;

  border-radius: ${() => ClampComponent(900, 1250, 1.2, 2)};

  & :focus {
    outline: transparent;

    border: 1px solid var(--primary-gradient);
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  margin-block: auto;
  display: grid;
  place-content: center;

  width: 3rem;
  height: 3rem;

  border-radius: 50%;
  background-color: var(--text-color-dark);
`;

