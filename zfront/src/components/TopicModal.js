import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import WarningModal from "./WarningModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrSave } from "react-icons/gr";
import { BsArrowCounterclockwise } from "react-icons/bs";
import submitTopic from "../functions/submitTopic";
import deleteTopic from "../functions/deleteTopic";


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


  const [showWarningModal, setShowWarningModal] = useState(false);
  let madeEdits = useRef();

  useEffect(() => {
    madeEdits.current = false;
  }, []);

  console.log("TopicModal.js Begins.");
  // console.log("TopicModal.js: topicDraft=", topicDraft);


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
      console.log("safeModalHide warning issued, showing WarningModal", madeEdits.current);
      setShowWarningModal(true);
    } else {
      setShowTopicModal(false);
    }
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
        // size="sm"
        centered
        show={showTopicModal}
        animation={false}
        onHide={() => {
          safeModalHide(madeEdits);
        }}>
        <Modal.Body>
          <div>

            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
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

            <input
              name="topic"
              type="text"
              className="text-xl w-full p-1 font-500 focus:bg-gray-200 hover:bg-gray-200"
              placeholder="Click to enter title here"
              value={topicDraft.topic}
              onChange={handleInputChange}
            />

          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              console.log("TopicModal.js Clicked Abandon Changes");
              setShowTopicModal(false);
            }}>
            Abandon Changes <BsArrowCounterclockwise></BsArrowCounterclockwise>
          </Button>

          <Button
            variant="danger"
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
            Delete Topic<FaRegTrashAlt></FaRegTrashAlt>
          </Button>

          <Button
            type="submit"
            onClick={() => {
              submitTopic(
                emptyTopic,
                topicDraft,
                topicsDataArray,
                setTopicsDataArray,
                currTopicIndex,
                setShowTopicModal,
                creatingTopicFlag
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

export default TopicModal;
