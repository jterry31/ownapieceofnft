import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, TicketRound, Text, Heading } from 'uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import useTickets from 'hooks/useTickets'
import { useCurrentTime } from 'hooks/useTimer'
import TicketActions from './TicketActions'
import { getTicketSaleTime } from '../../helpers/CountdownHelpers'

interface CardProps {
  isSecondCard?: boolean
}

const StyledCard = styled(Card)<CardProps>`
  display: block;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  // position: relative;
  margin-bottom: 50px;
  
  ${(props) =>
    props.isSecondCard
      ? `  
        margin-top: 16px;

        ${props.theme.mediaQueries.sm} {
          margin-top: 24px;
        }

        ${props.theme.mediaQueries.lg} {
          margin-top: 32px;
        }
        `
      : ``}
`

const CardHeader = styled.div`
  align-items: center;
  display: flex;
`

const IconWrapper = styled.div`
  margin-right: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`
const TicketIconWrapper = styled.div`
  margin-right: 16px;
  image: ./ccake/ticket.png;
`

const TicketCountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
`

const TicketCard: React.FC<CardProps> = ({ isSecondCard = false }) => {
  const TranslateString = useI18n()
  const lotteryHasDrawn = useGetLotteryHasDrawn()

  const tickets = useTickets()
  const ticketsLength = tickets.length

  const currentMillis = useCurrentTime()
  const timeUntilTicketSale = lotteryHasDrawn && getTicketSaleTime(currentMillis)

  return (
    <StyledCard isSecondCard={isSecondCard}>
      <CardBody>
        <CardHeader>
          <IconWrapper />
          {lotteryHasDrawn ? (
            <TicketCountWrapper>
              <Text fontSize="26px" color="textSubtle">
                Your wallet is not connected
              </Text>
              <br />
              <Heading fontSize="20px">Please connect your wallet to Own a Piece of NFT from above, or to View Your NFT Information</Heading>
            </TicketCountWrapper>
          ) : (
            <TicketCountWrapper>
              <Text fontSize="14px" color="textSubtle">
                {TranslateString(999, '# of Owned Pieces of NFTs')}
              </Text>
              <Heading size="lg">{ticketsLength}</Heading>
            </TicketCountWrapper>
          )}
        </CardHeader>
        <TicketActions />
      </CardBody>
    </StyledCard>
  )
}

export default TicketCard
