import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Button, Modal } from 'uikit'
import useI18n from 'hooks/useI18n'



const Tips = styled.div`
  margin-left: 0.4em;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`

interface TxStatusModalProps {
  onDismiss?: () => void
  txStatus: string
}

// const NoNftsToClaimCard = (tokenID, parcelRow, parcelCol, name, twitter) => {
const TxStatusModal: React.FC<TxStatusModalProps> = ({ txStatus, onDismiss }) => {

  return (
    <Modal title='Transaction Status Information' onDismiss={onDismiss}>
     
      <div>
          <Tips>Tx Status: {txStatus} </Tips>
      </div>
      
    </Modal>
  )
}

export default TxStatusModal
