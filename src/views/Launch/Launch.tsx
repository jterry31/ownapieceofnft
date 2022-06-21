import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactTooltip from "react-tooltip";
import {
  BrowserView,
  MobileView,
  TabletView,
  isTablet,
  isMobile,
  isBrowser
} from "react-device-detect";
import LaunchPage from 'components/layout/LaunchPage'
import { Button, Input, Text} from 'uikit'
import StatusSpinner from '../Lottery/components/StatusSpinner'

const FlexDir = styled.div<{flexDir: string}>`
  display: flex;
  flex-direction: ${({ flexDir }) => flexDir};
`

const Launch: React.FC = () => {

const [mail,setMail] = useState("");
const [msgResult,setMsgResult] = useState("none");
const [pendingTx,setPendingTx] = useState(false);

const handleMailChange = event => {
    event.preventDefault();
    setMail(event.target.value)
};

const width = window.innerWidth;
let respWidth = ""
let flexDir = ""
let leftMargin = ""
let butleftMargin = "0vw"
let buttopMargin = "0vw"
let sizeFont = "0px"

if(width > 1500) {
    respWidth = "30vw"
    flexDir = "row"
    leftMargin = "32vw"
    butleftMargin = "1vw"
    sizeFont = "30px"
  }

  else if(width > 1200) {
    respWidth = "32vw"
    flexDir = "row"
    leftMargin = "31vw"
    butleftMargin = "1vw"
    sizeFont = "30px"
  }

  else if(width > 1000) {
    leftMargin = "29vw"
    respWidth = "40vw"
    flexDir = "row"
    butleftMargin = "1vw"
    sizeFont = "30px"
  }

  else if(width > 700) {
    leftMargin = "18vw"
    respWidth = "60vw"
    flexDir = "row"
    butleftMargin = "1vw"
    sizeFont = "30px"
  }

  else if(width > 450) {
    leftMargin = "16vw"
    respWidth = "60vw"
    flexDir = "column"
    buttopMargin = "2vw"
    sizeFont = "30px"
  }

  else {
    leftMargin = "16vw"
    respWidth = "60vw"
    flexDir = "column"
    buttopMargin = "2vw"
    sizeFont = "25px"
  }


  return (
    <LaunchPage>
        <div style={{display: "flex", width: respWidth, flexDirection: "column", justifyContent: "center",
            marginLeft: leftMargin, marginTop: "30vh"}}>
            <h1 style={{color: "#fffdfa", fontSize: sizeFont}}> Stay tuned and register to our news bulletin for updates </h1>

            <Text mt="3vh">Your E-mail Address </Text>
            <FlexDir flexDir={flexDir}>
               
                <Input type="text" scale="sm" placeholder="john.doe@gmail.com" value={mail} onChange={handleMailChange}/>
                <Button
                    id="msg-submit"
                    size="sm"
                    marginLeft={butleftMargin}
                    marginTop={buttopMargin}
                    fullWidth
                    disabled={pendingTx}
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
                            body: JSON.stringify({name: "Launch", mail: mail, message: "Launch"})
                        })
                        .then(res => res.json())
                        .then(
                            (result) => {
                            console.log("Response: ", result); 
                            setMsgResult(result);
                            setTimeout(() => {
                                setPendingTx(false)
                                setMsgResult("none")
                            }, 1500)
                            },
                            // Note: it's important to handle errors here
                            // instead of a catch() block so that we don't swallow
                            // exceptions from actual bugs in components.
                            )
                        
                    
                    
                        
                    }}
                    >
                    {pendingTx ? 'Submitting Message' : 'Submit' }
                </Button>
                
            </FlexDir>
            {msgResult !== "none" ? <h1 style={{marginTop: "1vh", color: "#00e33d"}}> Mail Registered Successfully!! </h1> : null}
        </div>

     
    </LaunchPage>
  )
}

export default Launch
