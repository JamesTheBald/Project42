import React from "react";
import convertISODate from "./../functions/convertISODate";


const PopupContent = (props) => {

  const title = props.post.title;
  const lastUpdated = props.post.updatedAt;
  const purpose = props.post.purpose;

  return (
    <>
      {title ? 
        <div className="mb-4"> {title} </div>
      :
        <div>Click to edit</div>
      }
      <div className="text-xs mb-4"> {purpose} </div>
      <div className="text-xs text-right text-gray-600">Last Updated: {convertISODate(lastUpdated)}</div>
    </>
  )
}

export default PopupContent;
