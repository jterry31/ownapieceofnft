import React from 'react';
import Lottie from 'react-lottie';
import { Text } from 'uikit'
import successAnimationData from './successSpinner.json';
import failAnimationData from './failSpinner.json';


const StatusSpinner = (props) => {
  const { txHash, data } = props;
  const txUpper = txHash.toString().toUpperCase()
  console.log("In spinner, txHash: ", txHash);
  const successDefaultOptions = {
      loop: false,
      autoplay: true,
      animationData: successAnimationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

  const failDefaultOptions = {
    loop: false,
    autoplay: true,
    animationData: failAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  return (
  <div>
      <Lottie 
        options={txHash === "ok" ? successDefaultOptions : failDefaultOptions}
        height={250}
        width={250}
      />
  </div>
  ) 
}
  
  export default StatusSpinner