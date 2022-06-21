import React, { useState, useContext, useCallback, useEffect } from 'react'
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
import PreviewParcelCard from './PreviewParcelCard'
import PreviewParcelGrid from './PreviewParcelGrid'
import MobilePreviewParcelGrid from './MobilePreviewParcelGrid'


const PreviewParcelList = (tokenInfos) => {
  console.log("Preview, Token Infos: ", tokenInfos.imageURL)
  return (
    window.innerWidth < 450 ?

      <MobilePreviewParcelGrid>
      {tokenInfos.tokenInfos.map((tokenInfo) => (
      <div key={tokenInfo.tokenID}>
        <PreviewParcelCard tokenInfo={tokenInfo} imageURL={tokenInfo.imageURL}/>
      </div>
      ))}
    </MobilePreviewParcelGrid>
    :
    <PreviewParcelGrid>
    {tokenInfos.tokenInfos.map((tokenInfo) => (
    <div key={tokenInfo.tokenID}>
        <PreviewParcelCard tokenInfo={tokenInfo} imageURL={tokenInfo.imageURL}/>
    </div>
    ))}
    </PreviewParcelGrid>
  )
}

export default PreviewParcelList
