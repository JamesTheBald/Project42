import React from 'react';

const VoteCounter = ({voteCount, setVoteCount}) => {
  
  return (
    <>
      {voteCount}
      <div
        onClick={() => {
          setVoteCount((curr) => {return curr + 1})
        }}
      >
      </div>
    </>
  );
}

export default VoteCounter;