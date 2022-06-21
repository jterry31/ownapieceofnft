import React from "react";
import {
  isMobile,
  isBrowser
} from "react-device-detect";
import Button from "../../components/Button/Button";
import { useWalletModal } from "../WalletModal";
import { Login } from "../WalletModal/types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
  
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 3)}...${account.substring(account.length - 3)}` : null;
  return (
    <div>
      {account ? (
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          My Wallet
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          {isMobile ? "Connect" : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
};

export default UserBlock;
