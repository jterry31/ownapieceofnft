import React from "react";
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { localStorageKey } from "./config";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon } = walletConfig;
  // const { account, chainId } = useWallet()
  

  return (
    <Button
      fullWidth
      variant="primary"
      onClick={() => {
        // console.log("Chain ID is: ", chainId)
        login(walletConfig.connectorId);
        window.localStorage.setItem(localStorageKey, "1");
        onDismiss();
      }}
      style={{ justifyContent: "space-between" }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text bold color="tertiary" mr="16px">
        {title}
      </Text>
      <Icon width="32px" />
    </Button>
  );
};

export default WalletCard;
