import React, { useState } from 'react'
import ReactTooltip from "react-tooltip";
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import ReactCardFlip from 'react-card-flip';
import { useModal } from 'uikit'
import { getCustomAddress } from 'utils/addressHelpers'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTokenOwner } from 'hooks/useBuyLottery'
import ParcelInfoModal from './ParcelInfoModal'
import BuyTicketModal from './TicketCard/BuyTicketModal'
import Piece from './Piece'
import imageHashes from "../../../config/image_hashes.json"


const SelectedPiece = styled.div`
  background-color: #000000;
  &:hover {
    background-color: #FFFFFF;
  }
`

const UnselectedPiece = styled.div`
  background-color: #FFFFFF;
  &:hover {
    background-color: #000000;
  }
 
`

const Cell = (props) => {
  const { frontImage, backImage, lockedImage, width, height, widthlevel, heightlevel, position, 
          baseImageURI, tokenID, ownerName, imageName, twitter, owner, mail, onCellClick, isCellSelected, parcelSection, 
          parcelPrice, baseDescription, baseURI, currentSection, seller, sellPrice, onSaleImage} = props;
  
 
  // Constants to be shown on BuyTicketModal
  const parcelRow = Math.floor(position / widthlevel)
  const parcelCol = (position % widthlevel);
  const parcelID = position;
  const tokenURI = baseURI.concat(tokenID.toString(), ".json")
  const imageURI = baseImageURI.concat(parcelRow.toString(), "-", parcelCol.toString())
  const description = baseDescription.concat(parcelRow.toString(), "-", parcelCol.toString())
  
  // const imageURI = baseURI.concat("image/",imageHashes[parcelRow.toString().concat("_").concat(parcelCol.toString())])
  // const description = "NFT Parcel #".concat(parcelRow.toString()).concat("-").concat(parcelCol.toString()) 
  // const imageName = "BNB Dark" // we have to think of a nice name
  let { account } = useWallet()

  const widthside = (width / widthlevel);
  const heightside = (height / heightlevel);
  const row = parcelRow * heightside;
  const col =  parcelCol * widthside;

  if(!account)
    account = "not defined"
  // console.log("Cell Account", account.toLowerCase());
  // console.log("Owner", owner.toLowerCase())

  const flag = owner.toLowerCase() === account.toLowerCase()
  // console.log("Flag", flag)

  let [isClaimed] = useState(false);
  let [isOnSale] = useState(false);

  const isSelected = isCellSelected(parcelID)
  const isLocked = currentSection === 0 ? false : parcelSection !== currentSection
 
  // console.log("Cell ", parcelRow, " ", parcelCol, ", parcelSection: ", parcelSection, " currentSection: ", currentSection)
  const customBalance = useTokenBalance(getCustomAddress())

  isClaimed = (ownerName !== "")
  isOnSale = (seller !== "0x0000000000000000000000000000000000000000")


  const [onShowInformation] = useModal(<ParcelInfoModal account={account} parcelRow={parcelRow} parcelCol={parcelCol} 
    parcelID={position} tokenId={tokenID} tokenURI={tokenURI} imageURI={imageURI} imageName={imageName} description={description} 
    ownerName={ownerName} twitter={twitter} mail={mail} wallet={owner} flag={flag} parcelPrice={parcelPrice} sellPrice={sellPrice} 
    seller={seller} isOnSale={isOnSale}/>)


  const handleClick = () => {
    if(isLocked) {
      window.alert("This piece is LOCKED!!! Purchase cannot be done until related unlock time.")
      return
    }
    const isSelectedStatus = onCellClick(parcelID, parcelRow, parcelCol)
    // setIsSelected(isSelectedStatus)
  }

  return (
    <ReactCardFlip isFlipped={isClaimed} flipSpeedFrontToBack={1.0}>
      <div className='piece' role="button" onClick={handleClick} 
                                           onKeyDown={handleClick} tabIndex={0}>
          {isLocked ? <span className="tooltiptext">
                        <div> This section has not been unlocked yet. </div> <br /> 
                        <div> Please refer to FAQ for details </div>
                      </span> : null}
          <Piece
            position={position}
            image={isLocked ? lockedImage : frontImage}
            width={width}
            height={height}
            widthside={widthside}
            heightside={heightside}
            row={row}
            col={col}
            isSelected={isSelected}
            isClaimed={isClaimed}
            isLocked={isLocked}
          />
          <style>{`
          .piece:hover {
            background-color: #fffdfa;
            opacity: 1;
          }
        
        `}</style>
      </div>

      <div className='piece' role="button" onClick={onShowInformation} onKeyDown={onShowInformation} tabIndex={0}>
        {isOnSale ? <span className="tooltiptext">
          <div>Owned by: <h2 style={{whiteSpace: "nowrap"}}>{ownerName}</h2> </div> 
          <br />
          <div> <h1 style={{color:"#f1bf00", fontWeight: 1800}}>Currently On Sale </h1> <br /> </div>
          <div> Click to see a more detailed information </div>
        </span>

        : 
        
        <span className="tooltiptext">
          <div>Owned by: <h2 style={{whiteSpace: "nowrap"}}>{ownerName}</h2> </div> 
          <br /> 
          <div> Click to see a more detailed information </div>
        </span> }
       
        <Piece
          position={position}
          image={isOnSale ? onSaleImage: backImage}
          width={width}
          height={height}
          widthside={widthside}
          heightside={heightside}
          row={row}
          col={col}
          isSelected={false}
          isClaimed={isClaimed}
        />
        <style>{`
          .piece {
            cursor: pointer;
          }
          
          /* Tooltip text */
          .piece .tooltiptext {
            visibility: hidden;
            width: 15vw;
            background-color: black;
            color: #ffffff;
            text-align: center;
            padding: 5px 0;
            border-radius: 6px;
          
            /* Position the tooltip text - see examples below! */
            position: absolute;
            width: 15vw;
            bottom: 100%;
            left: 50%;
            margin-left: -60px;
            padding left: 1vw;
            padding-right: 1vw;
          }
          
          /* Show the tooltip text when you mouse over the tooltip container */
          .piece:hover .tooltiptext {
            visibility: visible;
          }

          .piece:hover {
            opacity: 0.8;
          }
        `}</style>

      </div>
    </ReactCardFlip>
  )
};

export default Cell;
