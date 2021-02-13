import React from "react";

const PopupContent = (props) => {
  return (
    <>
      <div className="w-48 p-2 text-gray-800">  
        { props.title ? 
          <div>{props.title}</div>
          :
          <div> Click to edit </div>
        }
        <div className="mt-2">{props.contributors}</div>
        <div>{props.purpose}</div>
      </div>
    </>
  )
}

export default PopupContent;
