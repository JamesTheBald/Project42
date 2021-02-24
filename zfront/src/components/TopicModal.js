import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import WarningModalEdits from "./WarningModalEdits";
import submitTopic from "../functions/submitTopic";
// import deleteTopic from "../functions/deleteTopic";
import unlockTopic from "../functions/unlockTopic";
import WarningTopicDeleteModal from "./WarningTopicDeleteModal";


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
  const [showWarningTopicDeleteModal, setShowWarningTopicDeleteModal] = useState(false);
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

  const changeTopicHierarchy = (passedContentType) => {
    setTopicDraft((currDraft) => {
      const newTopicDraft = { ...currDraft, topicLevel: passedContentType };
      return newTopicDraft;
   });
  };


  return (
    <>
      <Modal
        size="lg"  // Large is size of MainModal. Leave this out for size Medium
        centered
        show={showTopicModal}
        animation={false}
        onHide={() => {
          safeModalHide(madeEdits);
        }}
      >
        <Modal.Body className="p-4">
          <div name="dropdown-title-container" className="flex flex-col">
            
            <div className="flex items-center">
              <div className="mr-4 text-xl">Hierarchy Level:</div>
              <Dropdown>
                <Dropdown.Toggle size="sm" id="dropdown-basic" className="text-xl text-blue-600 flex items-center rounded-lg bg-white border-none">
                  {(topicDraft.topicLevel === "") ?
                    <>Topic Hierarchy Level</>
                    :
                    <>{topicDraft.topicLevel}</>
                  }
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {changeTopicHierarchy("Main Topic")}}>Main Topic</Dropdown.Item>
                  <Dropdown.Item onClick={() => {changeTopicHierarchy("Sub-Topic")}}>Sub-Topic</Dropdown.Item>
                  <Dropdown.Item onClick={() => {changeTopicHierarchy("Sub-Sub-Topic")}}>Sub-Sub-Topic</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <input
              name="topic"
              type="text"
              className="text-2xl w-full mb-2 p-2 pl-4 outline-none rounded-lg font-500 bg-gray-200"
              placeholder="Click to enter topic title here"
              value={topicDraft.topic}
              onChange={handleInputChange}
            />

          </div>
        </Modal.Body>

        <Modal.Footer className="flex-nowrap relative">
          <Button
            className="flex items-center bg-white hover:bg-red-100 border-none absolute left-2"
            onClick={() => setShowWarningTopicDeleteModal(true)}
          >
            <div className="text-red-400 hover:text-red-600">Archive Topic</div>
          </Button>

          <Button
            className="flex items-center bg-white hover:bg-gray-100 border-blue-600 hover:border-blue-700 opacity-70 hover:opacity-100"
            onClick={() => {
              console.log("TopicModal.js Clicked Abandon Changes");
              setShowTopicModal(false);
            }}
          >
            <div className="text-blue-700">Abandon Changes</div>
          </Button>

          <Button
            className="flex items-center bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
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
            }}
          >
            Save Changes
          </Button>

        </Modal.Footer>

        <WarningModalEdits showWarningModalEdits={showWarningModalEdits} setshowWarningModalEdits={setshowWarningModalEdits} />

        <WarningTopicDeleteModal 
          showWarningTopicDeleteModal={showWarningTopicDeleteModal}
          setShowWarningTopicDeleteModal={setShowWarningTopicDeleteModal}
          topicDraft={topicDraft}
          // setTopicDraft={setTopicDraft}   
          topicsDataArray={topicsDataArray}
          setTopicsDataArray={setTopicsDataArray}
          currTopicIndex={currTopicIndex}
          setShowTopicModal={setShowTopicModal}
          creatingTopicFlag={creatingTopicFlag}
        />

      </Modal>
    </>
  );
};

export default TopicModal;