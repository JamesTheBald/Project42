import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp } from '@fortawesome/free-regular-svg-icons';

const VoteCounter = ({voteCount, setVoteCount}) => {
  
  return (
    <>
      {voteCount}
      <FontAwesomeIcon
        icon={faCaretSquareUp}
        onClick={() => {
          setVoteCount((curr) => {return curr + 1})
        }}
      >
      </FontAwesomeIcon>
    </>
  );
}

export default VoteCounter;