import { useCallback, useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useLottery, useLotteryTicket, useMarketplace } from 'hooks/useContract'
import { getMarketplaceAddress } from 'utils/addressHelpers'
import {  multiClaim, getMax, multiBuy, claimParcel, tokenURISet, updateOwnerInfo, 
          cancelParcelSale, sellParcel, getMinterComissionPercentage, getComissionPercentage,
          isMinterComission, approveParcel, getApproved, buyAndTransfer, isOwner } from '../utils/lotteryUtils'



export const useMultiClaimLottery = () => {
  const { account } = useWallet()
  const lotteryContract = useLottery()
  const lotteryTicketContract = useLotteryTicket()

  const handleClaim = useCallback(async () => {
    try {
      const txHash = true // await multiClaim(lotteryContract, lotteryTicketContract, account)
      return txHash
    } catch (e) {
      return false
    }
  }, [])

  return { onMultiClaim: handleClaim }
}

export const useClaimParcel = () => {
  const { account } = useWallet()
  const parcelContract = useLotteryTicket()

  const handleClaim = useCallback(
    async (numbers: Array<Array<number>>, ownerName: string, twitter: string, mail: string, wallet: boolean, 
          minterComission: boolean, totalPrice: number) => {
      try {
        const txHash = await claimParcel(parcelContract, account, numbers, ownerName, twitter, mail, wallet, minterComission, totalPrice)
        console.log("Return for claimParcel in hooks is: ", txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, parcelContract],
  )

  return { onClaimParcel: handleClaim }
}

export const useComission = (tokenID) => {
 
  const [isTokenMinterComission, setIsTokenMinterComission] = useState(0)
  const [minterComissionPercentage, setMinterComissionPercentage] = useState(0)
  const [comissionPercentage, setComissionPercentage] = useState(0)
  const ticketsContract = useLotteryTicket()
  const marketplaceContract = useMarketplace()

  useEffect(() => {
    const fetchComissionInfo = async () => {
      const val1 = await isMinterComission(ticketsContract, tokenID)
      const val2 = await getMinterComissionPercentage(marketplaceContract)
      const val3 = await getComissionPercentage(marketplaceContract)
      if (val1)
        setIsTokenMinterComission(1)
      setMinterComissionPercentage(val2)
      setComissionPercentage(val3)
    }
    
    fetchComissionInfo()

  }, [ticketsContract, marketplaceContract, tokenID])

  return [isTokenMinterComission, minterComissionPercentage, comissionPercentage]
}

export const useEditOwner = () => {
  const { account } = useWallet()
  const parcelContract = useLotteryTicket()

  const handleEdit = useCallback(
    async (tokenId: number, ownerName: string, twitter: string, mail: string, wallet: boolean) => {
      try {
        const txHash = await updateOwnerInfo(parcelContract, account, tokenId, ownerName, twitter, mail, wallet)
        // console.log("Return for claimParcel in hooks is: ", txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, parcelContract],
  )

  return { onEditOwner: handleEdit }
}

export const useApproveParcel = () => {
  const { account } = useWallet()
  const parcelContract = useLotteryTicket()

  const handleParcelApprove = useCallback(
    async (tokenId: number) => {
      try {
        const approvedAddress = await getApproved(parcelContract, tokenId)
        if (approvedAddress === getMarketplaceAddress())
          return true
        const txHash = await approveParcel(parcelContract, account, tokenId)
        // console.log("Return for claimParcel in hooks is: ", txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, parcelContract],
  )

  return { onApproveParcel: handleParcelApprove }
}

export const useTokenOwner = (tokenId) => {
  const parcelContract = useLotteryTicket()
  // const { account } = useWallet()
  const [ tokenOwner, setTokenOwner ] = useState("")

  useEffect(() => {
    const fetchTokenOwner = async () => {
      const res = await isOwner(parcelContract, tokenId)
      setTokenOwner(res)
    }
    
    fetchTokenOwner()

  }, [parcelContract, tokenOwner, tokenId])

  // console.log("Before return, isTokenOwner: ", tokenOwner)
  return tokenOwner
}


export const useCancelSale = () => {
  const { account } = useWallet()
  const marketplaceContract = useMarketplace()

  const handleCancelSale = useCallback(
    async (tokenId: number) => {
      try {
        const txHash = await cancelParcelSale(marketplaceContract, account, tokenId)
        // console.log("Return for claimParcel in hooks is: ", txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, marketplaceContract],
  )

  return { onCancelSale: handleCancelSale }
}

export const useSale = () => {
  const { account } = useWallet()
  const marketplaceContract = useMarketplace()

  const handleParcelSale = useCallback(
    async (tokenId: number, price: BigNumber) => {
      try {
        const txHash = await sellParcel(marketplaceContract, account, tokenId, price)
        // console.log("Return for claimParcel in hooks is: ", txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, marketplaceContract],
  )

  return { onParcelSale: handleParcelSale }
}

export const useBuyAndTransfer = () => {
  const { account } = useWallet()
  const marketplaceContract = useMarketplace()

  const handleParcelBuy = useCallback(
    async (tokenId: number, price: BigNumber) => {
      try {
        const txHash = await buyAndTransfer(marketplaceContract, account, tokenId, price)
        // console.log("Return for claimParcel in hooks is: ", txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, marketplaceContract],
  )

  return { onParcelBuy: handleParcelBuy }
}


export const useTokenURISet = () => {
  const { account } = useWallet()
  const parcelContract = useLotteryTicket()

  const handleSet = useCallback(
    async (tokenId: number, tokenURI: string) => {
      try {
        const txHash = await tokenURISet(parcelContract, account, tokenId, tokenURI)
        console.log("Return for tokenURISet in hooks is: ", txHash)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, parcelContract],
  )

  return { onTokenURISet: handleSet }
}

export const useMultiBuyLottery = () => {
  const { account } = useWallet()
  const lotteryContract = useLottery()

  const handleBuy = useCallback(
    async (amount: string, numbers: Array<any>) => {
      try {
        const txHash = await multiBuy(lotteryContract, amount, numbers, account)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, lotteryContract],
  )

  return { onMultiBuy: handleBuy }
}

export const useMaxNumber = () => {
  const [max, setMax] = useState(5)
  const lotteryContract = useLottery()

  const fetchMax = useCallback(async () => {
    const noop = ""
  }, [])

  useEffect(() => {
    if (lotteryContract) {
      fetchMax()
    }
  }, [lotteryContract, fetchMax])

  return max
}
