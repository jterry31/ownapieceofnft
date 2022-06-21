import React, { useState } from 'react'
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


interface HelpModalProps {
  onDismiss?: () => void
}

// const NoNftsToClaimCard = (tokenID, parcelRow, parcelCol, name, twitter) => {
const HelpModal: React.FC<HelpModalProps> = ({ onDismiss }) => {

  const [isClicked, setIsClicked] = useState(false)
  const [isClickedOne, setIsClickedOne] = useState(false)
  const [isClickedTwo, setIsClickedTwo] = useState(false)
  const [isClickedThree, setIsClickedThree] = useState(false)
  const [isClickedFour, setIsClickedFour] = useState(false)
  const [isClickedFive, setIsClickedFive] = useState(false)
  const [isClickedSix, setIsClickedSix] = useState(false)
  const [isClickedSeven, setIsClickedSeven] = useState(false)
  const [isClickedEight, setIsClickedEight] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
    // setIsSelected(isSelectedStatus)
  }

  const handleClickOne = () => {
    setIsClickedOne(!isClickedOne)
    // setIsSelected(isSelectedStatus)
  }
  const handleClickTwo = () => {
    setIsClickedTwo(!isClickedTwo)
    // setIsSelected(isSelectedStatus)
  }
  const handleClickThree = () => {
    setIsClickedThree(!isClickedThree)
    // setIsSelected(isSelectedStatus)
  }
  const handleClickFour = () => {
    setIsClickedFour(!isClickedFour)
    // setIsSelected(isSelectedStatus)
  }
  const handleClickFive = () => {
    setIsClickedFive(!isClickedFive)
    // setIsSelected(isSelectedStatus)
  }
  const handleClickSix = () => {
    setIsClickedSix(!isClickedSix)
    // setIsSelected(isSelectedStatus)
  }
  const handleClickSeven = () => {
    setIsClickedSeven(!isClickedSeven)
    // setIsSelected(isSelectedStatus)
  }
  const handleClickEight = () => {
    setIsClickedEight(!isClickedEight)
    // setIsSelected(isSelectedStatus)
  }

  return (
    <Modal title='FAQ' onDismiss={onDismiss}>
     
    
    <Text>
    <div role="button" onClick={handleClick} onKeyDown={handleClick} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3> What is "Own a Piece of NFT" ? </h3>
   
    </div> <br /> 

    {isClicked && <div>
      Own a Piece of NFT is a web-based digital art platform beyond the usual NFT marketplaces, serving on Binance Smart Chain and 
      Ethereum network, where unique works of art and pieces with symbolic meaning can be listed and resold among collectors. Once 
      an NFT has been minted on the blockchain, it cannot be altered in any way without the permission of the owner, and continues 
      to stay on the blockchain indefinitely. This fact establishes a strong, solid sense of permanence and ownership regarding the 
      blockchain realm. <br /> <br />

      Own a Piece of NFT aims to carry this sense of ownership and trust in blockchain into the Web as well, by allowing NFT piece owners 
      to share their desired information such as their name, e-mail and social media information on the platform. Similar to the 
      permanence and durability of an NFT in blockchain, its associated piece on the platform, and owner information on the piece, 
      will also be permanent, and immutable. <br /> <br />
    

      Own a Piece of NFT ensures that once a piece is owned, a part of the Web and Blockchain is owned as well, permanently.  <br /> <br /> <br />
    </div> }

    
    <div role="button" onClick={handleClickOne} onKeyDown={handleClickOne} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3> What are the terms  “Piece of NFT” and “Blockchain”?</h3>
  
    </div> <br /> 
    {isClickedOne && <div>
        NFT is a digital asset that represents a real world object, such as art, unique items, music, video. They are minted on the 
        blockchain using various public standards (ERC-721, BEP-721 etc..) and sold online, and are generally developed with the same 
        underlying software and similar encryption techniques. <br /> <br />

        Though NFTs have been present since 2014, they have recently begun to gain an ever-increasing amount of popularity, due to 
        the fact that more and more people each day want to buy, sell and trade digital illustrations and assets on the Internet, 
        as the age humanity is in right now is gradually shifting to a digital one. <br /> <br />

        Piece of NFT refers to only one minted fragment/piece of an NFT art that will be displayed on the platform. Each piece 
        is unique, non-repeating, and has a supply of 1. A simple “puzzle piece” and “puzzle” analogy may be assumed for the 
        relation between “a piece of NFT”, and the “NFT art” ; where all pieces unified form the original NFT art. <br /> <br />

        A basic definition for a blockchain would be a commonly accessible public infrastructure which everyone can interact with 
        regardless of location and device properties. When interacting with the blockchain, one is not bound by any computational 
        restriction and/or lack of hardware and infrastructure on one’s end, as blockchains are public entities and all necessary 
        computation and work is handled by blockchain infrastructure itself. <br /> <br />

        <h3 style={{fontStyle: "italic"}}> “Once you own a piece of NFT you own a piece on blockchain!!” </h3> <br /> <br />
    </div> }

  
    <div role="button" onClick={handleClickTwo} onKeyDown={handleClickTwo} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3> What awaits us on Launch Day?</h3>
    
    </div> <br /> 

    {isClickedTwo && <div>
      Platform will start with two main iconic NFT arts to represent each chain, and is going to be displayed here upon launch. 
       Each NFT art is going to be in the form of an image, and will be accommodating its respective chain’s logo within 
      (BNB logo for BSC, and ETH logo for Ethereum, respectively). <br /> <br />

      Each of these two images will be divided into small pieces, resembling a puzzle-like structure. These pieces will be presented 
      to public demand here, as NFTs. These pieces of NFTs will be accessible to everyone after launch. <br /> <br />

      Under each NFT art lies a clearer, brighter and more dynamic version of itself. This version will start to reveal itself from 
      underneath piece by piece with each purchase/claim of the initial version. With each reveal, the initial NFT art will be closer 
      and closer to completion, and transforming into its final and dynamic version. After the last piece of NFT has been claimed, 
      “the puzzle” will be completed, and the final form will be achieved. <br /> <br />

      Upon launch, the platform will start operating on the BSC network only. Therefore, only the NFT art regarding BSC will be 
      available initially. Once an adequate level of demand is present, second NFT art regarding Ethereum will be available as well. 
      These mentioned NFT pieces will be offered to the public with a <h4 style={{display: "inline", marginLeft: "2px", fontWeight: "bold"}}> Section Based Strategy </h4>, 
      that is, NFT pieces will be grouped as Sections, and only the first section of an NFT art will be offered to the public in the 
      beginning, while the rest of the sections will be locked. Second section will be unlocked and offered upon completion of the 
      first one, the third section will be unlocked upon completion of the second one, and so on… <br /> <br />

      Sections can be regarded/viewed as the layers of an onion; first section being the outermost layer and last section being the 
      core part of an onion. In this analogy, last section corresponds to the center part of the NFT art. <br /> <br />

      Each section will have a different value; the outermost (first) section will be the first one offered, hence, the least 
      valuable one, whereas the innermost (last) section will be the last one offered, hence, the most valuable one. All offerings 
      and transactions will be via crypto wallets and the native tokens of each network. Namely, BNB will be accepted in BSC, 
      and ETH will be accepted in Ethereum. <br /> <br /> <br />
    </div> }
    
    <div role="button" onClick={handleClickThree} onKeyDown={handleClickThree} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3> What is the purpose of having a Piece of NFT?  Why should one become a part of this platform? </h3>
    </div> <br /> 

    {isClickedThree && <div>

    Unlike known marketplaces, this platform aims to create more value and recognition for its users by focusing on the quality of 
    NFT supply instead of the quantity. Users of this platform will have the opportunity to exhibit their reputation by owning the 
    NFT pieces and will be a part of the community. <br /> <br />

    Once purchased, every piece of NFT is going to reveal its original and final form (mentioned in sections above), and will contain 
    certain information about its owner, such as full name, e-mail and social media address(es). <br /> <br />

    In addition to aforementioned reasons, one can regard owning a piece of NFT from the platform as permanently owning a solid 
    piece both on the Web, and on the blockchain, which will serve recognition, and marketing purposes if desired. <br /> <br />  


    Own a Piece of NFT is a platform that brings together people who are interested in the same piece of art, ideology or an 
    exhibited piece, and allows them to get to know one another. Owners can meet and socialize on the social media channels of the 
    platform. Here, one can be a part of an art that is respected by everyone. <br /> <br /> <br />

    </div> }

    <div role="button" onClick={handleClickFour} onKeyDown={handleClickFour} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3>Can I sell my Piece(s) of NFT for income, or profit?</h3>
    </div> <br /> 
   
    {isClickedFour && <div>
    Yes, each piece is minted as a separate NFT token and can be sold or transferred at any NFT marketplace. The platform will 
    eventually involve transfer and trade functionalities for these pieces of NFTs as well. <br /> <br />

    Before deciding on transferring/selling a piece, one should also keep in mind that the value of a piece is dependent on many 
    criteria including but not limited to current market state, platform recognition, completion of the whole NFT art with all 
    its pieces and global NFT awareness. Value of a piece may rise in accordance to these criteria. <br /> <br />

    It is also important to mention that upon the transfer of any NFT token, the new owner will also own the associated piece on 
    the platform, and will have the right to update the information on the piece as desired. <br /> <br /> <br />
    </div> }


    <div role="button" onClick={handleClickFive} onKeyDown={handleClickFive} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3>How can i buy a Piece of NFT?</h3>
    </div> <br /> 

    {isClickedFive && <div>

    Please refer to <h4 style={{display: "inline", marginLeft: "2px", marginRight: "2px", fontWeight: "bold"}}> How It Works </h4> 
    section for details, instructions and visual aids. <br /> <br /> <br />

    </div> }

    <div role="button" onClick={handleClickSix} onKeyDown={handleClickSix} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3>Is this a Marketplace, what is the general purpose of this platform? </h3>
    </div> <br /> 
   
    {isClickedSix && <div>
    Different from other known marketplaces, this platform will not allow artists to mint their NFTs to be exhibited before our 
    validation process. Details regarding the application process are explained below. <br /> <br />

    Resources and categories of NFTs that are going to be displayed in the platform will include but not limited to; <br />
    - Artists verified and evaluated by the platform, <br />
    - NFTs of physical objects at museums, diverse antique shops and various sources of tangible, authentic items, <br />
    - Private/Personal NFTs coming from certain celebrities and celebrity fan clubs in collaboration. <br /> <br /> <br />

    </div> }

    <div role="button" onClick={handleClickSeven} onKeyDown={handleClickSeven} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3>I am an NFT artist. Can I apply this platform to exhibit my work? </h3>
    </div> <br /> 

    {isClickedSeven && <div>
    Yes, you can always apply for your art to be displayed at our platform, however, it will have to be verified by our crew to 
    be exhibited. The work should be evaluated to be unique and authentic. It should also contain traits that are parallel with 
    the direction of the platform and should be capable of creating interest and excitement among the community. <br /> <br />

    Applications can be submitted via <h4 style={{display: "inline", fontWeight: "bold"}}> info@ownapieceofnft.com </h4> <br /> <br /> <br />
    
    </div> }
    
    <div role="button" onClick={handleClickEight} onKeyDown={handleClickEight} tabIndex={0} style={{display: "flex", flexDirection: "row", fontSize: "20px", fontWeight: "bold", width: "100%"}}>
      <h3 style={{fontSize: "20px", marginRight: "2vw"}}> + </h3>
      <h3>What is Your Contact Information? How can I reach you? </h3>
    </div> <br /> 

    {isClickedEight && <div>
      <style>{` .hoverOne:hover {
            background: rgba(0,0,0);
            opacity: 0.6;
          }`}</style>
      Own a Piece of NFT will be functional and alive on various social media platforms. <br /><br />
      <h4 style={{display: "inline", fontWeight: "bold"}}> Mail: </h4> info@ownapieceofnft.com <br />
      <h4 style={{display: "inline", fontWeight: "bold"}}> Twitter: </h4> 
          <a className="hoverOne" href="https://twitter.com/ownapieceofnft" target="_blank" rel="noreferrer"> https://twitter.com/ownapieceofnft </a> <br />
      <h4 style={{display: "inline", fontWeight: "bold"}}> Reddit:  </h4>
          <a className="hoverOne" href="https://www.reddit.com/r/ownapieceofnft/" target="_blank" rel="noreferrer"> https://www.reddit.com/r/ownapieceofnft/ </a> <br />
      <h4 style={{display: "inline", fontWeight: "bold"}}> Discord: </h4> 
          <a className="hoverOne" href="https://discord.gg/Sf7PZDuE5A " target="_blank" rel="noreferrer"> https://discord.gg/Sf7PZDuE5A  </a> <br />
      <h4 style={{display: "inline", fontWeight: "bold"}}> Telegram Announcement: </h4> 
          <a className="hoverOne" href="https://t.me/ownapieceofnft" target="_blank" rel="noreferrer"> https://t.me/ownapieceofnft  </a> <br />
      <h4 style={{display: "inline", fontWeight: "bold"}}> Telegram Support: </h4>
          <a className="hoverOne" href="https://t.me/OPONsupport" target="_blank" rel="noreferrer"> https://t.me/OPONsupport </a> <br />
    </div> }

    </Text>
      
    </Modal>

  )
}

export default HelpModal
