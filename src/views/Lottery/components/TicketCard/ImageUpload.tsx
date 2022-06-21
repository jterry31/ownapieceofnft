import { Flex, Text, Button, Image} from 'uikit'
import React, {useState} from 'react'
import styled from 'styled-components'

// import decodeToken  from './decodeToken'

const Input = styled.input`
  visibility: hidden;
`;

const ImageUpload = (props) => {
    const [imageFile, setImageFile] = useState(null)
    const [imageFileURL, setImageFileURL] = useState(null)
    const {tokenIDs, txHash, setImageURL} = props;
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const imageFileLimit = 3000000

    const onFileChange = event => {
        event.preventDefault();
        if(event.target.files[0]) {
        setImageFileURL(URL.createObjectURL(event.target.files[0]))
        setImageFile(event.target.files[0])
        setImageURL(URL.createObjectURL(event.target.files[0])) // this is for preivews -> BuyTicketModal
        }

    };

    const onFileUpload = () => {
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
                        formData.append("txHash", txHash.toString())
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

    return (
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
                {errorMessage && <h1 style={{marginTop: "3vh",  marginLeft: "auto", marginRight: "auto", color: "#d40e00", fontSize: "15px"}}> Image cannot be uploaded </h1>}

                <br />
                <Input type="file" id="fileUpload" accept="image/png" onChange={onFileChange} style={{margin: "auto"}} />
                <br />
            </form>
               
            {/* <img src={imageFileURL} alt="newImage" style={{width:"50%", margin: "auto"}} /> */}
            <br />
            <Button size="sm" margin="auto" disabled={imageFileURL === null || imageFile.size > imageFileLimit} onClick={onFileUpload}>
                Upload
            </Button>
        </div>
    
    )
}

export default ImageUpload