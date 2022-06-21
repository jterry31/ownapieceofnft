import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { useLottery, useLotteryTicket } from 'hooks/useContract'
import useRefresh from './useRefresh'
import {
  getTotalRewards,
  getTotalClaim,
  getMatchingRewardLength,
  getWinningNumbers,
  getTickets,
  getParcelInfo,
  getSingleParcelInfo,
  getTokenURI,
  getImageWidth,
  getImageHeight
} from '../utils/lotteryUtils'

interface ParcelStruct {
  tokenID: string;
  parcelRow: string;
  parcelCol: string;
  ownerName: string;
  mail: string;
  twitter: string;
  wallet: string;
  imageName: string;
  description: string;
  imageURI: string;
}

export const useTickets = () => {
  const [tokenIds, setTokenIds] = useState([])
  const { account } = useWallet()
  const ticketsContract = useLotteryTicket()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTickets(ticketsContract, account)
      console.log("In useTickets hook, before setTokenIds, res: ", res)

      setTokenIds(res)
    }

    if (account && ticketsContract) {
      fetchBalance()
    }
  }, [account, ticketsContract, fastRefresh])

  return tokenIds
}

export const useImageWidth = () => {
  const [imageWidth, setImageWidth] = useState(0)
  const { account } = useWallet()
  const ticketsContract = useLotteryTicket()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const imageWidth = await getImageWidth(ticketsContract)
      
      setImageWidth(imageWidth)
    }

    if (account && ticketsContract) {
      fetchBalance()
    }
  }, [account, ticketsContract, fastRefresh])

  return imageWidth
}

export const useParcelInfo = () => {
  const ticketsContract = useLotteryTicket()
  const { fastRefresh } = useRefresh()
  const [parcelInfo, setParcelInfo] = useState([])
  console.log("useTickets, beginning Parcel Info")

  useEffect(() => {
    const fetchParcelInfo = async () => {
      const fetchedParcelInfo = await getParcelInfo(ticketsContract)
      setParcelInfo(fetchedParcelInfo)
      console.log("parcelInfo at useTickets: ", parcelInfo)
    }

    if (ticketsContract) {
      console.log("useTickets, fetching Parcel Info")
      fetchParcelInfo()
    }
  }, [ticketsContract, fastRefresh, parcelInfo])

  return parcelInfo
}

export const useTokenURI = (tokenID) => {
  const ticketsContract = useLotteryTicket()
  const { fastRefresh } = useRefresh()
  const [tokenURI, setTokenURI] = useState("")
  

  useEffect(() => {
    const fetchTokenURI = async () => {
      const fetchedTokenURI = await getTokenURI(ticketsContract, tokenID)
      setTokenURI(fetchedTokenURI)
      // console.log("parcelInfo at useTickets: ", parcelInfo)
    }

   
    const interval = setInterval(() => {
      console.log("Fetching Token URI")
      fetchTokenURI()
    }, 2000);

    return function cleanup() {
      clearInterval(interval);
    }

  })

  return tokenURI
}

export const useSingleParcelInfo = (tokenID) => {
  const ticketsContract = useLotteryTicket()
  const { fastRefresh } = useRefresh()
  const [parcelInfo, setParcelInfo] = useState({})
  // console.log("useTickets, beginning Parcel Info")

  useEffect(() => {
    const fetchParcelInfo = async () => {
      const fetchedParcelInfo = await getSingleParcelInfo(ticketsContract, tokenID.toString())
      setParcelInfo(fetchedParcelInfo)
      // console.log("parcelInfo at useTickets: ", parcelInfo)
    }

    const interval = setInterval(() => {
      console.log("Fetching Single parcel Info")
      fetchParcelInfo()
    }, 2000);

    return function cleanup() {
      clearInterval(interval);
    }
  })

  return parcelInfo
}

export const useTotalRewards = () => {
  const [rewards, setRewards] = useState(new BigNumber(0))
  const lotteryContract = useLottery()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTotalRewards(lotteryContract)
      setRewards(new BigNumber(res))
    }

    if (lotteryContract) {
      fetchBalance()
    }
  }, [lotteryContract, fastRefresh])

  return rewards
}

export const useTotalClaim = () => {
  const [claimAmount, setClaimAmount] = useState(new BigNumber(0))
  const [claimLoading, setClaimLoading] = useState(false)
  const { account } = useWallet()
  const ticketsContract = useLotteryTicket()
  const lotteryContract = useLottery()

  const fetchBalance = useCallback(async () => {
    setClaimLoading(true)
    const claim = await getTotalClaim(lotteryContract, ticketsContract, account)
    setClaimAmount(claim)
    setClaimLoading(false)
  }, [account, lotteryContract, ticketsContract])

  useEffect(() => {
    if (account && lotteryContract && ticketsContract) {
      fetchBalance()
    }
  }, [account, fetchBalance, lotteryContract, ticketsContract])

  return { claimLoading, claimAmount }
}

export const useWinningNumbers = () => {
  const [winngNumbers, setWinningNumbers] = useState([0, 0, 0, 0])
  const lotteryContract = useLottery()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const rewards = await getWinningNumbers(lotteryContract)
      setWinningNumbers(rewards)
    }

    if (lotteryContract) {
      fetchBalance()
    }
  }, [fastRefresh, lotteryContract, setWinningNumbers])

  return winngNumbers
}

export const useMatchingRewardLength = (numbers) => {
  const [matchingNumbers, setMatchingNumbers] = useState(0)
  const lotteryContract = useLottery()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const matchedNumbaers = await getMatchingRewardLength(lotteryContract, numbers)
      setMatchingNumbers(matchedNumbaers)
    }

    if (lotteryContract) {
      fetchBalance()
    }
  }, [lotteryContract, numbers, fastRefresh])

  return matchingNumbers*2
}

export default useTickets
