import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RichTextEditor from "./RichTextEditor";
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineUser, AiOutlineTags } from "react-icons/ai";
import { BsInfoSquare } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";

import convertISODate from "../functions/convertISODate";
import ContentTypeSelector from "./ContentTypeSelector";
import SpicinessSelector from "./SpicinessSelector";
import VoteCounter from "./VoteCounter";
import WarningModalEdits from "./WarningModalEdits";
import submitPost from "../functions/submitPost";
import WarningDeleteModal from "../components/WarningDeleteModal";
import unlockPost from "../functions/unlockPost";
// import { BsWatch } from "react-icons/bs";

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

  recdLog && console.log("MainModal.js begins. postDraft=", postDraft);


  const { register, handleSubmit, watch, errors, formState: { isDirty }, } = useForm({
    defaultValues: {
      title: postDraft?.title,
      contributors: postDraft?.contributors,
      tags: postDraft?.tags,
      purpose: postDraft?.purpose 
    }
  })


  const onSubmit = (data) => {
    recdLog && console.log("MainModal.js onSubmit data=",data);

    let newPostDraft;
    newPostDraft = {...postDraft, ...data, locked:false };
    delete newPostDraft.submit;
    console.log("MainModal.js onSubmit: newPostDraft for submitPost()=", newPostDraft);

    submitPost(
      emptyPost,
      newPostDraft,
      postingsDataArray,
      setPostingsDataArray,
      currPostIndex,
      setShowMainModal,
      creatingPostFlag
    );
  };


  const safeModalHide = () => {
    if (isDirty) {
      console.log("safeModalHide warning issued, showing WarningModalEdits");
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


  let paddingBody = (window.innerWidth<=1000) ? 2 : 4;  // So Bootstrap modal body padding is responsive.



  return (
    <>
      <Modal
        size="xl"
        centered
        show={showMainModal}
        animation={false}
        onHide={() => safeModalHide()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <Modal.Body>
            <div className={`px-${paddingBody}`}>  {/* because Bootstrap modal suppresses Tailwind responsive breakpoint prefixes */}
            
              {/* Title field */}
              <div className="mt-3">
                <input
                  name="title"
                  ref={register({ required: true })}
                  className={`modalField w-full text-2xl font-500 
                  ${(watch('title')===emptyPost?.title) && 'text-gray-500' }`}  // Grayed out until edited
                />
                {errors.title && <p className="ml-3 text-yellow-600 font-500">Please enter a title</p>}
              </div>


              {/* Contributors & Dates fields (stacked or side-by-side, depending on window size) */}
              <div className="mt-2.5 xl:mt-2  w-full flex flex-col items-start xl:flex-row">

                {/* Contributors */}
                <div className="pr-2 w-full xl:w-1/2  flex flex-row items-center ">
                  <div className="iconContainer ">
                    <AiOutlineUser size="26" />
                  </div>
                  
                  <input
                    name="contributors"
                    ref={register({ required: true })}
                    className={`modalField w-full  ${(watch('contributors')===emptyPost?.contributors) && 'text-gray-500' }`}
                  />
                </div>
                {errors.contributors && <p className="ml-12 text-yellow-600 font-500">Please enter at least 1 contributor name</p>}

                {/* Show Dates for existing posts only */}
                {(postDraft?.createdAt && postDraft.updatedAt) && (
                  <div className="pl-2 w-full xl:w-1/2 flex flex-row items-center ">
                    <div className="iconContainer ">
                      <BiCalendar size="26" />
                    </div>  
                    <span className="modalField w-1/2 ">
                      <span>Created:</span>
                      <span className="ml-2">{convertISODate(postDraft.createdAt)}</span>
                    </span>
                    <span className="modalField w-1/2">
                      <span>Modified:</span>
                      <span className="ml-2">{convertISODate(postDraft.updatedAt)}</span>
                    </span>
                  </div>
                )}

              </div>

              {/* <div className="w-full h-2 bg-gray-200"></div> */}

              {/* Description & Tags fields (stacked or side-by-side, depending on window size) */}
              <div className="w-full  flex flex-col xl:flex-row xl:items-start">

                {/* Description field */}
                <div className="pr-2 w-full xl:w-1/2  flex flex-row items-start
                 ">
                  <div className="iconContainer ">
                    <BsInfoSquare size="22" className="align-top"/>
                  </div>
                  <div className="w-full flex flex-col align-start  ">
                    <div className="modalFieldSpacer" />
                    <TextareaAutosize
                      name="purpose"
                      type="text"
                      ref={register}
                      minRows="1"
                      maxRows="4"
                      spellCheck="false"
                      className={`modalField w-full
                      ${(watch('purpose')===emptyPost?.purpose) && 'text-gray-500' }`}  // Grayed out until edited
                    />
                    <div className="modalFieldSpacer h-1" />
                  </div>
                </div>

                {/* AiOutlineTags size="28"  */}

                {/* Tags field */}
                <div className="px-2 w-full xl:w-1/2  flex flex-row items-start">
                  <div className="iconContainer ">
                    <AiOutlineTags size="28" className="align-top"/>
                  </div>
                  <div className="w-full flex flex-col align-start">
                    <div className="modalFieldSpacer" />
                    <TextareaAutosize
                      name="tags"
                      type="text"
                      ref={register}
                      minRows="1"
                      maxRows="2"
                      spellCheck="false"
                      className={`modalField w-full
                      ${(watch('tags')===emptyPost?.tags) && 'text-gray-500' }`}  // Grayed out until edited
                    />
                    <div className="modalFieldSpacer h-1" />

                  </div>
                </div>

              </div>


              {/* Primary Content Type, Spiciness, Upvotes */}
              <div className="mt-2 px-2 h-12 w-full  flex justify-between ">

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

            {/* <form
              className="mt-4"
              action="/upload"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="">
                <input type="file" name="multi-files" multiple id="input-files" className="" />
              </div>

              <button type="submit" className="">Submit</button>
            </form> */}

            <div className="border-gray-400">
              <RichTextEditor postDraft={postDraft} setPostDraft={setPostDraft} setShowMainModalFooter={setShowMainModalFooter} />
            </div>

          </Modal.Body>

          {showMainModalFooter ?
            <>
              <Modal.Footer className="relative">
                <Button
                  onClick={() => setShowWarningDeleteModal(true)}
                  className="absolute left-2 flex items-center self-start bg-white hover:bg-red-100 border-none text-red-400 
                   hover:text-red-600"
                >
                  Archive Post
                </Button>

                <Button
                  className="self-start bg-white text-blue-600 border-blue-600
                           hover:text-blue-700 hover:border-blue-700 hover:bg-gray-100"
                  onClick={() => {
                    console.log("MainModal.js Clicked Abandon Changes");
                    setShowMainModal(false);
                  }}
                >
                  Abandon Changes
                </Button>

                <Button name="submit" type="submit" ref={register} 
                  className="flex items-center bg-blue-600 hover:bg-blue-700 border-blue-600">
                  Save &amp; Close
                </Button>

              </Modal.Footer>
            </>
            :
            <>
              <Modal.Footer className="relative">
                <Button  className="bg-gray-600 hover:bg-gray-700 border-gray-600">
                    {/* type="submit" */}
                  Exit Text Editor
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
