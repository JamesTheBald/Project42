import React from "react";
import './style.css';


function RenderPostings(props) {
  console.log("Loading postings=", props);

  const postingsArray = props.postingsList;

  if (postingsArray) {
    return (
      <div>
        {postingsArray.map((post) => {
          return <div className="postingItem" >{post.content}</div>;
        })}
      </div>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

export default RenderPostings;
