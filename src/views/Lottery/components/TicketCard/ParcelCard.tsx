import React, { useState, useContext, useCallback } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
  LogoIcon,
  LinkExternal,
} from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useSingleParcelInfo, useTokenURI } from 'hooks/useTickets'
import Page from 'components/layout/Page'
import Attributes from './Attributes'
import Image from './Image'

interface ParcelStruct {
  parcelID: string;
  parcelRow: string;
  parcelCol: string;
  mintPrice: number;
  ownerName: string;
  mail: string;
  twitter: string;
  wallet: string;
}

const InfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 0 24px 24px;
  margin-top: 30px;
`

const Value = styled(Text)`
  font-weight: 600;
`

const Divider = styled.div`
background-color: rgba(255,255,255,1);
height: 1px;
margin: 0 auto 32px;
margin-top: 1vh;
width: 70%;
`

const SmallCard = styled(Card)`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  // color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ParcelCard = (tokenID) => {
    const parcelInfo = useSingleParcelInfo(tokenID.tokenID)
    const tokenURI = useTokenURI(tokenID.tokenID)

    // console.log("Token ID: ", tokenID.tokenID)
    // console.log("Token URI: ", tokenURI)
    // const parcelRow = parcelInfo
    let walletInfo = ""
    const wallet = (parcelInfo as unknown as ParcelStruct).wallet
    const dead = "0x0000000000000000000000000000000000000000"
    const imageURL = "https://images.ownapieceofnft.com/".concat(tokenID.tokenID, ".png")
    if (wallet === dead)
      walletInfo = "Undisclosed"
    else
      walletInfo = wallet


    const testAttributes = [
        {"trait_type" : "Token ID:", "value" : tokenID.tokenID},
        {"trait_type" : "Token URI:", "value" : tokenURI},
        {"trait_type" : "Row-Coordinate:", "value" : (parcelInfo as unknown as ParcelStruct).parcelRow },
        {"trait_type" : "Col-Coordinate:", "value" : (parcelInfo as unknown as ParcelStruct).parcelCol },
        {"trait_type" : "Name:", "value" : (parcelInfo as unknown as ParcelStruct).ownerName },
        {"trait_type" : "Mail:", "value" : (parcelInfo as unknown as ParcelStruct).mail },
        {"trait_type" : "Twitter Address:", "value" : (parcelInfo as unknown as ParcelStruct).twitter },
        {"trait_type" : "Wallet:", "value" :  walletInfo }
    ]

    // console.log("Test attributes: ", testAttributes)
    const headingText = "Parcel #".concat(tokenID.tokenID)
    return (
        <SmallCard isActive>
          <CardBody>
            <Header>
              <Heading style={{fontSize: "24px"}}>{headingText}</Heading>
            </Header>
          </CardBody>

          <Image src={imageURL} alt={null} originalLink={null} />

          
          <CardFooter p="2">
              <InfoBlock>
                <Attributes attributes={testAttributes} />
             
              </InfoBlock>
            
          </CardFooter>
        </SmallCard>
      )
}

export default ParcelCard