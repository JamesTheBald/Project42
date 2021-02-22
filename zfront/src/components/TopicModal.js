import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import WarningModalEdits from "./WarningModalEdits";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrSave } from "react-icons/gr";
import { BsArrowCounterclockwise } from "react-icons/bs";
import submitTopic from "../functions/submitTopic";
import deleteTopic from "../functions/deleteTopic";
import unlockTopic from "../functions/unlockTopic";


const TopicModal = (props) => {
  const emptyTopic = props.emptyTopic;
  let currTopicIndex = props.currTopicIndex;
  let showTopicModal = props.showTopicModal;
  const setShowTopicModal = props.setShowTopicModal;
  let topicsDataArray = props.topicsDataArray;
  const setTopicsDataArray = props.setTopicsDataArray;
  let topicDraft = props.topicDraft;
  const setTopicDraft = props.setTopicDraft;
  let creatingTopicFlag = props.creatingTopicFlag;
  const recdLog=props.recdLog;


  const [showWarningModalEdits, setshowWarningModalEdits] = useState(false);
  let madeEdits = useRef();

  useEffect(() => {
    madeEdits.current = false;
  }, []);

  console.log("TopicModal.js Begins.");
  recdLog && console.log("TopicModal.js: topicDraft=", topicDraft);


  const handleInputChange = (evnt) => {
    madeEdits.current = true;
    console.log("handleInputChange madeEdits.current =", madeEdits.current);

    console.log("TopicModal handleInputChange event=", evnt);
    const { name, value } = evnt.target;

    setTopicDraft((currDraft) => {
      const newTopicDraft = { ...currDraft, [name]: value };
      // Brackets [] around 'name' are so the VALUE of name is used for the key and not just the string 'name'.
      console.log("TopicModal.js: handleInputChange: setting topicDraft to", newTopicDraft);
      return newTopicDraft;
    });
  };


  const safeModalHide = (madeEdits) => {
    console.log("safeModalHide madeEdits.current =", madeEdits.current);

    if (madeEdits.current) {
      console.log("safeModalHide warning issued, showing WarningModalEdits", madeEdits.current);
      setshowWarningModalEdits(true);
    } else {
      setShowTopicModal(false);
    }
    unlockTopic(topicDraft, currTopicIndex, recdLog);
  };

  const changeContentType = (passedContentType) => {
    setTopicDraft((currDraft) => {
      const newTopicDraft = { ...currDraft, topicLevel: passedContentType };
      return newTopicDraft;
   });
  };


  return (
    <>
      <Modal
        size="md"  // Large is size of MainModal. Leave this out for size Medium
        centered
        show={showTopicModal}
        animation={false}
        onHide={() => {
          safeModalHide(madeEdits);
        }}
      >
        <Modal.Body>
          <div>

            <div className="flex items-center">

              <div className="text-xl font-500 mx-3">Topic Hierarchy Level:</div>

              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="px-3 mx-2 my-2 text-lg text-gray-800 bg-gray-200 border border-gray-700 rounded-lg shadow-sm">
                  {(topicDraft.topicLevel === "") ?
                    <>Topic Hierarchy Level</>
                    :
                    <>{topicDraft.topicLevel}</>
                  }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {changeContentType("Main Topic")}}>Main Topic</Dropdown.Item>
                  <Dropdown.Item onClick={() => {changeContentType("Sub-Topic")}}>Sub-Topic</Dropdown.Item>
                  <Dropdown.Item onClick={() => {changeContentType("Sub-Sub-Topic")}}>Sub-Sub-Topic</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <input
              name="topic"
              type="text"
              className="text-xl w-full mx-2 mt-3 p-1 font-500 focus:bg-gray-200 hover:bg-gray-200"
              placeholder="Click to enter title here"
              value={topicDraft.topic}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="px-3 py-1 mx-2 bg-gray-200 border border-gray-700 rounded-lg shadow-sm"
            onClick={() => {
              console.log("TopicModal.js Clicked Abandon Changes");
              setShowTopicModal(false);
            }}>
            <div className="flex flex-row items-center">
              <BsArrowCounterclockwise className="text-lg"/>
              <div className="pl-2 py-1">Abandon Changes</div>
            </div>
          </button>

          <button
            className="px-3 py-1 mx-2 bg-gray-200 border border-gray-700 rounded-lg shadow-sm"
            onClick={() => {
              deleteTopic(
                topicDraft,
                topicsDataArray,
                setTopicsDataArray,
                currTopicIndex,
                setShowTopicModal,
                creatingTopicFlag
              );
            }}>
            <div className="flex flex-row items-center">
              <FaRegTrashAlt/>
              <div className="pl-2 py-1">Delete Topic</div>
            </div>
          </button>

          <button
            className="px-3 py-1 mx-2 bg-gray-200 border border-gray-700 rounded-lg shadow-sm"
            onClick={() => {
              submitTopic(
                emptyTopic,
                topicDraft,
                topicsDataArray,
                setTopicsDataArray,
                currTopicIndex,
                setShowTopicModal,
                creatingTopicFlag,
                recdLog
              );
            }}>
            <div className="flex flex-row items-center">
              <GrSave/>
              <div className="pl-2 py-1">Save Changes</div>
            </div>
          </button>
        </Modal.Footer>

        <WarningModalEdits showWarningModalEdits={showWarningModalEdits} setshowWarningModalEdits={setshowWarningModalEdits} />
      </Modal>
    </>
  );
};

export default TopicModal;
