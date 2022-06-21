import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { CardProps } from "./types";

interface StyledCardProps extends CardProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success --> Active
 */
const getBoxShadow = ({ isActive, isSuccess, isWarning, theme }: StyledCardProps) => {
  if (isWarning) {
    return theme.card.boxShadowWarning;
  }

  if (isSuccess) {
    return theme.card.boxShadowSuccess;
  }

  if (isActive) {
    return theme.card.boxShadowActive;
  }

  return theme.card.boxShadow;
};

const StyledCard = styled.div<StyledCardProps>`
  background-color: rgba(0,0,0,1);
  border: rgba(247, 214, 87, 0.2);
  border-radius: 16px;
  box-shadow: 0.2vw 0.2vw 0.8vw rgba(247, 214, 87, 0.6);
  color: ${({ theme, isDisabled }) => theme.colors[isDisabled ? "textDisabled" : "text"]};
  overflow: hidden;
  position: relative;

  ${space}
`;

StyledCard.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
};

export default StyledCard;
