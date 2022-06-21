import React from "react";
import styled from "styled-components";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";
import Heading from "../../components/Heading/Heading";
import Flex from "../../components/Box/Flex";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton, Button } from "../../components/Button";
import { InjectedProps } from "./types";
import { ButtonProps } from "../../components/Button/types";


interface Props extends InjectedProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
}

const StyledModal = styled.div<{isMobile: boolean}>`
  background: ${({ theme }) => theme.colors.input};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius:10px;
  width: 100%;
  word-wrap: break-word;
  z-index: ${({ theme }) => theme.zIndices.modal};
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: 360px;
    max-width: ${({ isMobile }) => (isMobile ? "100%" : "75vw")};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9eaeb;
  align-items: center;
  padding: 12px 24px;
`;

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

const IconButtonz = styled(Button)<ButtonProps>`
  padding: 0;
  width: ${({ size }) => (size === "sm" ? "32px" : "48px")};
  &:hover{
    color: "#000000";
  }
`;

const Modal: React.FC<Props> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "24px",
}) => (
  <StyledModal isMobile={isMobile}>
    <ModalHeader>
      <ModalTitle>
        {onBack && (
          <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
            <ArrowBackIcon color="primary" />
          </IconButton>
        )}
        <Heading>{title}</Heading>
      </ModalTitle>
      {!hideCloseButton && (
        <IconButtonz variant="text" onClick={onDismiss} aria-label="Close the dialog">
          <CloseIcon color="primaryBright" />
        </IconButtonz>
      )}
    </ModalHeader>
    <Flex flexDirection="column" p={bodyPadding}>
      {children}
    </Flex>
  </StyledModal>
);

export default Modal;
