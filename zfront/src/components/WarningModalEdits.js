import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const WarningModalEdits = (props) => {
  const showWarningModalEdits = props.showWarningModalEdits;
  const setshowWarningModalEdits = props.setshowWarningModalEdits;
  const modalBackgroundColor = "bg-yellow-200";

  const handleClose = () => setshowWarningModalEdits(false);

  return (
    <div className="bg-yellow-200 border-gray-400">
      <Modal
        size="sm"
        centered
        animation={false}
        show={showWarningModalEdits}
        onHide={handleClose}
      >
        <Modal.Header closeButton className={modalBackgroundColor}>
          <Modal.Title>Warning - You have unsaved changes!</Modal.Title>
        </Modal.Header>

        <Modal.Body className={modalBackgroundColor}>Please select Abandon, Delete or Save</Modal.Body>
        <Modal.Footer className={modalBackgroundColor}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WarningModalEdits;
