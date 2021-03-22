import React from 'react'
import { AiOutlineCaretDown } from "react-icons/ai";

import PopupContent from "./PopupContent";
import VoteCounter from "./VoteCounter";
import RenderSpiciness from "./RenderSpiciness";


const Stub = (props) => {

  const post = props.post;
  const index = props.index;
  const handleOnClick = props.handleOnClick;
  const postingsDataArray = props.postingsDataArray;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;


  return (
    <div className="tooltipBase stub" onClick={handleOnClick(post, index)}>

      <div className="titleContainer">
        {post.title ? (
          <div className="h-8.5 overflow-hidden font-500 relative">
            {post.title}
            {(post.title.length > 60) && <div className="fadeOutContainer" />}
          </div>
        ) : (
          <div>Click to edit</div>
        )}

        <div className="mt-3 text-gray-700 w-full truncate overflow-hidden">
          {post.contributors}
        </div>
      </div>

      <div className="attributeContainer" >
        <div className="text-gray-700"> {post.contentType} </div>

        <div className="my-1.5">
          <RenderSpiciness spiciness={post.spiciness} />
        </div>

        <VoteCounter
          postingsDataArray={postingsDataArray}
          userVoted={userVoted}
          setUserVoted={setUserVoted}
          postDraft={postDraft}
          setPostDraft={setPostDraft}
          index={index}
        />
      </div>

      {/* Tooltip  */}
      <span className="tooltipItself  flex flex-col items-center">

        <div className={`w-96 p-2  bg-gray-100 rounded-lg`}>
          <PopupContent post={post} postDraft={postDraft} setPostDraft={setPostDraft} />
        </div>
        <div style={{ transform: "translateY(-8px)" }}>
          <AiOutlineCaretDown className="text-3xl  text-gray-200" />
        </div>

      </span>

    </div>
  )
}

export default Stub
