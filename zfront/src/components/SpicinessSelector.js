import React, { useState } from "react";
import { GiChiliPepper } from 'react-icons/gi';
import { TiDeleteOutline } from 'react-icons/ti';


const SpicinessSelector = (props) => {



  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;



  // Don't move this function! It needs to be placed BEFORE its call on line 28
  const conditional = () => {
    if (postDraft.spiciness === "") {
      return true;
    } else if (postDraft.spiciness === "mild") {
      return false;
    } else if (postDraft.spiciness === "medium") {
      return false;
    } else if (postDraft.spiciness === "spicy") {
      return false;
    }
  }



  const [hideMildPepper, setHideMildPepper] = useState(false);
  const [hideMediumPeppers, setHideMediumPeppers] = useState(false);
  const [hideSpicyPeppers, setHideSpicyPeppers] = useState(false);
  const [hideDeleteButton, setHideDeleteButton] = useState(conditional());

  const handleSpicinessChange = (passedSpiciness) => {
    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, spiciness: passedSpiciness };
      return newPostDraft;
   });
    setHideDeleteButton(false);
  };

  const resetSelectedSpiciness = (emptyString) => {
    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, spiciness: emptyString };
      return newPostDraft;
   });
    setHideDeleteButton(true);
  };


  return (
    <>
      {(postDraft.spiciness === "") ? 
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
              className={postDraft.spiciness == "medium" ? "opacity-100 flex items-center justify-end" : "opacity-50 cursor-pointer justify-end"}
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
              className={postDraft.spiciness == "spicy" ? "opacity-100 flex items-center justify-end" : "opacity-50 cursor-pointer justify-end"}
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
        : (postDraft.spiciness === "mild") ?
        <>
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
        </>
        : (postDraft.spiciness === "medium") ?
        <>
          <div
            name="medium-peppers-group"
            className={postDraft.spiciness == "medium" ? "opacity-100 flex items-center justify-end" : "opacity-50 cursor-pointer justify-end"}
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
        </>
        : (postDraft.spiciness === "spicy") ?
        <>
          <div
            name="spicy-peppers-group"
            className={postDraft.spiciness == "spicy" ? "opacity-100 flex items-center justify-end" : "opacity-50 cursor-pointer justify-end"}
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
        </>
        :
        <></>
      }
    </>
  );
}

export default SpicinessSelector;