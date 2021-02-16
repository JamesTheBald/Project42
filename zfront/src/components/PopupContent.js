import React from "react";

const PopupContent = (props) => {

  const title = props.post.title;
  const contributors = props.post.contributors;

  return (
    <>
      {title ? 
        <div>{title}</div>
      :
        <div>Click to edit</div>
      }
      <div className="mt-2">{contributors}</div>
    </>
  )
}

export default PopupContent;
