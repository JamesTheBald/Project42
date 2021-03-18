import React, { useState } from "react";
import { GiChiliPepper } from 'react-icons/gi';
import { IoRemoveCircleOutline } from 'react-icons/io5';


const SpicinessSelector = (props) => {

  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;

  // Don't move this function! It needs to be placed BEFORE its call on line 28
  const conditionalDltBtnState = () => {
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
  const [hideDeleteButton, setHideDeleteButton] = useState(conditionalDltBtnState());

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
          <div name="no-spiciness-selected-pepper-group" className="flex flex-row  text-gray-600">
            <div
              name="mild-pepper-group"
              className={postDraft.spiciness == "mild" ? "opacity-100 flex items-center" : "opacity-50 cursor-pointer"}
              hidden={hideMildPepper}
            >
              <div
                onClick={() => {
                  handleSpicinessChange("mild");
                  setHideMediumPeppers(true);
                  setHideSpicyPeppers(true);
                }}
              >
                <GiChiliPepper
                  size="26"
                  className="hover:text-green-600"
                />
              </div>
              <div 
                name="delete-button-onClick-housing"
                onClick = {() => {
                  resetSelectedSpiciness("");
                  setHideMediumPeppers(false);
                  setHideSpicyPeppers(false);
                }}
              >
                <IoRemoveCircleOutline
                  className="cursor-pointer text-gray-500"
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
                onClick={() => {
                  handleSpicinessChange("medium");
                  setHideMildPepper(true);
                  setHideSpicyPeppers(true);
                }}
              >
                <GiChiliPepper
                  size="26"
                  className="hover:text-yellow-600"
                />
              </div>
              <div
                name = "delete-button-onClick-housing"
                onClick = {() => {
                  resetSelectedSpiciness("");
                  setHideMildPepper(false);
                  setHideSpicyPeppers(false);
                }}
              >
                <IoRemoveCircleOutline
                  className="cursor-pointer text-gray-500"
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
                className="flex justify-end"
                onClick={() => {
                  handleSpicinessChange("spicy");
                  setHideMildPepper(true);
                  setHideMediumPeppers(true);
                  setHideDeleteButton(false)
                }}
              >
                <GiChiliPepper
                  size="26"
                  className="hover:text-red-600"
                />
              </div>
              <div
                name="delete-button-onClick-housing"
                onClick={() => {
                  resetSelectedSpiciness("");
                  setHideMildPepper(false);
                  setHideMediumPeppers(false);
                }}
              >
                <IoRemoveCircleOutline
                  className="cursor-pointer text-gray-500"
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
            className={postDraft.spiciness == "mild" ? "opacity-100 flex w-full items-center justify-center relative" : "opacity-50 cursor-pointer"}
            hidden={hideMildPepper}
          >
            <div
              className="flex justify-end"
              onClick={() => {
                handleSpicinessChange("mild");
                setHideMediumPeppers(true);
                setHideSpicyPeppers(true);
              }}
            >
              <GiChiliPepper
                size="26"
                className="text-green-500"
              />
            </div>
            <div 
              name="delete-button-onClick-housing"
              className="absolute right-5"
              onClick = {() => {
                resetSelectedSpiciness("");
                setHideMediumPeppers(false);
                setHideSpicyPeppers(false);
              }}
            >
              <IoRemoveCircleOutline
                className="cursor-pointer text-gray-500"
                size="24"
                hidden = {hideDeleteButton}
              />
            </div>
          </div>
        </>
        : (postDraft.spiciness === "medium") ?
        <>
          <div
            name="medium-peppers-group"
            className={postDraft.spiciness == "medium" ? "opacity-100 flex w-full items-center justify-center relative" : "opacity-50 cursor-pointer justify-end"}
            hidden={hideMediumPeppers}
          >
            <div
              className="flex justify-end"
              onClick={() => {
                handleSpicinessChange("medium");
                setHideMildPepper(true);
                setHideSpicyPeppers(true);
              }}
            >
              <GiChiliPepper
                size="26"
                className="text-yellow-500"
              />
              <GiChiliPepper
                size="26"
                className="text-yellow-500"
              />
            </div>
            <div
              name = "delete-button-onClick-housing"
              className="absolute right-4"
              onClick = {() => {
                resetSelectedSpiciness("");
                setHideMildPepper(false);
                setHideSpicyPeppers(false);
              }}
            >
              <IoRemoveCircleOutline
                className="cursor-pointer text-gray-500"
                size="24"
                hidden = {hideDeleteButton}
              />
            </div>
          </div>
        </>
        : (postDraft.spiciness === "spicy") ?
        <>
          <div
            name="spicy-peppers-group"
            className={postDraft.spiciness == "spicy" ? "opacity-100 w-full flex items-center justify-end relative" : "opacity-50 cursor-pointer justify-end"}
            hidden={hideSpicyPeppers}
          >
            <div
              className="flex justify-start"
              onClick={() => {
                handleSpicinessChange("spicy");
                setHideMildPepper(true);
                setHideMediumPeppers(true);
                setHideDeleteButton(false)
              }}
            >
              <GiChiliPepper
                size="26"
                className="text-red-500"
              />
              <GiChiliPepper
                size="26"
                className="text-red-500"
              />
              <GiChiliPepper
                size="26"
                className="text-red-500"
              />
            </div>
            <div
              name="delete-button-onClick-housing"
              // className="absolute right-5"
              onClick={() => {
                resetSelectedSpiciness("");
                setHideMildPepper(false);
                setHideMediumPeppers(false);
              }}
            >
              <IoRemoveCircleOutline
                className="cursor-pointer text-gray-500 ml-1 mr-2"
                size="24"
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