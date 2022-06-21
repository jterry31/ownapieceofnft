import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { Button, useModal, Spinner } from 'uikit'
import { useParcelInfo } from 'hooks/useTickets'

// import { useWindowDimensions } from 'hooks/useWindowDimension'

import { useLotteryTicket, useMarketplace } from 'hooks/useContract'
import { getParcelInfo, getSaleInfo, getCurrentSectionPrice, getCurrentSection, getImageName, getBaseDescription, getBaseImageURI, getBaseURI, getImageHeight, getImageWidth} from 'utils/lotteryUtils'
import ParcelInfoModal from './ParcelInfoModal'
import Cell from './Cell';
 
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

interface SaleStruct {
  seller: string;
  tokenID: string;
  price: number;
}

const Puzzle = (props) => {
  const frontImage = '/images/bnb_blue_faded.jpg'
  const backImage = '/images/bnb_blue_resized.jpg'
  const lockedImage = '/images/bnb_blue_locked.jpg'
  const onSaleImage = 'images/bnb_blue_onSale.jpg'
  const puzzleWidth = window.innerWidth * 0.84;
  const puzzleHeight = puzzleWidth * 0.66;
  const maxSection = 6;
  // const widthlevel = 35;
  // const heightlevel = 28;

  const rowBoundaries = [
    [0,0], 
    [0,27], // section 1, size: 28
    [2,25], // section 2, size: 24
    [4,23], // section 3, size: 20
    [6,21], // section 4, size: 16
    [8,19], // section 5, size: 12
    [11,16] // section 6, size: 6
  ];

  const colBoundaries = [
    [0,0], 
    [0,34], // section 1, size: 35
    [3,31], // section 2, size: 29
    [6,28], // section 3, size: 23
    [9,25], // section 4, size: 17
    [12,22], // section 5, size: 11
    [15,19] // section 6, size: 5
  ];

  const totalSectionParcels = [
    0,
    284, // section 1
    236, // section 2
    188, // section 3
    140, // section 4 
    102, // section 5 
    30 // section 6
  ]

 
  /*
  const sectionPrices = [
    0.001, 0.1, 0.2, 0.5, 1, 2, 5
  ]; */

  // this.state = { positions: [...Array(cells).keys()] };

  const ticketsContract = useLotteryTicket()
  const marketplaceContract = useMarketplace()

  const [parcelInfo, setParcelInfo] = useState([])
  const [saleInfo, setSaleInfo] = useState([])
  const [isFetched, setIsFetched] = useState(false)
  const [sectionPrice, setSectionPrice] = useState(0)
  const [widthlevel, setWidthlevel] = useState(0)
  const [heightlevel, setHeightlevel] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [baseDescription, setbaseDescription] = useState("")
  const [baseImageURI, setbaseImageURI] = useState("")
  const [baseURI, setbaseURI] = useState("")
  const [imageName, setimageName] = useState("")
  
  // const [parcelPrice, setParcelPrice] = useState(0)
  
  // const parcelInfo = useRef([])
  const {isCellSelected, setCellSelected, setTicketPrice, setSection, setBaseImageURI, setBaseURI, setBaseDescription, setImageName,
          setSectionParcels, setClaimedSectionParcels} = props;
  // console.log("Rendering Puzzle")

  
  useEffect(() => {
    // console.log("useEffect begins")
    // Update the document title using the browser API
    
    const getParcelInformation = async () => {

      console.log("In getParcelInformation, setting all variables")
      setParcelInfo(await getParcelInfo(ticketsContract))
      setSaleInfo(await getSaleInfo(marketplaceContract))

      setCurrentSection(parseInt(await getCurrentSection(ticketsContract)))
      setSectionParcels(totalSectionParcels[currentSection])
      setClaimedSectionParcels(getClaimedSectionParcels())
      setSectionPrice( (await getCurrentSectionPrice(ticketsContract, currentSection)) / 10**18)
      setWidthlevel(await getImageWidth(ticketsContract))
      setHeightlevel(await getImageHeight(ticketsContract))

      // For Here -> Cell.tsx
      setbaseDescription(await getBaseDescription(ticketsContract))
      setbaseImageURI(await getBaseImageURI(ticketsContract))
      setbaseURI(await getBaseURI(ticketsContract))
      setimageName(await getImageName(ticketsContract))

      // For Lottery -> BuyTicketModal
      setBaseDescription(baseDescription)
      setBaseImageURI(baseImageURI)
      setBaseURI(await getBaseURI(ticketsContract))
      setImageName(imageName)
      setTicketPrice(sectionPrice)
      setSection(currentSection) 


      setIsFetched(true)
  
      console.log("Finished setting, useEffect baseURI: ", baseURI)
    }

    // getParcelInformation()
    const interval = setInterval(() => {
      getParcelInformation()
    }, 2000);

    return function cleanup() {
      clearInterval(interval);
    }
  }); 


  const getClaimedSectionParcels = () => {
    let claimedParcelCount = 0;
    for(let i=0; i<parcelInfo.length; i++)
      if(findSection(parcelInfo[i].parcelID) === currentSection)
        claimedParcelCount += 1
    return claimedParcelCount;
  }

  const isBought = (parcelInfo, parcID) => {
    // console.log("isBought, parcelInfo len: ", parcelInfo.length)
    for(let i=0; i<parcelInfo.length; i++) {
      if(parcID === parcelInfo[i].parcelID)
        return i;
    }
    return -1;
  }

  const isOnSale = (saleInfo, tokenID) => {
    // console.log("isBought, parcelInfo len: ", parcelInfo.length)
    for(let i=0; i<saleInfo.length; i++) {
      if(tokenID === saleInfo[i].tokenID && saleInfo[i].seller !== "0x0000000000000000000000000000000000000000")
        return i;
    }
    return -1;
  }


  const isInside = (arr, val) => {
    for(let i=arr[0]; i<=arr[1]; i++)
      if(val === i)
          return true;
    return false;
  }

  const findSection = (parcelID) => {
    const parcelRow = Math.floor(parcelID / widthlevel)
    const parcelCol = (parcelID % widthlevel);

    for(let i=maxSection; i>0; i--)
      if(isInside(rowBoundaries[i], parcelRow) && isInside(colBoundaries[i], parcelCol))
        return i;


    // Will never reach theoretically
    return 0;
  }
  
  const renderSquares = () => {

      const squares = []
      const cells = widthlevel * heightlevel;

      for(let i=0; i<cells; i++) {
        const isClaimed = isBought(parcelInfo, i.toString())
        const isParcelOnSale = isOnSale(saleInfo, i.toString())

        let seller = "0x0000000000000000000000000000000000000000"
        let sellPrice = 0

        if (isParcelOnSale !== -1) {
          seller = saleInfo[isParcelOnSale].seller
          sellPrice = saleInfo[isParcelOnSale].price / 10**18
        }

        const parcelSection = isClaimed !== -1 ? findSection((parcelInfo[isClaimed] as unknown as ParcelStruct).parcelID) : findSection(i)
        const parcelPrice = isClaimed !== -1 ? parcelInfo[isClaimed].mintPrice / 10**18 : sectionPrice;
        const square = isClaimed !== -1 ?  
          <Cell
            key={(parcelInfo[isClaimed] as unknown as ParcelStruct).parcelID}
            width={puzzleWidth}
            height={puzzleHeight}
            frontImage={frontImage}
            backImage={backImage}
            lockedImage={lockedImage}
            onSaleImage={onSaleImage}
            seller={seller}
            sellPrice={sellPrice}
            widthlevel={widthlevel}
            heightlevel={heightlevel}
            position={(parcelInfo[isClaimed] as unknown as ParcelStruct).parcelID}
            ownerName={(parcelInfo[isClaimed] as unknown as ParcelStruct).ownerName}
            tokenID={(parcelInfo[isClaimed] as unknown as ParcelStruct).parcelID}
            baseURI={baseURI}
            baseDescription={baseDescription}
            baseImageURI={baseImageURI}
            imageName={imageName}
            twitter={(parcelInfo[isClaimed] as unknown as ParcelStruct).twitter}
            mail={(parcelInfo[isClaimed] as unknown as ParcelStruct).mail}
            owner={(parcelInfo[isClaimed] as unknown as ParcelStruct).wallet}
            parcelSection={parcelSection}
            parcelPrice={parcelPrice}
            currentSection={currentSection}
            onCellClick={setCellSelected}
            isCellSelected={isCellSelected}
          /> :
          <Cell
            key={i}
            width={puzzleWidth}
            height={puzzleHeight}
            frontImage={frontImage}
            backImage={backImage}
            lockedImage={lockedImage}
            onSaleImage={onSaleImage}
            seller={seller}
            sellPrice={sellPrice}
            widthlevel={widthlevel}
            heightlevel={heightlevel}
            position={i}
            ownerName=""
            tokenID=""
            imageName={imageName}
            baseImageURI={baseImageURI}
            baseURI={baseURI}
            baseDescription={baseDescription}
            twitter=""
            mail=""
            owner=""
            parcelSection={parcelSection}
            parcelPrice={parcelPrice}
            currentSection={currentSection}
            onCellClick={setCellSelected}
            isCellSelected={isCellSelected}
          />
        
          squares.push(square)
      }
      // const index = parcel._id
      // const flag = (parcel.wallet !== parcelStatusOld[index].wallet)
      // console.log("Parcel ID", index, "Parcel wallet", parcel.wallet, "ParcelStatusOld ID", parcelStatusOld[index]._id,
      // "ParcelStatusOld Wallet", parcelStatusOld[index].wallet)   
     
    return squares;

  }

 

  return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: puzzleWidth,
          height: puzzleHeight,
          marginRight: "auto",
          marginLeft: "auto",
          boxShadow: isMobile ? "0.5vw 0.5vw 2.5vw #888888" :  "0.5vw 0.5vw 2.5vw #888888",
          // background: "rgba(0,0,0, .75)"
          // width: `${width}px`,
          // height: `${height}px`
        }}>
        {isFetched ? renderSquares() : isMobile ? null : <div style={{position: "absolute", left: "45%", top: "50%"}}><Spinner size={300} /></div>}
      </div>
  );
 
}


export default Puzzle;
