import React from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
  LogoIcon,
  LinkExternal,
} from 'uikit'

const Image = styled.img`
  margin-right: 16px;
  width: 56px;
`

const Content = styled.div`
  flex: 1;
`

const StyledCardContent = styled.div`
  align-items: start;
  display: flex;
`

const Divider = styled.div`
background-color: rgba(255,255,255,0.7);
height: 1px;
margin-top: 10px;
margin-bottom: 25px;

`


const Attributes = ({ attributes }) => {
  const attributeList = []
  for(let i=0; i<attributes.length; i++) 
    attributeList.push(
      <Text as="p" color="rgba(255,255,255,1)" style={{ display: "flex", width: "100%"}}>
          {attributes[i].trait_type} <h3 style={{ color: "rgba(255,255,255,1)", marginLeft: "5px",  wordBreak: "break-all"}}> {attributes[i].value} </h3>
      </Text>
    )
  
  return (
    <div>
      <Text as="p" color="rgba(255,255,255,1)" style={{ fontSize: "20px", fontWeight: 1000}}> Parcel Attributes </Text>
      <Divider />
      {attributeList}
    </div>
  ) 
   
}

export default Attributes
