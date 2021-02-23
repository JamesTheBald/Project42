
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import deleteTopic from "../functions/deleteTopic";

const WarningTopicDeleteModal = (props) => {
  const showWarningTopicDeleteModal = props.showWarningTopicDeleteModal;
  const setShowWarningTopicDeleteModal = props.setShowWarningTopicDeleteModal;
  const topicDraft = props.topicDraft;
  // const setTopicDraft = props.setTopicDraft
  const topicsDataArray = props.topicsDataArray;
  const setTopicsDataArray = props.setTopicsDataArray;
  const currTopicIndex = props.currTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const creatingTopicFlag = props.creatingTopicFlag;

  const modalBackgroundColor = "bg-yellow-200";

  const handleClose = () => setShowWarningTopicDeleteModal(false)
  

  return (
    <div className="bg-orange-200">
      <Modal
        size="sm"
        centered
        animation={false}
        show={showWarningTopicDeleteModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton className={modalBackgroundColor}>
          <Modal.Title>Are you sure you want to archive this topic?</Modal.Title>
        </Modal.Header>

        <Modal.Footer className={modalBackgroundColor}>

          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="secondary" 
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
            Archive Topic
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarningTopicDeleteModal;
