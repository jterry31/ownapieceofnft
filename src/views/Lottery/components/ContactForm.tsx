import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, Input, Heading, useModal, Text} from 'uikit'
import StatusSpinner from './StatusSpinner'

const Tips = styled.div`
  margin-left: 0.4em;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`

const StyledContactForm = styled.div`
display: block;
// position: absolute;
width: 100%;
max-width: 400px;
margin-left: auto;
margin-right: auto;
margin-top: 64px;
background: rgba(0,0,0,0.8);
border-radius: 16px;

`

const StyledInputs = styled.div`
// width: 50%;
width: 95%;
margin-left: auto;
margin-right: auto;
`

const StyledHeading = styled.div`
width: 100%;

display: flex;
margin-left: auto;
margin-right: auto;
align-items: center;
justify-content: center;

`

const ContactForm = ({setOpen}) => {

    const [ownerName,setOwnerName] = useState("");
    const [mail,setMail] = useState("");
    const [message,setMessage] = useState("");
    const [pendingTx, setPendingTx] = useState(false)
    const [txHashBuy, setTxHashBuy] = useState("none")

    const handleOwnerNameChange = event => {
        event.preventDefault();
        setOwnerName(event.target.value)
      };
    
    const handleMessageChange = event => {
        event.preventDefault();
        setMessage(event.target.value)
    };

    const handleMailChange = event => {
        event.preventDefault();
        setMail(event.target.value)
    };
  
    return (
    <StyledContactForm>
        <StyledInputs>
            <StyledHeading>
                <Heading mt="8px" mb="8px" mr="auto" ml="auto" size="md">Please Contact Us</Heading>
            </StyledHeading>
            <br />

            {pendingTx ? null :
            <div>
                <Text>Your Name </Text>
                <Input type="text" scale="sm" placeholder="John Doe" value={ownerName} onChange={handleOwnerNameChange}/> 

                <Text>Your E-mail Address </Text>
                <Input type="text" scale="sm" placeholder="john.doe@gmail.com" value={mail} onChange={handleMailChange}/>

                <Text>Your Message </Text>
                <textarea placeholder="    Example message" value={message} onChange={handleMessageChange} 
                    style={{ resize: "vertical", width: "100%", minWidth: "100%", maxWidth: "100%", 
                            height: "120px", minHeight: "120px", maxHeight: "240px", fontSize: "16px", borderRadius: "8px"}} />

                <br />
            </div>
            }
            <Button
            id="msg-submit"
            fullWidth
            disabled={pendingTx}
            marginTop = "10px"
            onClick={async () => {
                console.log("Clicked Confirm")

                // Continue on Buying Tickets
            
                setPendingTx(true)
                // Submit Message Here to DB
                fetch("https://api.ownapieceofnft.com/submitMessage", {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    body: JSON.stringify({name: ownerName, mail: mail, message: message})
                })
                .then(res => res.json())
                .then(
                    (result) => {
                    console.log("Response: ", result);  
                    setTxHashBuy(result.submitStatus)
                    setTimeout(() => {
                        setPendingTx(false)
                        setTxHashBuy("none")
                        setOpen(false)
                    }, 2000)
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    )
                
            
            
                
            }}
            >
            {pendingTx ? 'Submitting Message' : 'Submit' }
            </Button>
     
        </StyledInputs>
        {txHashBuy !== "none" ? <StatusSpinner txHash={txHashBuy} data="Submit Message Status: " /> : null}
        <br /> 
    </StyledContactForm>
    
    );
  }

  export default ContactForm;