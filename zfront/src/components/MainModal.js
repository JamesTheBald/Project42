import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import convertISODate from "../functions/convertISODate";
import RichTextEditor from "./RichTextEditor";
import ContentTypeSelector from "./ContentTypeSelector";
import SpicinessSelector from "./SpicinessSelector";
import VoteCounter from "./VoteCounter";
import WarningModal from "./WarningModal";
import { FaRegUser, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineTags } from "react-icons/ai";
import { GrSave } from "react-icons/gr";
import { BsArrowCounterclockwise } from "react-icons/bs";
import submitPost from "../functions/submitPost";
import deletePost from "../functions/deletePost";

const MainModal = (props) => {
  const emptyPost = props.emptyPost;
  let currPostIndex = props.currPostIndex;
  let showMainModal = props.showMainModal;
  const setShowMainModal = props.setShowMainModal;
  let postingsDataArray = props.postingsDataArray;
  const setPostingsDataArray = props.setPostingsDataArray;
  let postDraft = props.postDraft;
  const setPostDraft = props.setPostDraft;
  let creatingPostFlag = props.creatingPostFlag;
  let userVoted = props.userVoted;
  const setUserVoted = props.setUserVoted;


  const [showWarningModal, setShowWarningModal] = useState(false);
  let madeEdits = useRef();

  useEffect(() => {
    madeEdits.current = false;
  }, []);

  console.log("MainModal.js Begins.");
  // console.log("MainModal.js: postDraft=", postDraft);

  // useEffect(() => {
  //   const listener = event => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //      set flag
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

  const handleInputChange = (evnt) => {
    //J: This could be called updatePostDraft()
    madeEdits.current = true;
    console.log("handleInputChange madeEdits.current =", madeEdits.current);

    console.log("MainModal handleInputChange event=", evnt);
    const { name, value } = evnt.target;

    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, [name]: value };
      // Brackets [] around 'name' are so the VALUE of name is used for the key and not just the string 'name'.
      console.log("MainModal.js: handleInputChange: setting postDraft to", newPostDraft);
      return newPostDraft;
    });
  };

  // Switch focus to next input field when Enter is pressed
  function handleEnter(evnt) {
    // From: https://stackoverflow.com/questions/38577224/focus-on-next-field-when-pressing-enter-react-js
    if (evnt.keyCode === 13) {
      const form = evnt.target.form;
      const index = Array.prototype.indexOf.call(form, evnt.target);
      form.elements[index + 1].focus();
      evnt.preventDefault();
    }
  }

  const safeModalHide = (madeEdits) => {
    console.log("safeModalHide madeEdits.current =", madeEdits.current);

    if (madeEdits.current) {
      console.log("safeModalHide warning issued, showing WarningModal", madeEdits.current);
      setShowWarningModal(true);
    } else {
      setShowMainModal(false);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        centered
        show={showMainModal}
        animation={false}
        onHide={() => {
          safeModalHide(madeEdits);
        }}>
        <Modal.Body>
          <form>
            <>
              <input
                name="title"
                type="text"
                required
                maxLength="60"
                className="text-xl w-full p-1 font-500 focus:bg-gray-200 hover:bg-gray-200"
                placeholder="Enter title of posting here"
                value={postDraft.title}
                onChange={handleInputChange} // Try onBlur?
                onKeyDown={handleEnter}
              />
            </>

            <div className="flex flex-row items-center p-1 mt-2">
              <FaRegUser size="24" />
              <input
                name="contributors"
                type="text"
                required
                className="modalField p-2"
                placeholder="(Firstname, last Initial)"
                value={postDraft.contributors}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
              />
            </div>

            {postDraft?.createdAt && postDraft.updatedAt ? // If there aren't any dates, just skip this
              <>
                <div className="flex flex-row p-1 mt-2">
                  {" "}
                  {/* Dates are read-only, and only shown for existing posts */}
                  <div className="flex flex-row">
                    <div className="font-500">Created:</div>
                    <div className="ml-2 font-400">{convertISODate(postDraft.createdAt)}</div>
                  </div>
                  <div className="flex flex-row ml-6">
                    <div className="font-500">Modified:</div>
                    <div className="ml-2 font-400">{convertISODate(postDraft.updatedAt)}</div>
                  </div>
                </div>
              </>
              : 
              <></>
            }

            <div className="flex flex-row items-center p-1 mt-2">
              <AiOutlineTags size="30"/>
              <input
                name="tags"
                type="text"
                required
                className="modalField"
                placeholder="What tags are related to your post?"
                value={postDraft.tags}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
              />
            </div>


            <ContentTypeSelector postDraft={postDraft} setPostDraft={setPostDraft}></ContentTypeSelector>


            <div className="flex flex-row justify-between items-center w-2/5 p-1 mt-2">
              <div className="font-500">Spiciness:</div>
              <SpicinessSelector
                postDraft = {postDraft}
                setPostDraft = {setPostDraft}
              />
            </div>


            <div className="flex flex-row items-center w-2/5 p-1 mt-2">
              <div className="font-500 w-1/2">Upvotes:</div>
              <VoteCounter 
                postingsDataArray = {postingsDataArray}
                // showMainModal = {showMainModal}
                index = {-1}
                postDraft = {postDraft}
                setPostDraft = {setPostDraft}
                userVoted = {userVoted}
                setUserVoted = {setUserVoted}
              />
            </div>


            <div className="flex flex-col w-full p-1 mt-2">
              <div className="font-500">Purpose:</div>
              <textarea
                name="purpose"
                type="text"
                required
                className="w-full p-2"
                value={postDraft.purpose}
                placeholder="What does your post help its readers accomplish?"
                onChange={handleInputChange}
              />
            </div>


            <RichTextEditor
              postDraft={postDraft}
              setPostDraft={setPostDraft}
              required
            />


          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              console.log("MainModal.js Clicked Abandon Changes");
              setShowMainModal(false);
            }}>
            Abandon Changes <BsArrowCounterclockwise></BsArrowCounterclockwise>
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              deletePost(
                postDraft,
                postingsDataArray,
                setPostingsDataArray,
                currPostIndex,
                setShowMainModal,
                creatingPostFlag
              );
            }}>
            Delete Post<FaRegTrashAlt></FaRegTrashAlt>
          </Button>

          <Button
            type="submit"
            onClick={() => {
              submitPost(
                emptyPost,
                postDraft,
                postingsDataArray,
                setPostingsDataArray,
                currPostIndex,
                setShowMainModal,
                creatingPostFlag
              );
            }}>
            Save Changes<GrSave></GrSave>
          </Button>
        </Modal.Footer>

        <WarningModal showWarningModal={showWarningModal} setShowWarningModal={setShowWarningModal} />
      </Modal>
    </>
  );
};

export default MainModal;
