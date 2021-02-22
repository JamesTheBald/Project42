import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const WarningModalLocked = (props) => {
  const showWarningModalLocked = props.showWarningModalLocked;
  const setShowWarningModalLocked = props.setShowWarningModalLocked;
  const modalBackgroundColor = "bg-yellow-200";

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
        <Modal.Header closeButton className={modalBackgroundColor}>
          <Modal.Title>Locked</Modal.Title>
        </Modal.Header>

        <Modal.Body className={modalBackgroundColor}>This item is locked, probably because it is being edited by another user.</Modal.Body>
        <Modal.Footer className={modalBackgroundColor}>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarningModalLocked;
