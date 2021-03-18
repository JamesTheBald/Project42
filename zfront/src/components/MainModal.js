import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RichTextEditor from "./RichTextEditor";
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineUser, AiOutlineTags } from "react-icons/ai";
import { BiBullseye } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";

import convertISODate from "../functions/convertISODate";
import ContentTypeSelector from "./ContentTypeSelector";
import SpicinessSelector from "./SpicinessSelector";
import VoteCounter from "./VoteCounter";
import WarningModalEdits from "./WarningModalEdits";
import submitPost from "../functions/submitPost";
import WarningDeleteModal from "../components/WarningDeleteModal";
import unlockPost from "../functions/unlockPost";

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
  const recdLog = props.recdLog;

  const [showWarningModalEdits, setshowWarningModalEdits] = useState(false);
  const [showWarningDeleteModal, setShowWarningDeleteModal] = useState(false);
  const [showMainModalFooter, setShowMainModalFooter] = useState(true);
  let madeEdits = useRef();

  useEffect(() => {
    madeEdits.current = false;
  }, []);

  // console.log("MainModal.js Begins.");
  // console.log("MainModal.js: postDraft=", postDraft);

  const handleInputChange = (evnt) => {
    madeEdits.current = true;

    recdLog && console.log("MainModal handleInputChange event=", evnt);
    const { name, value } = evnt.target;

    setPostDraft((currDraft) => {
      const newPostDraft = { ...currDraft, [name]: value };
      // Brackets [] around 'name' are so the VALUE of name is used for the key and not just the string 'name'.
      recdLog && console.log("MainModal.js: handleInputChange: setting postDraft to", newPostDraft);
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
      console.log("safeModalHide warning issued, showing WarningModalEdits", madeEdits.current);
      setshowWarningModalEdits(true);
    } else {
      setShowMainModal(false);
    }
    if (postDraft?._id) {
      unlockPost(postDraft, currPostIndex, recdLog);
    } else {
      console.log("unlockPost not called because postDraft?._id is falsy");
    }
  };

  
  let paddingBody = (window.innerWidth<=1000) ? 2 : 4;


  return (
    <>
      <Modal
        size="xl"
        centered
        show={showMainModal}
        animation={false}
        onHide={() => {
          safeModalHide(madeEdits);
        }}
      >
        <form
          onSubmit={() => {
            submitPost(
              emptyPost,
              postDraft,
              postingsDataArray,
              setPostingsDataArray,
              currPostIndex,
              setShowMainModal,
              creatingPostFlag
            );
          }}
        >

          <Modal.Body>
            <div className={`px-${paddingBody}`}>  {/* Bootstrap modal suppresses Tailwind responsive breakpoint prefixes */}
              <>
                <input
                  name="title"
                  type="text"
                  required
                  maxLength="75"
                  className="modalField text-2xl font-500 mt-3 mb-2"
                  placeholder="Click to enter title of new post here"
                  value={postDraft.title}
                  onChange={handleInputChange}
                  onKeyDown={handleEnter}
                />
              </>

              {postDraft?.createdAt && postDraft.updatedAt ? ( // If there aren't any dates, just skip this
                <>
                  <div className="flex flex-row ml-1 mt-3">
                  
                    <FaRegCalendarAlt size="20" className="ml-0.5 text-blue-600" />

                    {/* Dates are read-only, and only shown for existing posts */}
                    <div className="flex flex-row" style={{paddingLeft: 1.3+"rem"}}>
                      <div className="font-500">Created:</div>
                      <div className="ml-2">{convertISODate(postDraft.createdAt)}</div>
                    </div>
                    <div className="ml-10 flex flex-row">
                      <div className="font-500">Modified:</div>
                      <div className="ml-2">{convertISODate(postDraft.updatedAt)}</div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="flex flex-row items-center" style={{marginLeft: 0.25+"rem", marginTop: 0.8+"rem"}}>
                <AiOutlineUser size="30" className="text-blue-600" />
                <input
                  name="contributors"
                  type="text"
                  required
                  className="modalField"
                  placeholder="Contributors' firstnames and last initial (e.g. Tony E.)"
                  value={postDraft.contributors}
                  onChange={handleInputChange}
                  onKeyDown={handleEnter}
                />
              </div>

              <div className="flex flex-row items-center m-1">
                <AiOutlineTags size="28" className="text-blue-600" />
                <input
                  name="tags"
                  type="text"
                  className="modalField"
                  placeholder="What tags are related to your post?"
                  value={postDraft.tags}
                  onChange={handleInputChange}
                  onKeyDown={handleEnter}
                />
              </div>

              {/* Purpose field */}
              <div className="flex w-full mt-1 mx-1">
                <BiBullseye size="26" className="mt-1.5 text-blue-600" />
                <TextareaAutosize
                  name="purpose"
                  type="text"
                  minRows="1"
                  maxRows="3"
                  className="modalField"
                  value={postDraft.purpose}
                  placeholder="Purpose: What does your post help readers accomplish?"
                  onChange={handleInputChange}
                />
              </div>

              {/* Primary Content Type, Spiciness, Upvotes */}
              <div className="mt-4 px-2 h-12 w-full  flex justify-between ">

                <div className="w-5/12 modalTab">
                  <ContentTypeSelector postDraft={postDraft} setPostDraft={setPostDraft}></ContentTypeSelector>
                </div>

                <div className="w-4/12 modalTab mx-1">
                  <SpicinessSelector postDraft={postDraft} setPostDraft={setPostDraft} />
                </div>

                <div className="w-3/12 modalTab">
                  <VoteCounter
                    postingsDataArray={postingsDataArray}
                    index={-1}
                    postDraft={postDraft}
                    setPostDraft={setPostDraft}
                    userVoted={userVoted}
                    setUserVoted={setUserVoted}
                  />
                </div>
              </div>

            </div>
            <div className="border-gray-400">
              <RichTextEditor postDraft={postDraft} setPostDraft={setPostDraft} setShowMainModalFooter={setShowMainModalFooter} />
            </div>

          </Modal.Body>

        {showMainModalFooter ?
          <>
            <Modal.Footer className="relative">
              <Button
                onClick={() => setShowWarningDeleteModal(true)}
                className="flex items-center self-start bg-white hover:bg-red-100 border-none text-red-400 absolute left-2 hover:text-red-600"
              >
                Archive Post
              </Button>
              <Button
                className="flex items-center self-start bg-white text-blue-600 border-blue-600 hover:text-blue-700 hover:border-blue-700 hover:bg-gray-100"
                onClick={() => {
                  console.log("MainModal.js Clicked Abandon Changes");
                  setShowMainModal(false);
                }}
              >
                Abandon Changes
              </Button>
              <Button type="submit" className="flex items-center bg-blue-600 hover:bg-blue-700 border-blue-600">
                Save &amp; Close
              </Button>
            </Modal.Footer>
          </>
          :
          <>
            <Modal.Footer className="relative">
              <Button type="submit" className="bg-gray-600 hover:bg-gray-700 border-gray-600">
                Exit Editor
              </Button>

            </Modal.Footer>
          </>
        }
          
        </form>

        <WarningModalEdits
          showWarningModalEdits={showWarningModalEdits}
          setshowWarningModalEdits={setshowWarningModalEdits}
        />

        <WarningDeleteModal
          showWarningDeleteModal={showWarningDeleteModal}
          setShowWarningDeleteModal={setShowWarningDeleteModal}
          postDraft={postDraft}
          setPostDraft={setPostDraft}
          postingsDataArray={postingsDataArray}
          setPostingsDataArray={setPostingsDataArray}
          currPostIndex={currPostIndex}
          setShowMainModal={setShowMainModal}
          creatingPostFlag={creatingPostFlag}
        />
      </Modal>
    </>
  );
};

export default MainModal;
