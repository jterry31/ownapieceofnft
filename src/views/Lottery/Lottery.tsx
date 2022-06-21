import React, { useState, useEffect } from 'react'
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";
import styled from 'styled-components'
import { useModal, Button, ButtonMenu, ButtonMenuItem, Text } from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { getLotteryIssueIndex, getBaseURI } from 'utils/lotteryUtils'
import { getCustomAddress } from 'utils/addressHelpers'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { useLottery, useLotteryTicket } from 'hooks/useContract'
import Page from 'components/layout/Page'
import BuyTicketModal from './components/TicketCard/BuyTicketModal'
import Hero from './components/Hero'
import Divider from './components/Divider'
import MobileDivider from './components/MobileDivider'
import HowItWorks from './components/HowItWorks'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'
import Puzzle from './components/Puzzle'


const Wrapper = styled.div`
  // position: relative;

  display: flex;
  // flex-direction: row;
  // align-items: center;
  // justify-content: center;
  margin-bottom: 10vh;
`

const MobileWrapper = styled.div`
  // position: relative;

  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  margin-bottom: 32px;
`

const Lottery: React.FC = () => {
  const lotteryContract = useLottery()
  const { account } = useWallet()
  const TranslateString = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const [historyData, setHistoryData] = useState([])
  const [ticketPrice, setTicketPrice] = useState(0)
  const [baseDescription, setBaseDescription] = useState("")
  const [baseImageURI, setBaseImageURI] = useState("")
  const [baseURI, setBaseURI] = useState("")
  const [imageName, setImageName] = useState("")
  const [section, setSection] = useState(0)
  const [sectionParcels, setSectionParcels] = useState(0)
  const [claimedSectionParcels, setClaimedSectionParcels] = useState(0)
  const [historyError, setHistoryError] = useState(false)
  const [currentLotteryNumber, setCurrentLotteryNumber] = useState(0)
  const [mostRecentLotteryNumber, setMostRecentLotteryNumber] = useState(1)
  const [selected, setSelected] = useState([])
  const [lengthSelected, setLengthSelected] = useState(0)
  const parcelCount = 980
  const widthlevel = 35
  const heightlevel = 28
  console.log("Rendering Lottery.tsx..")
  const ticketsContract = useLotteryTicket()

  /*
  useEffect(() => {
    fetch(`https://cheesecake-api.vercel.app/api/lotteryHistory`)
      .then((response) => response.json())
      .then((data) => setHistoryData(data))
      .catch(() => {
        setHistoryError(true)
      })
  }, [])


  useEffect(() => {
    const getInitialLotteryIndex = async () => {
      const index = await getLotteryIssueIndex(lotteryContract)
      const previousLotteryNumber = index - 1

      setCurrentLotteryNumber(index)
      setMostRecentLotteryNumber(previousLotteryNumber)
    }

    if (account && lotteryContract) {
      getInitialLotteryIndex()
    }
  }, [account, lotteryContract]) */

  useEffect(() => {
    // console.log("useEffect begins")
    // Update the document title using the browser API
    
    const fetchBaseURI = async () => {
      setBaseURI(await getBaseURI(ticketsContract))
      // console.log("In lottery, baseURI: ", baseURI)
    }

    // getParcelInformation()
    const interval = setInterval(() => {
      fetchBaseURI()
    }, 2000);

    return function cleanup() {
      clearInterval(interval);
    }
  }); 


  const handleClick = (index) => {
    setActiveIndex(index)
  }

  const getSelected = () => {
    return selected;
  }

  const cancelSelected = () => {   
    setSelected([])
    setLengthSelected(0)
  }

  const isCellSelected = (parcelId) => {
    let i=0;
    for (i=0; i< selected.length; i++)
      if(selected[i].parcelId === parcelId)
        return true;
    return false;
  }

  const setCellSelected = (parcelId, parcelRow, parcelCol) => {
    const newSelected = selected
    const newLength = lengthSelected
    // console.log("Inside setCellSelected, before selection: ", selected)
    if (isCellSelected(parcelId)) {
      let i=0;
      for(i=0; i<newSelected.length; i++)
        if(newSelected[i].parcelId === parcelId)
          break
      
      // console.log("Cell unclicked: ", parcelId)
      newSelected.splice(i,1)
      setSelected(newSelected)
      setLengthSelected(newLength - 1)
      return false
    }

   
    newSelected.push({parcelId: parcelId, parcelRow: parcelRow, parcelCol: parcelCol})
    // console.log("Cell clicked: ", parcelId)
    setSelected(newSelected)
    setLengthSelected(newLength + 1)
    return true
   
    
    
  }

  const customBalance = useTokenBalance(getCustomAddress())

  const [ onPresentBuy ] = useModal(<BuyTicketModal max={customBalance} selectedParcels={getSelected()} imageName={imageName} 
  baseImageURI={baseImageURI} baseURI={baseURI} baseDescription={baseDescription} cancelSelected={cancelSelected} ticketPrice={ticketPrice} section={section}/>)


  const generalWidth = window.innerWidth;
  let rightMargin = "";

  if(generalWidth > 1500) {
    rightMargin = "15vw"
  }

  else if(generalWidth > 1200) {
    rightMargin = "13vw"
  }

  else if(generalWidth > 1000) {
    rightMargin = "12vw"
  }

  else {
    rightMargin = "42vw"
  }

  return (
    <>
      <Page>
        {generalWidth <= 1000 ?
        <>
        <MobileWrapper>
        <div style={{marginLeft: "auto", marginRight: "auto", marginTop: "3vw"}}>
        <ButtonMenu activeIndex={activeIndex} onClick={handleClick} size="sm" variant="primary">
          <ButtonMenuItem>{TranslateString(999, 'AVAX')}</ButtonMenuItem>
          <ButtonMenuItem>{TranslateString(999, 'ETH')}</ButtonMenuItem>
          <ButtonMenuItem>{TranslateString(999, 'BTC')}</ButtonMenuItem>
        </ButtonMenu>
        </div>
        
        <br /><br />
        <Text margin="auto" style={{fontSize: "22px", fontWeight:"bolder", color: "#000000"}}> <h3 style={{color: "#000000", display: "inline-flex", fontSize: "20px", marginRight: "5px"}}> Current Section: </h3> {section} </Text>
        <Text margin="auto" style={{fontSize: "22px", fontWeight:"bolder", color: "#000000"}}> <h3 style={{color: "#000000", display: "inline-flex", fontSize: "20px", marginRight: "5px"}}> Claimed Parcel Count:  </h3> {claimedSectionParcels}/{sectionParcels} </Text>
        
        <div style={{marginTop: "8vw", marginRight: "auto", marginLeft: "auto", display: "flex", flexDirection: "row"}}>
        {lengthSelected > -1 ? <Button size="sm" variant="primary" mr="1vw" onClick={onPresentBuy}> Claim Selected ({lengthSelected})</Button> : null}
        {lengthSelected > -1 ? <Button size="sm" variant="primary" onClick={cancelSelected}> Cancel All </Button> : null}
        </div>

        </MobileWrapper>
        {/* <MobileDivider /> */}
        </>
        :
        <>
        <Wrapper>
          <div style={{display: "flex", flexDirection: "column", marginRight: rightMargin}}>
            <Text ml="1vw" style={{fontSize: "22px", fontWeight:"bolder", color: "#000000"}}> <h3 style={{color: "#000000", display: "inline-flex", fontSize: "20px", marginRight: "5px"}}> Current Section: </h3> {section} </Text>
            <Text ml="1vw" style={{fontSize: "22px", fontWeight:"bolder", color: "#000000"}}> <h3 style={{color: "#000000", display: "inline-flex", fontSize: "20px", marginRight: "5px"}}> Claimed Parcel Count:  </h3> {claimedSectionParcels}/{sectionParcels} </Text>
        
          </div>
         
          <div style={{margin: "auto" }}>
          <ButtonMenu activeIndex={activeIndex} onClick={handleClick} size="sm" variant="primary">
            <ButtonMenuItem>{TranslateString(999, 'AVAX')}</ButtonMenuItem>
            <ButtonMenuItem>{TranslateString(999, 'ETH')}</ButtonMenuItem>
            <ButtonMenuItem>{TranslateString(999, 'BTC')}</ButtonMenuItem>
          </ButtonMenu>
          </div>

          <div style={{display: "flex", marginLeft: "auto", alignItems: "center"}}>
          <Button size="sm" variant="primary" disabled={lengthSelected < 1 || !account} mr="1vw" onClick={onPresentBuy}> Claim Selected ({lengthSelected})</Button>
          {lengthSelected > -1 ? <Button size="sm" variant="primary" disabled={lengthSelected < 1} onClick={cancelSelected}> Cancel All </Button> : null}
          </div>

        </Wrapper>
        {/* <Divider /> */}
         </ >
        }     
       
       
        <Puzzle isCellSelected={isCellSelected} setCellSelected={setCellSelected} setTicketPrice={setTicketPrice} setSection={setSection} 
          setBaseDescription={setBaseDescription} setBaseImageURI={setBaseImageURI} setBaseURI={setBaseURI} setImageName={setImageName} 
          setSectionParcels={setSectionParcels} setClaimedSectionParcels={setClaimedSectionParcels} />
       
        <br />
        {/*
          <PastLotteryDataContext.Provider
            value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }}
          >
            {activeIndex === 0 ? <NextDrawPage /> : <NextDrawPage />}
          </PastLotteryDataContext.Provider>
        */}
      </Page>
    </>
  )
}

export default Lottery
