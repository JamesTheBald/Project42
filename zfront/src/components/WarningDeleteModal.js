
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

  const modalBackgroundColor = "bg-yellow-200";

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
        <Modal.Header closeButton className={modalBackgroundColor}>
          <Modal.Title>Are you sure you want to delete this post?</Modal.Title>
        </Modal.Header>

        <Modal.Footer className={modalBackgroundColor}>

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
            Delete Post
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarningDeleteModal;
