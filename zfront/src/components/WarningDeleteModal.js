
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
    <div>
      <Modal
        size="sm"
        centered
        animation={false}
        show={showWarningDeleteModal}
        onHide={handleClose}
      >

        <Modal.Body closeButton className="p-6 pt-7 pb-4  flex flex-col border-2 border-gray-600 bg-gray-50 shadow-lg">
          <div className="text-2xl mx-auto text-center font-600 text-yellow-600">
            Are you sure you want to archive this post?
          </div>

          <div className="mt-8 flex flex-row justify-around">
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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WarningDeleteModal;
