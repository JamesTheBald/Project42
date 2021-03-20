
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import deleteTopic from "../functions/deleteTopic";

const WarningTopicDeleteModal = (props) => {
  const showWarningTopicDeleteModal = props.showWarningTopicDeleteModal;
  const setShowWarningTopicDeleteModal = props.setShowWarningTopicDeleteModal;
  const topicDraft = props.topicDraft;
  const topicsDataArray = props.topicsDataArray;
  const setTopicsDataArray = props.setTopicsDataArray;
  const currTopicIndex = props.currTopicIndex;
  const setShowTopicModal = props.setShowTopicModal;
  const creatingTopicFlag = props.creatingTopicFlag;

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
        <Modal.Body className="p-6 pt-7 pb-4  flex flex-col border-2 border-gray-600 bg-gray-50 shadow-lg">
          <div className="text-2xl mx-auto text-center font-600 text-yellow-600">
            Are you sure you want to archive this topic?
          </div>

          <div className="mt-8 flex flex-row justify-around">
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
          </div>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WarningTopicDeleteModal;
