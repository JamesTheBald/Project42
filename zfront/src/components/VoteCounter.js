import React, { useState }from 'react';
import Button from 'react-bootstrap/Button'

const VoteCounter = ({voteCount, setVoteCount}) => {
  const [buttonMessage, setButtonMessage] = useState("Like Post");
  const [buttonColor, setButtonColor] = useState("primary");

  return (
    <>
      <div
        style={{
          display:"flex",
          justifyContent:"space-around"
        }}
      >
        {voteCount}

        <Button
          variant={buttonColor}
          onClick={() => {
            if (buttonMessage === "Unlike Post") {
              setVoteCount(curr => curr - 1);
              setButtonMessage("Like Post");
              setButtonColor("primary")
            } else {
              setVoteCount(curr => curr +1);
              setButtonMessage("Unlike Post");
              setButtonColor("secondary")
            }
          }}
        >
        {buttonMessage}
        </Button>
      </div>
    </>
  );
}

export default VoteCounter;