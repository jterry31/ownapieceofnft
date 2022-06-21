import React from "react";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";
import styled from 'styled-components'
import ParcelList from 'views/Lottery/components/TicketCard/ParcelList'
import { useTickets, useImageWidth } from 'hooks/useTickets'
import {Heading, Dropdown} from 'uikit'
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import LinkExternal from "../../components/Link/LinkExternal";
import Flex from "../../components/Box/Flex";
import { Modal } from "../Modal";
import CopyToClipboard from "./CopyToClipboard";
import { localStorageKey } from "./config";



interface Props {
  account: string;
  logout: () => void;
  onDismiss?: () => void;
}

const Divider = styled.div`
  border-bottom: 1px solid #e9eaeb;
`

const getTickets = (tokenIDs, imageWidth) => {
  
  let tokenStr = ""
  let numStr = ""

  for(let i=0; i<tokenIDs.length; i++) {
    tokenStr = tokenStr.concat(tokenIDs[i].toString())
    const parcelRow = Math.floor(tokenIDs[i] / imageWidth).toString()
    const parcelCol = (tokenIDs[i] % imageWidth).toString()
    numStr = numStr.concat("[",parcelRow, "," , parcelCol,"]")
    if(i < tokenIDs.length - 1) {
      tokenStr = tokenStr.concat(", ")
      numStr = numStr.concat(", ")
    }
  }

  return [tokenStr, numStr]
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null }) => {
  console.log("In account modal")
  const tokenIDs = [1,2,3] // useTickets()
  const imageWidth = useImageWidth()

  const strData = getTickets(tokenIDs, imageWidth)
  return (
      <Modal title="My Wallet" onDismiss={onDismiss}>
      <Divider>
        <Text  fontSize= {isMobile ? "16px" : "20px"}>Your Address</Text>
      </Divider>
      <Text
        fontSize= {isMobile ? "13px" : "20px"}
        bold
        style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "8px" }}
      >
        {account}
      </Text>
      <Flex mb="32px">
        <LinkExternal small href={`https://bscscan.com/address/${account}`} mr="16px">
          View on BscScan
        </LinkExternal>
        <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
      </Flex>
      {strData[0] !== "" ?
        <>
       <Divider>
        <Text  fontSize= {isMobile ? "16px" : "20px"}>Your Parcel Info</Text>
      </Divider>

        <br />

        {/*
        <Text> <h3 style={{display: "inline-flex", fontSize: "16px"}}> Parcel Token ID(s): </h3> {strData[0]} </Text>
        <Text> <h3 style={{display: "inline-flex", fontSize: "16px"}}> Parcel Coordinates(Row,Col): </h3> {strData[1]} </Text>
        <br /><br />
        <Text> You can click your parcels in the main image to see a more detailed information. </Text>

        */}
        
        <ParcelList />
      <br />
        </>
     : null}
     
      <Flex justifyContent="center" marginTop="30px">
      
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            logout();
            window.localStorage.removeItem(localStorageKey);
            onDismiss();
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </Flex>
    </Modal>
  );
  
};

export default AccountModal;
