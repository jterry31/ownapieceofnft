import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { sizes, variants } from "../Button/types";
import { ButtonMenuItemProps } from "./types";

type InactiveButtonProps = {
  colorKey: "primary" | "textSubtle";
} & ButtonMenuItemProps;

const InactiveButton = styled(Button)<InactiveButtonProps>`
  background-color: rgba(0,0,0,1);
  color: rgba(238,238,238,1);
  border-radius: 0px;
  &:hover:not(:disabled):not(.button--disabled):not(:active) {
    background-color: rgba(255,255,255,0.1);
    
  }

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
    border-radius: 0px;
  }
`;

const ButtonMenuItem: React.FC<ButtonMenuItemProps> = ({
  isActive = false,
  size = sizes.MD,
  variant = variants.PRIMARY,
  as,
  ...props
}) => {
  if (!isActive) {
    return (
      <InactiveButton
        forwardedAs={as}
        size={size}
        variant="primary"
        colorKey={variant === variants.PRIMARY ? "primary" : "textSubtle"}
        {...props}
      />
    );
  }

  const br = "menu";
  return <Button as={as} size={size} variant={variant} br={br} {...props} />;
};

export default ButtonMenuItem;
