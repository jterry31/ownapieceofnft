import React from 'react';
import Lottie from 'react-lottie';
import animationData from './spinner.json';

  const Spinner = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  
      return (
        <div>
          <Lottie 
            options={defaultOptions}
            height={250}
            width={250}
          />
        </div>
      )
  }
  
  export default Spinner