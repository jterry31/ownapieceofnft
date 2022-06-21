/* eslint-disable no-await-in-loop */
import BigNumber from 'bignumber.js'
import { Interface } from '@ethersproject/abi'
import { getWeb3 } from 'utils/web3'
import MultiCallAbi from 'config/abi/Multicall.json'

import ticketAbi from 'config/abi/parcelNFT.json'
import parcelLotteryTicketAbi from 'config/abi/parcelLottery.json'
import marketplaceAbi from 'config/abi/marketplace.json'

import lotteryAbi from 'config/abi/lottery.json'
import { getMulticallAddress, getLotteryTicketAddress, getMarketplaceAddress } from './addressHelpers'

export const multiCall = async (abi, calls) => {
  const web3 = getWeb3()
  const multi = new web3.eth.Contract(MultiCallAbi, getMulticallAddress())
  const itf = new Interface(abi)
  let res = []
  if (calls.length > 100) {
    let i = 0
    while (i < calls.length / 100) {
      const newCalls = calls.slice(i * 100, 100 * (i + 1))
      const calldata = newCalls.map((call) => [call[0].toLowerCase(), itf.encodeFunctionData(call[1], call[2])])
      const { returnData } = await multi.methods.aggregate(calldata).call()
      i++
      res = res.concat(returnData.map((call, index) => itf.decodeFunctionResult(newCalls[index][1], call)))
    }
  } else {
    const calldata = calls.map((call) => [call[0].toLowerCase(), itf.encodeFunctionData(call[1], call[2])])
    const { returnData } = await multi.methods.aggregate(calldata).call()
    res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i][1], call))
  }
  return res
}

// DEPRECATED!!!!!!!!!
export const multiBuy = async (lotteryContract, price, numbersList, ownerName, twitter, mail, wallet, account) => {
  try {
    console.log(numbersList);
    return lotteryContract.methods
      .multiBuy(new BigNumber(price).times(new BigNumber(10).pow(18)).toString(), numbersList)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const updateOwnerInfo = async (parcelContract, account, tokenID, ownerName, twitter, mail, wallet) => {
  try {
    // console.log("At lotteryUtils, numbers are: ", numbersList);
    return parcelContract.methods
      .updateOwnerInfo(tokenID, ownerName, twitter, mail, wallet)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const approveParcel = async (parcelContract, account, tokenID) => {
  try {
    // console.log("At lotteryUtils, numbers are: ", numbersList);
    return parcelContract.methods
      .approve(getMarketplaceAddress(), tokenID)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}


export const claimParcel = async (parcelContract, account, numbersList, ownerName, twitter, mail, wallet, minterComission, totalPrice) => {
  try {
    console.log("At lotteryUtils, numbers are: ", numbersList);
    return parcelContract.methods
      .multiBuy(numbersList, ownerName, twitter, mail, wallet, minterComission)
      .send({ from: account, value: totalPrice * 10**18 })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const tokenURISet = async (parcelContract, account, tokenId, tokenURI) => {
  try {
    console.log("At lotteryUtils, tokenId is: ", tokenId);
    return parcelContract.methods
      .setTokenURI(account, tokenId, tokenURI)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const getTickets = async (ticketsContract, account) => {
  const length = await getTicketsAmount(ticketsContract, account)

  // eslint-disable-next-line prefer-spread
  /*
  const calls1 = Array.apply(null, { length }).map((a, i) => [
    ticketsContract.options.address,
    'tokenOfOwnerByIndex',
    [account, i],
  ])
  */

  const res = []
  for (let i=0; i<length; i++) {
    const tokenID = await ticketsContract.methods.tokenOfOwnerByIndex(account, i).call()
    res.push(tokenID)
  }

  const tokenIds = res.map((id) => id.toString())

  /*
  const calls3 = tokenIds.map((id) => [ticketsContract.options.address, 'getParcelCoords', [id]])
  const tickets = await multiCall(ticketAbi, calls3)

  await getLotteryStatus(lotteryContract)
  */
  console.log("finalTokenids in lotteryUtils: ", tokenIds)
  
  
  return tokenIds
}



// /////////////////////////// MARKETPLACE CONTRACT ///////////////

export const getSaleInfo = async (marketplaceContract) => {
  return marketplaceContract.methods.getSaleInfo().call()
}

export const getMinterComissionPercentage = async (marketplaceContract) => {
  return marketplaceContract.methods.minterComissionPercentage().call()
}

export const getComissionPercentage = async (marketplaceContract) => {
  return marketplaceContract.methods.comissionPercentage().call()
}

export const getApproved = async (parcelContract, tokenID) => {
  return parcelContract.methods.getApproved(tokenID).call()
}

export const isMinterComission = async (parcelContract, tokenID) => {
  return parcelContract.methods.minterComissions(tokenID).call()
}

export const isOwner = async (parcelContract, tokenID) => {
  return parcelContract.methods.ownerOf(tokenID).call()
}


export const cancelParcelSale = async (marketplaceContract, account, tokenID) => {
  try {
    // console.log("At lotteryUtils, numbers are: ", numbersList);
    return marketplaceContract.methods
      .cancelParcelSale(tokenID)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const buyAndTransfer = async (marketplaceContract, account, tokenID, price) => {
  try {
    // console.log("At lotteryUtils, numbers are: ", numbersList);
    return marketplaceContract.methods
      .buyAndTransfer(tokenID)
      .send({ from: account, value: price * 10**18 })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const sellParcel = async (marketplaceContract, account, tokenID, price) => {
  try {
    // console.log("At lotteryUtils, numbers are: ", numbersList);
    return marketplaceContract.methods
      .sellParcel(tokenID, price)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

// //////////////////////////


export const getParcelInfo = async (ticketsContract) => {
  return ticketsContract.methods.getParcelInfo().call()
}

export const getSingleParcelInfo = async (ticketsContract, tokenID) => {
  return ticketsContract.methods.parcelInfo(tokenID).call()
}

export const getCurrentSection = async (ticketsContract) => {
  return ticketsContract.methods.section().call()
}

export const getImageWidth = async (ticketsContract) => {
  return ticketsContract.methods.imageWidth().call()
}

export const getImageHeight = async (ticketsContract) => {
  return ticketsContract.methods.imageHeight().call()
}

export const getCurrentSectionPrice = async (ticketsContract, currentSection) => {
  return ticketsContract.methods.sectionPrices(currentSection).call()
}

export const getBaseDescription = async (ticketsContract) => {
  return ticketsContract.methods.baseDescription().call()
}

export const getBaseImageURI = async (ticketsContract) => {
  return ticketsContract.methods.baseimageURI().call()
}

export const getBaseURI = async (ticketsContract) => {
  return ticketsContract.methods.baseURI().call()
}

export const getTokenURI = async (ticketsContract, tokenID) => {
  return ticketsContract.methods.tokenURI(tokenID).call()
}

export const getImageName = async (ticketsContract) => {
  return ticketsContract.methods.imageName().call()
}

export const getTicketsAmount = async (ticketsContract, account) => {
  return ticketsContract.methods.balanceOf(account).call()
}



// /////////////////////////// OLD FUNCS ///////////////////////////////////
export const multiClaim = async (lotteryContract, ticketsContract, account) => {
  await lotteryContract.methods.issueIndex().call()
  const length = await getTicketsAmount(ticketsContract, account)
  // eslint-disable-next-line prefer-spread
  const calls1 = Array.apply(null, { length }).map((a, i) => [
    ticketsContract.options.address,
    'tokenOfOwnerByIndex',
    [account, i],
  ])
  const res = await multiCall(ticketAbi, calls1)
  const tokenIds = res.map((id) => id.toString())

  const calls2 = tokenIds.map((id) => [ticketsContract.options.address, 'getClaimStatus', [id]])
  const claimedStatus = await multiCall(ticketAbi, calls2)

  const unClaimedIds = tokenIds.filter((id, index) => !claimedStatus[index][0])

  const calls3 = unClaimedIds.map((id) => [lotteryContract.options.address, 'getRewardView', [id]])
  const rewards = await multiCall(lotteryAbi, calls3)

  let finanltokenIds = []
  rewards.forEach((r, i) => {
    if (r > 0) {
      finanltokenIds.push(unClaimedIds[i])
    }
  })

  if (finanltokenIds.length > 200) {
    finanltokenIds = finanltokenIds.slice(0, 200)
  }

  try {
    return lotteryContract.methods
      .multiClaim(finanltokenIds)
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } catch (err) {
    return console.error(err)
  }
}

export const getTotalClaim = async (lotteryContract, ticketsContract, account) => {
  try {
    const issueIdex = await lotteryContract.methods.issueIndex().call()
    const length = await getTicketsAmount(ticketsContract, account)
    // eslint-disable-next-line prefer-spread
    const calls1 = Array.apply(null, { length }).map((a, i) => [
      ticketsContract.options.address,
      'tokenOfOwnerByIndex',
      [account, i],
    ])
    const res = await multiCall(ticketAbi, calls1)
    const tokenIds = res.map((id) => id.toString())
    const calls2 = tokenIds.map((id) => [ticketsContract.options.address, 'getLotteryIssueIndex', [id]])
    const ticketIssues = await multiCall(ticketAbi, calls2)
    const calls3 = tokenIds.map((id) => [ticketsContract.options.address, 'getClaimStatus', [id]])
    const claimedStatus = await multiCall(ticketAbi, calls3)

    const drawed = await getLotteryStatus(lotteryContract)

    const finalTokenids = []
    ticketIssues.forEach(async (ticketIssue, i) => {
      // eslint-disable-next-line no-empty
      if (!drawed && ticketIssue.toString() === issueIdex) {
      } else if (!claimedStatus[i][0]) {
        finalTokenids.push(tokenIds[i])
      }
    })

    const calls4 = finalTokenids.map((id) => [lotteryContract.options.address, 'getRewardView', [id]])

    const rewards = await multiCall(lotteryAbi, calls4)
    const claim = rewards.reduce((p, c) => BigNumber.sum(p, c), BigNumber(0))

    return claim
  } catch (err) {
    console.error(err)
  }
  return BigNumber(0)
}

export const getTotalRewards = async (lotteryContract) => {
  const issueIdex = await lotteryContract.methods.issueIndex().call()
  return lotteryContract.methods.getTotalRewards(issueIdex).call()
}

export const getMax = async (lotteryContract) => {
  return lotteryContract.methods.maxNumber().call()
}

export const getLotteryIssueIndex = async (lotteryContract) => {
  const issueIndex = await lotteryContract.methods.issueIndex().call()
  return issueIndex
}

export const getLotteryStatus = async (lotteryContract) => {
  return lotteryContract.methods.drawed().call()
}

export const getMatchingRewardLength = async (lotteryContract, matchNumber) => {
  let issueIdex = await lotteryContract.methods.issueIndex().call()
  const drawed = await lotteryContract.methods.drawed().call()
  if (!drawed) {
    issueIdex -= 1
  }
  try {
    const amount = await lotteryContract.methods.historyAmount(issueIdex, 5 - matchNumber).call()
    return amount / 1e18 / 10
  } catch (err) {
    console.error(err)
  }
  return 0
}

export const getWinningNumbers = async (lotteryContract) => {
  const issueIdex = await lotteryContract.methods.issueIndex().call()
  const numbers = []
  const drawed = await lotteryContract.methods.drawed().call()

  if (!drawed && parseInt(issueIdex, 10) === 0) {
    return [0, 0, 0, 0]
  }
  if (!drawed) {
    for (let i = 0; i < 4; i++) {
      numbers.push(+(await lotteryContract.methods.historyNumbers(issueIdex - 1, i).call()).toString())
    }
  } else {
    for (let i = 0; i < 4; i++) {
      numbers.push(+(await lotteryContract.methods.winningNumbers(i).call()).toString())
    }
  }
  return numbers
}
