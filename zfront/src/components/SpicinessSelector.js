import React, { useState } from 'react';
import { GiChiliPepper } from 'react-icons/gi';
import { TiDeleteOutline } from 'react-icons/ti';


const SpicinessSelector = (props) => {

  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;



  const [hideMildPepper, setHideMildPepper] = useState(false);
  const [hideMediumPeppers, setHideMediumPeppers] = useState(false);
  const [hideSpicyPeppers, setHideSpicyPeppers] = useState(false);
  const [hideDeleteButton, setHideDeleteButton] = useState(true);



  const handleSpicinessChange = (passedSpiciness) => {
    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, spiciness: passedSpiciness };
      // console.log("MainModal.js: handleSpicinessChange: setting postDraft to", newPostDraft);
      return newPostDraft;
   });
    setHideDeleteButton(false);
  };

  const resetSelectedSpiciness = (emptyString) => {
    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, spiciness: emptyString };
      // console.log("MainModal.js: handleSpicinessChange: setting postDraft to", newPostDraft);
      return newPostDraft;
   });
    setHideDeleteButton(true);
  };


  return (
    <>
      <div
        name="pepper-box"
        className="flex flex-col"
      >
        <div
          name="mild-pepper-group"
          className={postDraft.spiciness == "mild" ? "opacity-100 flex items-center" : "opacity-50 cursor-pointer"}
          hidden={hideMildPepper}
        >
          <div
            name = "pepperOnClickHousing"
            className="flex justify-end"
            onClick={() => {
              handleSpicinessChange("mild");
              setHideMediumPeppers(true);
              setHideSpicyPeppers(true);
            }}
          >
            <GiChiliPepper
              size="24"
              className="text-green-600"
            />
          </div>
          <div 
            name="DltBtnOnClickHousing"
            onClick = {() => {
              resetSelectedSpiciness("");
              setHideMediumPeppers(false);
              setHideSpicyPeppers(false);
            }}
          >
            <TiDeleteOutline
              className="cursor-pointer text-gray-400"
              size="16"
              hidden = {hideDeleteButton}
            />
          </div>
        </div>
        <div
          name="medium-peppers-group"
          className={postDraft.spiciness == "medium" ? "opacity-100 flex items-center" : "opacity-50 cursor-pointer"}
          hidden={hideMediumPeppers}
        >
          <div
            name="pepperOnClickHousing"
            className="flex justify-end"
            onClick={() => {
              handleSpicinessChange("medium");
              setHideMildPepper(true);
              setHideSpicyPeppers(true);
            }}
          >
            <GiChiliPepper
              size="24"
              className="text-yellow-500"
            />
            <GiChiliPepper
              size="24"
              className="text-yellow-500"
            />
          </div>
          <div
            name = "DltBtnOnClickHousing"
            onClick = {() => {
              resetSelectedSpiciness("");
              setHideMildPepper(false);
              setHideSpicyPeppers(false);
            }}
          >
            <TiDeleteOutline
              className="cursor-pointer text-gray-400"
              size="16"
              hidden = {hideDeleteButton}
            />
          </div>
        </div>
        <div
          name="spicy-peppers-group"
          className={postDraft.spiciness == "spicy" ? "opacity-100 flex items-center" : "opacity-50 cursor-pointer"}
          hidden={hideSpicyPeppers}
        >
          <div
            name="pepperOnClickHousing"
            className="flex justify-end"
            onClick={() => {
              handleSpicinessChange("spicy");
              setHideMildPepper(true);
              setHideMediumPeppers(true);
              setHideDeleteButton(false)
            }}
          >
            <GiChiliPepper
              size="24"
              className="text-red-500"
            />
            <GiChiliPepper
              size="24"
              className="text-red-500"
            />
            <GiChiliPepper
              size="24"
              className="text-red-500"
            />
          </div>
          <div
            name="DltBtnOnClickHousing"
            onClick={() => {
              resetSelectedSpiciness("");
              setHideMildPepper(false);
              setHideMediumPeppers(false);
            }}
          >
            <TiDeleteOutline
              className="cursor-pointer text-gray-400"
              size="16"
              hidden = {hideDeleteButton}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SpicinessSelector;