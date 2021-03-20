import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const WarningModalLocked = (props) => {
  const showWarningModalLocked = props.showWarningModalLocked;
  const setShowWarningModalLocked = props.setShowWarningModalLocked;

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
        <div>
 
          <Modal.Body className="px-8 pt-7 pb-4  flex flex-col border-2 border-gray-600 bg-gray-50 shadow-sm">
          <div className="text-2xl mx-auto text-center font-600 text-yellow-600">
            Locked
          </div>

          <div className="mt-3 font-500">This item is locked, probably because it is being edited by another user.</div>
          <div className="mt-3 text-sm text-gray-600">Posts are locked against modification by other users for 1 hour from the time that they are opened.</div>

          <Button variant="secondary" onClick={handleClose} className="mt-2 ml-auto">
            Close
          </Button>

          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default WarningModalLocked;
