import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, Input, Heading, useModal, Text, Checkbox} from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getFullDisplayBalance } from 'utils/formatBalance'
import TicketInput from 'components/TicketInput'
import ModalActions from 'components/ModalActions'
import Divider from 'views/Lottery/components/Divider'
import { useLotteryAllowance } from 'hooks/useAllowance'
import { useLotteryApprove } from 'hooks/useApprove'
import { useMultiBuyLottery, useMaxNumber, useClaimParcel, useTokenURISet } from 'hooks/useBuyLottery'
import useI18n from 'hooks/useI18n'
import TxStatusModal from './TxStatusModal'
import ImageUpload from './ImageUpload'
import Spinner from '../Spinner'
import StatusSpinner from '../StatusSpinner'
import PreviewParcelList from './PreviewParcelList'

const maxNumberOfTickets = 10000


interface BuyTicketModalProps {
  max: BigNumber
  onConfirm?: (amount: string, numbers: Array<number>) => void
  onDismiss?: () => void
  selectedParcels?: any
  imageName?: string
  baseImageURI?: string
  baseURI?: string
  baseDescription?: string
  isFlipped?: boolean
  cancelSelected?: any
  ticketPrice?: number
  section?: number
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({ max, selectedParcels, cancelSelected, ticketPrice, imageName, baseImageURI, baseURI, baseDescription, section, onDismiss }) => {
  // const [val, setVal] = useState('1')
  const [val, setVal] = useState('1')
  const [ownerName,setOwnerName] = useState("");
  const [mail,setMail] = useState("");
  const [twitter,setTwitter] = useState("");
  const [pendingTx, setPendingTx] = useState(false)
  const [walletCheckBox, setWalletCheckBox] = useState(false)
  const [minterCheckBox, setMinterCheckBox] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(true)
  const [txHashBuy, setTxHashBuy] = useState("none")
  const [pendingTxApprove, setPendingTxApprove] = useState(false)
  const [txHashApprove, setTxHashApprove] = useState("none")
  const [, setRequestedBuy] = useState(false)
  const TranslateString = useI18n()
  const baseImageURL = "/images/bnb_blue_preview.jpg"
  const [imageURL, setImageURL] = useState(baseImageURL)

  const [imageFile, setImageFile] = useState(null)
  const [imageFileSize, setImageFileSize] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const imageFileLimit = 3000000

  const { account, balance }: { account: string; balance: string} = useWallet()
  // const [ticketPrice, setTicketPrice] = useState(0.0)

  // console.log("Rendering BuyTicketModal.... , baseURI: ", baseURI)
  // const parcelRows = []
  
  const totalPrice = parseFloat((ticketPrice*selectedParcels.length).toFixed(3))
  const totalBalance = new BigNumber(balance).div(10**18)

  const tokenName = "AVAX"
  const imageURI = baseImageURI.concat("image/")

  const handleOwnerNameChange = event => {
    event.preventDefault();
    setOwnerName(event.target.value)
  };

  const handleTwitterChange = event => {
    event.preventDefault();
    setTwitter(event.target.value)
  };

  const handleMailChange = event => {
    event.preventDefault();
    setMail(event.target.value)
  };

  const getParcelData = useCallback(() => {
    const parcelRows = []
    const tokenIDs = [] 
    const parcelCols = []
    const multiNumbers = []
    const tokenInfos = []


    for(let i=0; i<selectedParcels.length; i++) {
      const tokenInfo = {
        "tokenID": null,
        "tokenURI": null,
        "rowCoord": null,
        "colCoord": null,
        "section": null,
        "imageURL" : null // this is for uploaded image in BuyTicketModal, main image at first, uploaded later
      }

      // parcel in selectedParcels: isSelected: <bool>, parcelInfo: [<ID>,<row>,<col>]
      const tokenID = selectedParcels[i].parcelId
      const parcelRow = selectedParcels[i].parcelRow
      const parcelCol = selectedParcels[i].parcelCol
      tokenIDs.push(tokenID)
      parcelRows.push(parcelRow)
      parcelCols.push(parcelCol)
      
      multiNumbers.push([parcelRow, parcelCol])

      tokenInfo.tokenID = tokenID
      tokenInfo.tokenURI = baseURI.concat(tokenID, ".json")
      tokenInfo.rowCoord = parcelRow
      tokenInfo.colCoord = parcelCol
      tokenInfo.section = section
      tokenInfo.imageURL = imageURL

      tokenInfos.push(tokenInfo)
    }

    // console.log("tokenIDS at the end of getParcelData: ", tokenIDs)
    return [tokenIDs, parcelRows, parcelCols, multiNumbers, tokenInfos]
}, [selectedParcels, baseURI, section, imageURL])

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  /*
  const maxTickets = useMemo(() => {
    return parseInt(getFullDisplayBalance(max.div(ticketPrice)), 10)
  }, [max, ticketPrice]) */

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value)

  const { onClaimParcel } = useClaimParcel()
  const { onTokenURISet } = useTokenURISet()

  const maxNumber = useMaxNumber()
  
  const handleBuy = useCallback(async () => {
    try {
      setRequestedBuy(true)
      const length = parseInt(val);
      console.log("At BuyTicketModal - handleBuy, val: ", val);
      const parcelData = getParcelData();
      const tokenIDs = parcelData[0]
      const parcelRows = parcelData[1]
      const parcelCols = parcelData[2] 
      const multiNumbers = parcelData[3]
      const tokenInfos = parcelData[4]
      // @ts-ignore
      // eslint-disable-next-line prefer-spread
      // ///////
      
      const wallet = walletCheckBox ? account.toString() : "Undisclosed"
      // console.log("Before claimparcel, values: ", ownerName, mail, twitter, wallet)
      const txHash = await onClaimParcel(multiNumbers, ownerName, mail, twitter, walletCheckBox, minterCheckBox, totalPrice)
    
      // console.log("Return data for claimParcel: ", txHash)
      // console.log("Wallet: ", txHash.from, " Token ID: ", txHash.events.Transfer.returnValues.tokenId)
      // if tx successful
      if (txHash) {
        setRequestedBuy(false)
        console.log("TxHash is: ", txHash)
        if(imageFile) {
          try {
            fetch("https://api.ownapieceofnft.com/auth", {
                method: 'GET'
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Response for auth: ", {result});
                    const authNumber = result.authNum
                    const authCode = +((+authNumber*12 + 5) * 26) - 78
    
                    // Now uploadImage
                    const formData = new FormData()
                    formData.append("imageFile", imageFile)
                    formData.append("txHash", txHash.transactionHash.toString())
                    formData.append("authNum", authNumber.toString())
                    formData.append("authCode", authCode.toString())
    
                    console.log("File size is: ", imageFile.size)
                    fetch("https://api.ownapieceofnft.com/uploadImage", {
                        method: 'POST',
                        body: formData
                    })
                    .then(res => res.json())
                    .then(
                        (result) => {
                        console.log("Response for uploadImage: ", {result});
                        if (result.response === "OK") {
                            setSuccessMessage(true)
                            setTimeout(() => {
                                setSuccessMessage(null)
                            }, 2000)
                        }
                        
                        else {
                            setErrorMessage(true)
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 2000)
                        }
                        },
                    )
                },
            )
          }

          catch(err) {
              console.log("Server Error.")
              setErrorMessage(true)
              setTimeout(() => {
                  setErrorMessage(null)
              }, 2000)
          }

        }
        // //////////////////////////////////////////////////////////////////////////
        cancelSelected()
        setTxHashBuy("ok")
      }

      
      else {
        cancelSelected()
        setTxHashBuy("fail")
      }
      
    
      console.log("In handleBuy end,txHashBuy: ", txHashBuy)

    } catch (e) {
      console.error(e)
   
    }
  }, [onClaimParcel, setRequestedBuy, getParcelData, cancelSelected, txHashBuy, val, ownerName,
                                      mail, twitter, account, walletCheckBox, minterCheckBox, totalPrice, imageFile])

  /*
  const handleSelectMax = useCallback(() => {
    if (Number(maxTickets) > maxNumberOfTickets) {
      setVal(maxNumberOfTickets.toString())
    } else {
      setVal(maxTickets.toString())
    }
  }, [maxTickets]) */


  const cakeCosts = (amount: string): number => {
    return +amount * ticketPrice
  }

  const handleWalletClick = () => {
    setWalletCheckBox(!walletCheckBox)
  }

  const handleMinterClick = () => {
    setMinterCheckBox(!minterCheckBox)
  }

  const onFileChange = event => {
      event.preventDefault();
      if(event.target.files[0]) {
        setImageURL(URL.createObjectURL(event.target.files[0]))
        setImageFile(event.target.files[0])
        setImageFileSize(event.target.files[0].size)
      }

  };

  const tokenBalance =  parseFloat(fullBalance) * 1000000000000000000;
  const isEnough = (totalBalance.isGreaterThanOrEqualTo(totalPrice));
  const allowance = useLotteryAllowance()
  const { onApprove } = useLotteryApprove()
  const [onPresentApprove] = useModal(<TxStatusModal txStatus="false" onDismiss={onDismiss}/>)

  const parcelData = getParcelData();
  const tokenIDs = parcelData[0]
  const parcelRows = parcelData[1]
  const parcelCols = parcelData[2] 
  const multiNumbers = parcelData[3]

  let multiNumString = ""
  let tokenIDString = ""
  let tokenURIString = ""


  for(let i=0; i<multiNumbers.length; i++) {
    const tokenURI = baseURI.concat(tokenIDs[i].toString()).concat(".json")
    tokenURIString = tokenURIString.concat(tokenURI)
    tokenIDString = tokenIDString.concat(tokenIDs[i].toString())
    multiNumString = multiNumString.concat("[",multiNumbers[i][0].toString(),",",multiNumbers[i][1].toString(),"]")
    if(i < multiNumbers.length - 1) {
      tokenURIString = tokenURIString.concat(", ")
      tokenIDString = tokenIDString.concat(", ")
      multiNumString = multiNumString.concat(", ")
    }
  }

  const tokenInfos = getParcelData()[4]
  console.log("Rendering tokenInfos: ", tokenInfos)
  

  return (
    <Modal title='Claim Selected Parcel(s)' onDismiss={onDismiss}>
     {showMainMenu &&
      <div>
          <Heading mb="8px" mr="auto" ml="auto" size="lg">Parcel Information</Heading>
          <br />
          <div style={{ display: "flex", flexDirection: "column"}}>
            <Text margin="auto"> Only ".png" files up to {imageFileLimit / 1000000} MB are accepted, please care to upload accordingly. </Text>
            <br />
            <form style={{margin: "auto"}}> 
                <label htmlFor="fileUpload" style={{paddingLeft: "16px", paddingRight: "16px", paddingTop: "5px", paddingBottom: "5px",
                    backgroundColor: "#f1bf00", borderRadius: "16px",
                    cursor: "pointer", fontSize: "16px", fontWeight: 600}}>
                    Choose Image File for your Parcel(s)
                </label>
               
                {successMessage && <h1 style={{marginTop: "3vh", marginLeft: "auto", marginRight: "auto", color: "#00e33d", fontSize: "15px"}}> Image Uploaded Successfully! </h1>}
                {errorMessage && <h1 style={{marginTop: "3vh",  marginLeft: "auto", marginRight: "auto", color: "#d40e00", fontSize: "16px"}}> Image cannot be uploaded. </h1>}

                <Input type="file" id="fileUpload" accept="image/png" onChange={onFileChange} style={{margin: "auto", visibility: "hidden"}} />
            </form>

          </div>
        

          { imageURL && <PreviewParcelList tokenInfos={tokenInfos} imageURL={imageURL} testURL="/images/bnb_blue_preview.jpg" /> }
          <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight: "3px"}}> Selected Parcel Count: </h3> {selectedParcels.length} </Text>
          <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight: "3px"}}> Selected NFT Parcel(s) worth: </h3> {totalPrice} {tokenName} </Text>

          <br />
          <Divider />
          <Heading mb="20px" size="lg">Enter Owner Information</Heading>
          <h3 style={{display: "inline-flex", color: "#fffdfa", fontSize: "16px", marginRight: "3px",marginTop: "5px", marginBottom: "8px"}}> Full Name </h3>
          <Input type="text" scale="sm" placeholder="John Doe" value={ownerName} onChange={handleOwnerNameChange}/>
        
          <h3 style={{display: "inline-flex", color: "#fffdfa", fontSize: "16px", marginRight: "3px", marginTop: "8px", marginBottom: "8px"}}> Twitter Address </h3>
          <Input type="text" scale="sm" placeholder="https://twitter.com/john.doe" value={twitter} onChange={handleTwitterChange}/>

          <h3 style={{display: "inline-flex", color: "#fffdfa", fontSize: "16px", marginRight: "3px", marginTop: "8px", marginBottom: "8px"}}> E-mail Address </h3>
          <Input type="text" scale="sm" placeholder="john.doe@gmail.com" value={mail} onChange={handleMailChange}/>

          <br />
          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <h3 style={{display: "inline-flex", color: "#fffdfa", fontSize: "16px", marginRight: "3px", marginTop: "8px", marginBottom: "8px"}}> Would you like your wallet info to be displayed? </h3>
            <div role="button" onClick={handleWalletClick} onKeyDown={handleWalletClick} tabIndex={0} style ={{marginLeft: "1vw"}}><Checkbox /> </div>
          </div>

          <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <h3 style={{display: "inline-flex", color: "#fffdfa", fontSize: "16px", marginRight: "3px", marginTop: "8px", marginBottom: "8px"}}> 
            Would you like to get comission as minter from each sale from here? <br />
            Note that next owner(s) of this parcel will be able to see this. </h3>
            <div role="button" onClick={handleMinterClick} onKeyDown={handleMinterClick} tabIndex={0} style ={{marginLeft: "1vw"}}><Checkbox /> </div>
          </div>
      </div> }
      <div>
        {isEnough ? null : <Announce> You do not have enough balance!!! </Announce> }
        { showMainMenu && <Final>You will spend: {totalPrice} {tokenName} </Final> }
        { !showMainMenu && txHashBuy === "none" &&  <Final> Transaction Pending... </Final> }
        { txHashBuy !== "none" && <div> {txHashBuy === "ok" ?  <FinalSuccess> Parcels Claimed Successfully!!! </FinalSuccess>
                             :   <FinalFail> Parcels cannot be claimed!!! </FinalFail> } </div>}
      </div>
      <ModalActions>
        { showMainMenu && <Button fullWidth variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>}
        { showMainMenu && <Button
          id="lottery-buy-complete"
          fullWidth
          disabled={
            // pendingTx || parseInt(val) > Number(maxTickets) || parseInt(val) > maxNumberOfTickets || parseInt(val) < 1
            pendingTx || !isEnough || pendingTxApprove || ( imageFile !== null && imageFileSize > imageFileLimit)
            || ownerName === "" || mail === "" || twitter === ""
          }
          onClick={async () => {
            console.log("Clicked Confirm")

            // Continue on Buying Tickets
          
            /*
            console.log("BEFORE LOGPARCEL: ",selectedParcels,ownerName,twitter);
            // Log Parcel Here
            fetch("https://api.ownapieceofnft.com/logParcel", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                // eslint-disable-next-line react-hooks/exhaustive-deps
                body: JSON.stringify({_id: tokenID, rowCoord: parcelRow, colCoord: parcelCol, name: ownerName, twitter: twitter,
                                      })
              })
              .then(res => res.json())
              .then(
                (result) => {
                  console.log("Response: ", result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                )

            */
            console.log("Before handleBuy in BuyTicketModal main")
            setShowMainMenu(false)
            // Handle Approve first if necessary
            /*
            if (!allowance.toNumber()) {

              setPendingTxApprove(true)
              const tx = await onApprove()
              setPendingTxApprove(false)

              if(!tx) {
                setTxHashApprove("fail")
                setTimeout(() => {
                  onDismiss()
              }, 2000)
              }

              else {
                setTxHashApprove("ok")
              }

              setTimeout(() => {
                  setTxHashApprove("none")
              }, 2000)

             
            }
            */
            setPendingTx(true)
            await handleBuy()
            console.log("TxHashBuy ", txHashBuy)
            setPendingTx(false)
            
           
            setTimeout(() => {
             
              onDismiss()
            }, 2000)
           
             
          }}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>}
      
      </ModalActions>

      {pendingTx ? <Spinner /> : null}
      {txHashBuy !== "none" ? <StatusSpinner txHash={txHashBuy} data="Claim Parcel Status: " /> : null}
    </Modal>
  )
}

export default BuyTicketModal

const Tips = styled.div`
  margin-left: 0.4em;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`

const Final = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #f1bf00;
`
const FinalSuccess = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #00e33d;
`
const FinalFail = styled.div`
  margin-top: 1em;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #d40e00;
`
const Announce = styled.div`
  margin-top: 1em;
  margin-left: 0.4em;
  color: #ed4b9e;
`
