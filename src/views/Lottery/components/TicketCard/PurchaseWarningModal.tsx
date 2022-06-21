import React from 'react'
import { Button, Modal } from 'uikit'
import ModalActions from 'components/ModalActions'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

const WarningModal: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  const TranslateString = useI18n()

  return (
    <Modal title={TranslateString(466, 'Warning')} onDismiss={onDismiss}>
      <TicketsList>
          NFT/Parcel claimings are final.
        <br />
          Your CUSTOM will not be returned to you after you spend it to claim parcels.
        <br />
          Claimed parcel will be yours after the successful Metamask transaction, and your personal 
          info will be shown at the parcel. Please only participate upon fully understanding the concept.
      </TicketsList>
      <ModalActions>
        <Button fullWidth onClick={onDismiss}>
          {TranslateString(476, 'I understand')}
        </Button>
      </ModalActions>
    </Modal>
  )
}

const TicketsList = styled.div`
  text-align: left;
  overflow-y: auto;
  max-height: 400px;
  color: ${(props) => props.theme.colors.primary};
`

export default WarningModal
