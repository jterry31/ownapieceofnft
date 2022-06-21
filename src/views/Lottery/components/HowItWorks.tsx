import React from 'react'
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";
import styled from 'styled-components'
import { Text, Heading, Link, Image, Flex } from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import Puzzle from 'views/Lottery/components/Puzzle'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalClaim } from 'hooks/useTickets'
import TicketCard from './TicketCard'

const LayoutWrapper = styled.div`
  max-width: 2000px;
  // background: url('/images/frame3.png');
  // background-size: 100% 80%;
  // background-repeat: no-repeat;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  
`

const StyledHeading = styled(Heading)`
  margin: 16px 0;
`

const StyledImage = styled(Image)`
  align-self: center;
`

const PortraitSpace = styled.div`
  margin-top: 4.2%;
`
const PortraitSpace2 = styled.div`
  margin-bottom: 20%;
`
const StyledPuzzle = styled.div<{isMobile: boolean}>`
  margin-right: auto;
  margin-left: auto;
  box-shadow: ${({isMobile}) => (isMobile ? "15px 10px 10px #888888;" :  "40px 25px 10px #888888;")} 

`
const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 16px;
`

const HowItWorks = () => {
  const { account } = useWallet()
  console.log("Account", account)
  const { claimAmount } = useTotalClaim()
  const TranslateString = useI18n()
  const winnings = getBalanceNumber(claimAmount)
  const isAWin = winnings > 0

  return (
    <>
      <LayoutWrapper>
       <PortraitSpace />
       <PortraitSpace2 />
      
        {/* <StyledImage src="/images/bnb_dark.png" alt="lottery bunny" width={1200} height={500} /> 
        <StyledHeading size="lg" as="h3" color="primary">
          {TranslateString(999, 'How It Works')}
        </StyledHeading>
        <Text fontSize="16px">
          {TranslateString(
            999,
            'Doldurulacak',
          )}
        </Text>
        <StyledLink href="https://bos.yapma/">Read more</StyledLink> 
        <StyledLink href="https://test.com">Read more</StyledLink> */}
         
      </LayoutWrapper>
      <TicketCard isSecondCard={isAWin} />
     
     
    </>
  )
}

export default HowItWorks
