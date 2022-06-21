import React from 'react';
import { DragSource } from 'react-dnd';


const Piece = (props) => {
  const { image, width, height, widthside, heightside, row, col, isSelected, isClaimed, isLocked} = props;
  // console.log("In piece");
  // console.log(widthside,heightside);
  const parcelRow = row / heightside;
  const parcelCol = col / widthside;
  // const pieceImage = "/images/parcel_images/bnb_dark_".concat(parcelRow).concat("_").concat(parcelCol).concat(".png")

  return (
    
    <div
      style={{
        width: `${widthside}px`,
        height: `${heightside}px`,
        border: isClaimed ? '1px solid rgba(0, 0, 0, .2)' : isSelected ? '1px solid rgba(255, 255, 255, .9)' : '1px solid rgba(0, 0, 0, .2)',
        backgroundImage: `url(${image})`,
        backgroundSize: `${width}px ${height}px`,
        backgroundPosition: `-${col}px -${row}px`,
        opacity: isSelected ? '0.5' : null,
        cursor: isLocked ? 'not-allowed' : 'pointer',
      }}
    />
   
    
  );
};

export default Piece;