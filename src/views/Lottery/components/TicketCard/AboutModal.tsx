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

interface AboutModalProps {
  onDismiss?: () => void
}

// const NoNftsToClaimCard = (tokenID, parcelRow, parcelCol, name, twitter) => {
const AboutModal: React.FC<AboutModalProps> = ({ onDismiss }) => {

  return (
    <Modal title='About Own a Piece of NFT' onDismiss={onDismiss}>
     
    <Text>
    NFT is a digital asset that represents a real world object, such as art, unique items, music, video. They are minted on the 
    blockchain using various public standards (ERC-721, BEP-721 etc..) and sold online, and are generally developed with the same 
    underlying software and similar encryption techniques. <br /> <br />

    Though NFTs have been present since 2014, they have recently begun to gain an ever-increasing amount of popularity, due to the 
    fact that more and more people each day want to buy, sell and trade digital illustrations and assets on the Internet, as the 
    age humanity is in right now is gradually shifting to a digital one. <br /> <br />

    Piece of NFT refers to only one minted fragment/piece of an NFT art that will be displayed on the platform. Each piece is 
    unique, non-repeating, and has a supply of 1. A simple “puzzle piece” and “puzzle” analogy may be assumed for the relation 
    between “a piece of NFT”, and the “NFT art” ; where all pieces unified form the original NFT art. <br /> <br />

    Own a Piece of NFT is a web-based digital art platform beyond the usual NFT marketplaces, serving on Binance Smart Chain and 
    Ethereum network, where unique works of art and pieces with symbolic meaning can be listed and resold among collectors. <br /> <br /> 
    
    Once an NFT has been minted on the blockchain, it cannot be altered in any way without the permission of the owner, and 
    continues to stay on the blockchain indefinitely. This fact establishes a strong, solid sense of permanence and ownership 
    regarding the blockchain realm. <br /> <br />

    Own a Piece of NFT aims to carry this sense of ownership and trust in blockchain into the Web as well, by allowing NFT piece 
    owners to share their desired information such as their name, e-mail and social media information on the platform. Similar to 
    the permanence and durability of an NFT in blockchain, its associated piece on the platform, and owner information on the 
    piece, will also be permanent, and immutable. <br /> <br />

    Own a Piece of NFT ensures that once a piece is owned, a part of the Web and Blockchain is owned as well, permanently. <br /> <br />

    Resources and categories of NFTs that is going to be displayed in the platform will include but not limited to; <br />

    - Artists verified and evaluated by the platform, <br />
    - NFTs of physical objects at museums, diverse antique shops and various sources of tangible, authentic items, <br />
    - Private/Personal NFTs coming from certain celebrities and celebrity fan clubs in collaboration. <br />

    </Text>
      
    </Modal>

  )
}

export default AboutModal
