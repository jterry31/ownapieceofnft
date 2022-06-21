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

const Help = styled.div`
 width: 100%;
 background-color: rgba(255,255,255,1);
  
`

interface HowModalProps {
  onDismiss?: () => void
}

// const NoNftsToClaimCard = (tokenID, parcelRow, parcelCol, name, twitter) => {
const HowModal: React.FC<HowModalProps> = ({ onDismiss }) => {

  return (
    <Modal title='How It Works' onDismiss={onDismiss}>
     
    <Text>
      This section will include step by step instructions and visual aids regarding how to buy/own a Piece of NFT, and
      it will be available after Launch.
    </Text>
      
    </Modal>

  )
}

export default HowModal
