import React from 'react';
import { BiUpArrow } from 'react-icons/bi';


const VoteCounter = (props) => {

  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;


  // Declare functions
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
    setUserVoted(curr => !curr);     // toggle the state
  };


  return (
    <>
      <div> { postDraft.upvotes } </div>
      <div onClick = { () => handleVoteCountChange()} className="p-2">
      <BiUpArrow />
      </div>
    </>
  );
}


export default VoteCounter;