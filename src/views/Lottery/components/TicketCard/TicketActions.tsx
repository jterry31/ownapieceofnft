import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, useModal } from 'uikit'
import useI18n from 'hooks/useI18n'
import useGetLotteryHasDrawn from 'hooks/useGetLotteryHasDrawn'
import { useLotteryAllowance } from 'hooks/useAllowance'
import { useLotteryApprove } from 'hooks/useApprove'
import useTickets from 'hooks/useTickets'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCustomAddress } from 'utils/addressHelpers'
import BuyTicketModal from './BuyTicketModal'
import MyTicketsModal from './UserTicketsModal'
import PurchaseWarningModal from './PurchaseWarningModal'

const CardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: space-evenly;
  }
`

const TicketCard: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const TranslateString = useI18n()
  const allowance = useLotteryAllowance()
  const { onApprove } = useLotteryApprove()
  const lotteryHasDrawn = useGetLotteryHasDrawn()
  const cakeBalance = useTokenBalance(getCustomAddress())

  const data = useTickets()
  const tickets = []
  const ticketsLength = 0
  const [onPresentMyTickets] = useModal(<MyTicketsModal myTicketNumbers={tickets} from="buy" />)
  const [onPresentApprove] = useModal(<PurchaseWarningModal />)
  

  const [onPresentBuy] = useModal(<BuyTicketModal max={cakeBalance} />)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
      onPresentApprove()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, onPresentApprove])

  const renderLotteryTicketButtons = () => {
    if (!allowance.toNumber()) {
      return (
        <>
          <Button fullWidth disabled>
            {TranslateString(432, 'View Your NFT Info')}
          </Button>
          <Button fullWidth disabled={requestedApproval} onClick={handleApprove}>
            {TranslateString(999, 'Approve CUSTOM')}
          </Button>
        </>
      )
    }
    return (
      <>
        <Button
          style={{ marginRight: '8px' }}
          fullWidth
          disabled={ticketsLength === 0}
          variant="primary"
          onClick={onPresentMyTickets}
        >
          View Your NFT Info
        </Button>
      </>
    )
  }

  return (
    <CardActions>
      {lotteryHasDrawn ? (
        <>
        <Button disabled> {TranslateString(999, 'View Your NFT Info')}</Button>
        </>
      ) : (
        renderLotteryTicketButtons()
      )}
    </CardActions>
  )
}

export default TicketCard
