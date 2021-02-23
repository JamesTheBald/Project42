import React from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

const WarningModalLocked = (props) => {
  const showWarningModalLocked = props.showWarningModalLocked;
  const setShowWarningModalLocked = props.setShowWarningModalLocked;
  // const modalCSS = "bg-yellow-200 border-gray-400";

  const handleClose = () => setShowWarningModalLocked(false);

  return (
    <div>
      <Modal
        size="sm"
        centered
        animation={false}
        show={showWarningModalLocked}
        onHide={handleClose}
        backdrop={false}
      >
        <div className="bg-yellow-200 border-gray-400">
          <Modal.Header closeButton>
            <Modal.Title>Locked</Modal.Title>
          </Modal.Header>

          <Modal.Body >
            <div>This item is locked, probably because it is being edited by another user.</div>
            <div className="text-sm text-gray-600 mt-2">Posts are locked against modification by other users for 1 hour after being opened.</div>
          </Modal.Body>

          <Modal.Footer>
            <button className="standardButton" onClick={handleClose}>Close</button>
          </Modal.Footer>

        </div>
      </Modal>

    </div>
  );
};

export default WarningModalLocked;
