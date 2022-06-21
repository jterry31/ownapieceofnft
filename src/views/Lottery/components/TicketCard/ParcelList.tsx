import React, { useState, useContext, useCallback, useEffect } from 'react'
import { Text } from 'uikit' 
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useLottery, useLotteryTicket } from 'hooks/useContract'
import {
  getTickets,
  getParcelInfo,
  getSingleParcelInfo,
  getTokenURI,
  getImageWidth,
  getImageHeight,
  getBaseURI
} from 'utils/lotteryUtils'

import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import ParcelCard from './ParcelCard'
import ParcelGrid from './ParcelGrid'


const ParcelList = () => {

  const { account } = useWallet()
  const ticketsContract = useLotteryTicket()
  const [ tokenInfo, setTokenInfo ] = useState("")
  
  console.log("In Parcel List")
  
  useEffect(() => {

    const getTokenIDs = async () => {
      const res = await getTickets(ticketsContract, account)
      

      let tokenInfoString = ""
      for(let i=0; i< res.length; i++) {
        tokenInfoString = tokenInfoString.concat(res[i])
        if(i !== res.length - 1)
          tokenInfoString = tokenInfoString.concat(" ")
      }
        
      

      // console.log("Before Set token Info, tokenInfoString: ", tokenInfoString.split(" "))

      setTokenInfo(tokenInfoString)
      // console.log("Set token Info: ", tokenInfoString)


    }

    const interval = setInterval(() => {
      getTokenIDs()
    }, 2000);

    return function cleanup() {
      clearInterval(interval);
    }

  })
  

  return (
    tokenInfo !== "" ?  
      <ParcelGrid>
        {tokenInfo.split(" ").map((tokenID) => (
        <div key={tokenID}>
          <ParcelCard tokenID={tokenID.toString()} />
        </div>
        ))}
      </ParcelGrid> : <Text margin="auto"> Your Parcel information is being fetched, please wait...</Text>
  )
}

export default ParcelList
