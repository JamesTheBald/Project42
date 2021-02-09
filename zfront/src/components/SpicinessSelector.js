import React from 'react';
import { GiChiliPepper } from 'react-icons/gi';


const SpicinessSelector = (props) => {



  // Declare variables
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;



  // Declare functions
  const handleSpicinessChange = (passedSpiciness) => {
    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, spiciness: passedSpiciness };
      console.log("MainModal.js: handleSpicinessChange: setting postDraft to", newPostDraft);
      return newPostDraft;
   });
  };



  // Declare what the component renders
  return (
    <>
      <div
        name="pepper-box"
        style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"flex-end",
        }}
      >
        <div
          name="mild-pepper-group"
          className={postDraft.spiciness == "mild" ? "opacity-1" : "opacity-50"}
          onClick={() => {
            handleSpicinessChange("mild")
          }}
        >
          <GiChiliPepper
            size="24"
            style={{
              color:'green',
              cursor:"pointer"
            }}
          />
        </div>
        <div
          name="medium-peppers-group"
          className={postDraft.spiciness == "medium" ? "opacity-1" : "opacity-50"}
          style={{display:"flex"}}
          onClick={() => {
            handleSpicinessChange("medium")
          }}
        >
          <GiChiliPepper
            size="24"
            style={{
              color:'orange',
              cursor:"pointer"
            }}
          />
          <GiChiliPepper
            size="24"
            style={{
              color:'orange',
              cursor:"pointer"
            }}
          />
        </div>
        <div
          name="spicy-peppers-group"
          className={postDraft.spiciness == "spicy" ? "opacity-1" : "opacity-50"}
          style={{display:"flex"}}
          onClick={() => {
            handleSpicinessChange("spicy")
          }}
        >
          <GiChiliPepper
            size="24"
            style={{
              color:'red',
              cursor:"pointer"
            }}
          />
          <GiChiliPepper
            size="24"
            style={{
              color:'red',
              cursor:"pointer"
            }}
          />
          <GiChiliPepper
            size="24"
            style={{
              color:'red',
              cursor:"pointer"
            }}
          />
        </div>
      </div>
    </>
  );
}

export default SpicinessSelector;