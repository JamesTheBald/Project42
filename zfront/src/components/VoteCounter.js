import React from 'react';

const VoteCounter = ({voteCount, setVoteCount}) => {
  
  return (
    <>
      <div className="font-500">Upvotes:</div>
      {voteCount}
      <button onClick={() => setVoteCount((curr) => {return curr + 1})}>
        Upvote!
      </button>
    </>
  );
}

export default VoteCounter;