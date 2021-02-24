import React from 'react';
import { BiUpArrow } from 'react-icons/bi';


const VoteCounter = (props) => {

  let postingsDataArray = props.postingsDataArray;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  const index = props.index // the context & value of "index" changes whether VoteCounter
                            // is opened in MainModal.js or RenderStubs.js


  const handleVoteCountChange = () => {
    if ( !userVoted ) {
      setPostDraft( (currDraft) => {
        const newPostDraft = { ...currDraft, upvotes: currDraft.upvotes + 1 };
        return newPostDraft;
      });
    } else {
      setPostDraft( (currDraft) => {
        const newPostDraft = { ...currDraft, upvotes: currDraft.upvotes - 1 };
        return newPostDraft;
      });
    }
    setUserVoted(curr => !curr);
  };



  return (
    <>
        {   // using the .map index from line 27 of RenderStubs.js as our flag (and as an index)
          (index === -1) ?                    // index should = -1 when VoteCounter is invoked from MainModal.js
            <div
              name="upvote-container"
              className="flex justify-center items-center w-1/2"
            >
              <div className="text-blue-600"> {postDraft.upvotes} </div>
              <div onClick = { () => handleVoteCountChange()} className="m-2 text-blue-600">
                <BiUpArrow/>
              </div>
            </div>
          :
            <div> { postingsDataArray[index].upvotes } </div>
        }
    </>
  );
}


export default VoteCounter;



