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

const PreviewParcelCard = (tokenInfo) => {

    console.log("PreviewParcelCard, tokenInfo: ", tokenInfo.tokenInfo, tokenInfo.tokenInfo.tokenID)
    const testAttributes = [
        {"trait_type" : "Token ID:", "value" : tokenInfo.tokenInfo.tokenID},
        {"trait_type" : "Token URI:", "value" : tokenInfo.tokenInfo.tokenURI},
        {"trait_type" : "Row-Coordinate:", "value" : tokenInfo.tokenInfo.rowCoord},
        {"trait_type" : "Col-Coordinate:", "value" : tokenInfo.tokenInfo.colCoord },
        {"trait_type" : "Section:", "value" : tokenInfo.tokenInfo.section }
    ]

    // console.log("Test attributes: ", testAttributes)
    const headingText = "Parcel #".concat(tokenInfo.tokenInfo.tokenID)
    return (
        <SmallCard isActive>
          <CardBody>
            <Header>
              <Heading style={{fontSize: "18px"}}>{headingText}</Heading>
            </Header>
          </CardBody>

          <Image src={tokenInfo.tokenInfo.imageURL} alt={null} originalLink={null} />

          
          <CardFooter p="2">
              <InfoBlock>
                <Attributes attributes={testAttributes} />
             
              </InfoBlock>
            
          </CardFooter>
        </SmallCard>
      )
}

export default PreviewParcelCard