import React, { useState, useCallback, useEffect } from 'react'
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading, Text, Button, Modal, Input, Spinner, Checkbox } from 'uikit'
import BigNumber from 'bignumber.js';
import { useTickets } from 'hooks/useTickets'
import { useEditOwner, useCancelSale, useSale, useComission, useApproveParcel, useBuyAndTransfer, useTokenOwner } from 'hooks/useBuyLottery'
import { useLottery, useLotteryTicket, useMarketplace } from 'hooks/useContract'
import { getMinterComissionPercentage, getComissionPercentage, getApproved, isMinterComission, isOwner } from 'utils/lotteryUtils'
import { getMarketplaceAddress } from 'utils/addressHelpers'
import useI18n from 'hooks/useI18n'
import { TwitterShareButton } from 'react-twitter-embed';
import Divider from 'views/Lottery/components/Divider'
import Image from './TicketCard/Image'

const Bold = styled.div`
  font-weight: 600;
`

const StyledTwitterShareButton = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  
`

interface ParcelInfoModalProps {
  onDismiss?: () => void
  account?: string
  parcelRow?: number
  parcelCol?: number
  tokenID?: number
  parcelID?: number
  parcelPrice?: number
  ownerName?: string
  imageName?: string
  imageURI?: string
  seller?: string
  sellPrice?: string
  isOnSale?: boolean
  description?: string
  tokenId?: number
  mail?: string
  tokenURI?: string
  twitter?: string
  wallet?: string
  flag?: boolean
}

// const NoNftsToClaimCard = (tokenID, parcelRow, parcelCol, name, twitter) => {
const ParcelInfoModal: React.FC<ParcelInfoModalProps> = ({ account, parcelID, parcelRow, parcelCol, tokenId, tokenURI,
  imageURI, imageName, description, ownerName, twitter, mail, wallet, flag, parcelPrice, sellPrice, seller, isOnSale, onDismiss }) => {

  const getTickets = (data) => {
    const tokenIds = data[0]
    const ticketNumbers = data[1]
    let tokenStr = ""
    let numStr = ""
    for(let i=0; i<tokenIds.length; i++) {
      tokenStr = tokenStr.concat(tokenIds[i].toString())
      numStr = numStr.concat("[",ticketNumbers[i],"]")
      if(i < tokenIds.length - 1) {
        tokenStr = tokenStr.concat(", ")
        numStr = numStr.concat(", ")
      }
    }
  
    return [tokenStr, numStr]
  }

  const data = useTickets()
  const comissionValues = useComission(tokenId)
  const isTokenMinterComission = comissionValues[0]
  const minterComissionPercentage = comissionValues[1]
  const comissionPercentage = comissionValues[2]

  // const strData = getTickets(data)
  const [owned, setOwned] = useState(false)
  
  const [editMode, setEditMode] = useState(false)
  const [saleEditMode, setSaleEditMode] = useState(false)

  const [showButtons, setShowButtons] = useState(true)
  const [showSaleButtons, setShowSaleButtons] = useState(true)
  const [oldOwnerName,setOldOwnerName] = useState(ownerName);
  const [oldMail,setOldMail] = useState(mail);
  const [oldTwitter,setOldTwitter] = useState(twitter);
  const [oldWallet,setOldWallet] = useState(wallet === "0x0000000000000000000000000000000000000000" ? "Undisclosed" : wallet);

  const [imageFile, setImageFile] = useState(null)
  const [imageFileSize, setImageFileSize] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const imageFileLimit = 3000000


  const [walletCheckBox, setWalletCheckBox] = useState(false)
  const [imageURL, setImageURL] = useState("https://images.ownapieceofnft.com/".concat(tokenId.toString(), ".png"))
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingSaleTx, setPendingSaleTx] = useState(false)
  const [pendingCancelSaleTx, setPendingCancelSaleTx] = useState(false)
  const [newOwnerName,setNewOwnerName] = useState("");
  const [newPrice,setNewPrice] = useState(sellPrice);
  const [newMinterComissionPrice,setNewMinterComissionPrice] = useState(0.0);
  const [newComissionPrice,setNewComissionPrice] = useState(0.0);
  const [newRemainingPrice,setNewRemainingPrice] = useState(0.0);
  const [newMail,setNewMail] = useState("");
  const [newTwitter,setNewTwitter] = useState("");
  const [newWallet,setNewWallet] = useState("");
  const [changesSaved,setChangesSaved] = useState(false);
  const [saleChangesSaved,setSaleChangesSaved] = useState(false);
  const [txSuccessful,setTxSuccessful] = useState(false);
  const [saleTxSuccessful,setSaleTxSuccessful] = useState(false);

  const [ buyButtonState, setBuyButtonState ] = useState(false);
  const [ buyButtonText, setBuyButtonText ] = useState("Buy Parcel");
  const [ buyButtonVisible, setBuyButtonVisible ] = useState(true);

  const [buyParcelSuccess,setBuyParcelSuccess] = useState(false);
  const [buyParcelError,setBuyParcelError] = useState(false);

  const [cancelSaleSuccess,setCancelSaleSuccess] = useState(false);
  const [cancelSaleError,setCancelSaleError] = useState(false);
  const [sellParcelSuccess,setSellParcelSuccess] = useState(false);
  const [sellParcelError,setSellParcelError] = useState(false);

  const [sellParcelApproveSuccess,setSellParcelApproveSuccess] = useState(false);
  const [sellParcelApproveError,setSellParcelApproveError] = useState(false);

  const [sellParcelCancelButton,setSellParcelCancelButton] = useState(false);

  

  const [cancelSaleTxSuccessful,setCancelSaleTxSuccessful] = useState(false);
  const [onSale, setOnSale] = useState(isOnSale)

  // setOnSale(isOnSale)
  const price = onSale ? sellPrice : parcelPrice

  const parcelContract = useLotteryTicket()

  useEffect(() => {
    const setThings = async () => {
      const tokenOwner = await isOwner(parcelContract, tokenId)
      setOwned(account ? tokenOwner === account : false)
    }
    setThings()
  }, [owned, tokenId, parcelContract, account]);


  const { onEditOwner } = useEditOwner()
  const { onCancelSale } = useCancelSale()
  const { onParcelSale } = useSale()
  const { onParcelBuy } = useBuyAndTransfer()
  const { onApproveParcel } = useApproveParcel()

  const onFileChange = event => {
    event.preventDefault();
    if(event.target.files[0]) {
      setImageURL(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
      setImageFileSize(event.target.files[0].size)
    }

  };


  const handleWalletClick = () => {
    setWalletCheckBox(!walletCheckBox)
  }

  const handleEdit = useCallback(async () => {
    try {
      
      const finalWallet = walletCheckBox ? account.toString() : "Undisclosed"
      setPendingTx(true)
      const txHash = await onEditOwner(tokenId, newOwnerName, newMail, newTwitter, walletCheckBox)
      setPendingTx(false)
     
      // if tx successful
      if (txHash) {

        // image related actions

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

        setOldOwnerName(newOwnerName)
        setOldWallet(finalWallet)
        setOldMail(newMail)
        setOldTwitter(newTwitter)
        setTxSuccessful(true)

        setChangesSaved(true)
        setShowButtons(false)
        setTimeout(() => {
          setChangesSaved(false)
          setShowButtons(true)
          setEditMode(false)
        }, 1500)
      }

    } catch (e) {
      console.error(e)
   
    }
  }, [onEditOwner, tokenId, newOwnerName, newTwitter, newMail, account, walletCheckBox, imageFile])

  const handleSaleEdit = useCallback(async () => {
    try {        
      setPendingSaleTx(true)
      const numberPrice = new BigNumber(parseFloat(newPrice) * 10**18)
      setSellParcelCancelButton(false)

      const approveTxHash = await onApproveParcel(tokenId)

      if (approveTxHash)
        setSellParcelApproveSuccess(true)
      else
        setSellParcelApproveError(true)

      setTimeout(() => {
        setSellParcelApproveSuccess(false)
        setSellParcelApproveError(false)
      }, 1500)

      const txHash = await onParcelSale(tokenId, numberPrice)
      setPendingSaleTx(false)
     
      // if tx successful
      if (txHash) {
        setSaleTxSuccessful(true)
        setSellParcelSuccess(true)
        setShowSaleButtons(false)
        setOnSale(true)
        setTimeout(() => {
          setSaleChangesSaved(true)
          setShowSaleButtons(true)
          setSaleEditMode(false)

          setSellParcelError(false)
          setSellParcelSuccess(false)
        }, 2000)
      }

      else {
        setSellParcelError(true)
        setTimeout(() => {
          setSellParcelError(false)
          setSellParcelCancelButton(true)
        }, 2000)
      }
      

    } catch (e) {
      console.error(e)
   
    }
  }, [onParcelSale, tokenId, newPrice, onApproveParcel])

  const handleParcelBuy = useCallback(async () => {
    try {        
      setBuyButtonText("Pending...")
      setBuyButtonState(true)
      const txHash = await onParcelBuy(tokenId, new BigNumber(newPrice))
      if (txHash) {
        setBuyParcelSuccess(true)
        setBuyButtonVisible(false)

        setTimeout(() => {
          setBuyParcelSuccess(false)
          setOnSale(false)
          setOwned(!owned)
        }, 2000)
      }
      
      else {
        setBuyParcelError(true)
        setBuyButtonVisible(false)

        setTimeout(() => {
          setBuyParcelError(false)
          setBuyButtonText("Buy Parcel")
          setBuyButtonState(false)
          setBuyButtonVisible(true)
        }, 2000)
      }

    } catch (e) {
      console.error(e)
   
    }
  }, [onParcelBuy, tokenId, newPrice, owned])
  const handleCancelSale = useCallback(async () => {
    try {
      
      setPendingCancelSaleTx(true)
      const txHash = await onCancelSale(tokenId)
      setPendingCancelSaleTx(false)
     
      // if tx successful
      
      if (txHash) {
        setCancelSaleSuccess(true)
        setTimeout(() => {
          setOnSale(false)

          setCancelSaleSuccess(false)
          setCancelSaleError(false)
        }, 1000)
      }
      
      else {
        setCancelSaleError(true)
        setTimeout(() => {
          setCancelSaleError(false)
        }, 1000)
       
      }

    } catch (e) {
      console.error(e)
   
    }
  }, [onCancelSale, tokenId])
  
  const handleValues = () => {
    setEditMode(true)
  }

  const handleSaleValues = () => {
    setSaleEditMode(true)
    setSellParcelCancelButton(true)
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  const handleSellParcelCancel = () => {
    setSaleEditMode(false)
    setSellParcelCancelButton(false)
  }

  const handleOwnerNameChange = event => {
    event.preventDefault();
    setNewOwnerName(event.target.value)
  };

  const handlePriceChange = event => {
    event.preventDefault();
    setNewPrice(event.target.value)
    setNewComissionPrice(event.target.value * comissionPercentage / 100)
    setNewMinterComissionPrice(event.target.value * minterComissionPercentage / 100)

    if(isTokenMinterComission)
      setNewRemainingPrice(event.target.value - (event.target.value * comissionPercentage / 100 + event.target.value * minterComissionPercentage / 100))
    else
      setNewRemainingPrice(event.target.value - event.target.value * comissionPercentage / 100)
  };

  const handleTwitterChange = event => {
    event.preventDefault();
    setNewTwitter(event.target.value)
  };

  const handleMailChange = event => {
    event.preventDefault();
    setNewMail(event.target.value)
  };

  const editFlexDir = isMobile ? "column" : "row"
  
  const modalTitle = "Parcel #".concat(tokenId.toString(), " Information")
  
  return (
    
    <Modal title={modalTitle} onDismiss={onDismiss}>
      <div style={{maxWidth: "600px"}}>
        <Image src={imageURL} alt={null} originalLink={null}/>
      </div>
    
      <br/><br/>
      <Divider />
     
      <div style={{display: "flex", flexDirection: editFlexDir, justifyContent: "center"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          {pendingTx ? <Button disabled mb="2vh" ml="auto" mr={isMobile ? "auto" : "1vw"} size="sm"> Pending... </Button> : 
              owned && showButtons && <Button variant="primary" mb="2vh" ml="auto" mr={isMobile ? "auto" : "auto"} size="sm" 
                      onClick={editMode ? handleEdit : handleValues} 
                      disabled={editMode && (newTwitter === "" || newMail === "" || newOwnerName === "" || ( imageFile !== null && imageFileSize > imageFileLimit))}>   
                      {editMode ? "Save Changes" : "Edit Owner Information"} 
                      </Button>}

          {changesSaved && txSuccessful && <h1 style={{marginTop: "1vh", marginBottom: "2vh", margin: "auto", color: "#00e33d"}}> Changes Saved Successfully!!  <br /> 
            Please clear your browser cache for new uploaded image, if any </h1>}
          {changesSaved && !txSuccessful && <h1 style={{marginTop: "1vh", color: "#d40e00"}}> Error, update failed. </h1>}
          <br />
        </div>
        {editMode && !pendingTx && showButtons && <Button variant="secondary" mb="2vh" ml={isMobile ? "auto" : "1vw"} size="sm" onClick={handleCancel}> Cancel </Button>}
      </div>

      { editMode &&  <div style={{ display: "flex", flexDirection: "column"}}>
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

          </div> }





      <Text mb={editMode ? "2vh" : null}> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Owned By: </h3> 
        {editMode ? <Input type="text" scale="sm" placeholder="New Owner Name" value={newOwnerName} onChange={handleOwnerNameChange}/> : oldOwnerName}
      </Text>
      <Text mb={editMode ? "2vh" : null}> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Twitter Address: </h3>
        {editMode ? <Input type="text" scale="sm" placeholder="New Twitter Address" value={newTwitter} onChange={handleTwitterChange}/> : oldTwitter}
      </Text>
      <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>E-Mail Address: </h3>
        {editMode ? <Input type="text" scale="sm" placeholder="New Mail Address" value={newMail} onChange={handleMailChange}/> : oldMail}
      </Text>
      
      {editMode ? 
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "5vh"}}>
            <br />
            <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px", color: "#fffdfa"}}>Would you like your wallet info to be displayed? </h3>
            <div role="button" onClick={handleWalletClick} onKeyDown={handleWalletClick} tabIndex={0} style ={{marginLeft: "1vw"}}> <Checkbox /> </div>
        </div> : <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Wallet: </h3> 
        {oldWallet}
      </Text> }

      <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight: "3px"}}> Token ID: </h3> {tokenId} </Text>
      <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight: "3px"}}> Token URI: </h3> {tokenURI} </Text>
      <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight: "3px"}}> Row-Coordinate: </h3> {parcelRow}</Text>
      <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight: "3px"}}> Col-Coordinate: </h3> {parcelCol} </Text>
      <br /><br />
      <Divider />
      {onSale ? <Text mr="auto" ml="auto"> <h3 style={{display: "inline-flex", fontSize: "20px", marginRight: "auto", 
        marginLeft: "auto", color: "#f1bf00"}}> On Sale for {newPrice} AVAX  </h3> </Text> : null}
     
      
      {onSale && !owned && account && buyButtonVisible && <Button disabled={buyButtonState || account === "not defined"} size="sm" 
        style={{margin: "auto", marginTop: "1vh"}} onClick={handleParcelBuy}> {buyButtonText}</Button> }
      {buyParcelSuccess && <h1 style={{marginTop: "2vh", marginBottom: "2vh", marginLeft: "auto", marginRight: "auto", color: "#00e33d", fontSize: "18px"}}> Transaction Successful, Parcel Bought from {newPrice} BNB! </h1>}
      {buyParcelError && <h1 style={{marginTop: "2vh", marginBottom: "2vh", marginLeft: "auto", marginRight: "auto", color: "#d40e00", fontSize: "18px"}}> Error, Transaction failed. </h1>}

      <br />

 
      <div style={{display: "flex", flexDirection: editFlexDir}}>
        {owned && onSale && !pendingCancelSaleTx && <Button variant="secondary" mb="2vh" margin="auto" 
          size="sm" onClick={handleCancelSale}> Cancel</Button>}
        {pendingCancelSaleTx && <Button disabled mb="2vh" margin="auto" mt="1vh" size="sm"> Pending... </Button>}
      </div>
     
      <div style={{display: "flex", flexDirection: "column"}}> 
             
        {cancelSaleSuccess && <h1 style={{marginTop: "1vh", marginBottom: "2vh", margin: "auto", color: "#00e33d"}}> Sale Canceled Successfully! </h1>}
        {cancelSaleError && <h1 style={{marginTop: "1vh", marginBottom: "2vh", margin: "auto", color: "#d40e00"}}> Error, transaction failed. </h1>}
          
      </div>
      
      
      { saleEditMode && <Text mb={saleEditMode ? "2vh" : null}> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Selling Price (in AVAX): </h3> 
        <Input type="text" scale="sm" placeholder="0" value={newPrice} onChange={handlePriceChange}/>
      </Text>}
      
      { saleEditMode && <Text mb={saleEditMode ? "2vh" : null}> 
        <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Marketplace Comission Percentage (%): </h3> {comissionPercentage}  </Text>
        <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Marketplace Comission Price: </h3> {newComissionPrice} AVAX </Text>
        <br />
        <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Minter Comission: </h3> {isTokenMinterComission ? "Yes" : "No"}  </Text>
        {isTokenMinterComission ? <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Minter Comission Percentage (%): </h3> {minterComissionPercentage} </Text> : null}
        {isTokenMinterComission ? <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>Minter Comission Price: </h3> {newMinterComissionPrice} AVAX </Text> : null}

        <Text> <h3 style={{display: "inline-flex", fontSize: "16px", marginRight:"5px"}}>You will receive: </h3> {newRemainingPrice.toFixed(3)} AVAX </Text>
      </Text>}

      <div style={{display: "flex", flexDirection: editFlexDir, justifyContent: "center", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          {pendingSaleTx ? <Button disabled mb="2vh" ml="auto" mr={isMobile ? "auto" : "auto"} size="sm"> Pending... </Button> : 
              owned && !onSale && showSaleButtons && <Button variant="primary" ml="auto" mr={isMobile ? "auto" : saleEditMode ? "1vw" : "auto"} size="sm" 
                      onClick={saleEditMode ? handleSaleEdit : handleSaleValues}> {saleEditMode ? "Complete Sale" : "Sell This Parcel"} 
                      </Button>}

          
        </div>
        {sellParcelCancelButton && <Button variant="secondary" mb="2vh" margin={isMobile ? "auto" : "1vw"} size="sm" onClick={handleSellParcelCancel}> Cancel </Button>}
      </div>
     
      {sellParcelSuccess && <h1 style={{marginTop: "1vh", margin: "auto", color: "#00e33d"}}> Transaction Successful, Parcel is now On Sale. </h1>}
      {sellParcelError && <h1 style={{marginTop: "1vh", margin: "auto", color: "#d40e00"}}> Error, Transaction failed. </h1>}

      {sellParcelApproveSuccess && <h1 style={{marginTop: "1vh", margin: "auto", color: "#00e33d"}}> Approve Successful </h1>}
      {sellParcelApproveError && <h1 style={{marginTop: "1vh", color: "#d40e00"}}> Error, Approve failed. </h1>}

      { owned ? <StyledTwitterShareButton>
        <TwitterShareButton
          url='https://ownapieceofnft.com'
          options={{ text: 'Check out this unique #NFT I have just bought!!!', via: 'ownapieceofnft', 
                    hashtags: 'ownapieceofnft,nftart', size: 'large', related: 'ownapieceofnft,nft.whale', align: 'center' }}
        />

      </StyledTwitterShareButton> : null }  
          
    </Modal>
    
  )
}

export default ParcelInfoModal
