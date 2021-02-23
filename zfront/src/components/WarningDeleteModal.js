
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import deletePost from "../functions/deletePost";

const WarningDeleteModal = (props) => {
  const showWarningDeleteModal = props.showWarningDeleteModal;
  const setShowWarningDeleteModal = props.setShowWarningDeleteModal;
  
  const postDraft = props.postDraft;
  const postingsDataArray = props.postingsDataArray;
  const setPostingsDataArray = props.setPostingsDataArray;
  const currPostIndex = props.currPostIndex;
  const setShowMainModal = props.setShowMainModal;
  const creatingPostFlag = props.creatingPostFlag;

  const handleClose = () => setShowWarningDeleteModal(false)
  

  return (
    <div className="bg-orange-200">
      <Modal
        size="sm"
        centered
        animation={false}
        show={showWarningDeleteModal}
        onHide={handleClose}
      >
        <div className="bg-yellow-200 border-gray-400">

          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to archive this post?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>

            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>

            <Button variant="secondary" 
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
              Archive Post
            </Button>

          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default WarningDeleteModal;
