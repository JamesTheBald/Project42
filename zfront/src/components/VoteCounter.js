import React from 'react';
import { BiUpArrow } from 'react-icons/bi';


const VoteCounter = (props) => {

  let postingsDataArray = props.postingsDataArray;
  // const showMainModal = props.showMainModal;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  const index = props.index


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
        <div> { postDraft.upvotes } </div>
      :
        <div> { postingsDataArray[index].upvotes } </div>
    }

      {/* <div> { postDraft.upvotes } </div> */}
      <div onClick = { () => handleVoteCountChange()} className="p-2">
        <BiUpArrow />
      </div>
    </>
  );
}


export default VoteCounter;