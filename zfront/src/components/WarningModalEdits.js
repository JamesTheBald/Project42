import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const WarningModalEdits = (props) => {
  const showWarningModalEdits = props.showWarningModalEdits;
  const setshowWarningModalEdits = props.setshowWarningModalEdits;

  const handleClose = () => setshowWarningModalEdits(false);

  return (
    <div>
      <Modal
        size="sm"
        centered
        animation={false}
        show={showWarningModalEdits}
        onHide={handleClose}
      >
        <Modal.Body className="p-6 pt-7 pb-4  flex flex-col border-2 border-gray-600 bg-gray-50 shadow-lg">
          <div className="text-2xl mx-auto text-center font-600 text-yellow-600">
            Warning - You have unsaved changes
          </div>

          <div className="py-4 text-lg text-gray-600 font-500 text-center">
            Please select Abandon, Archive or Save &amp; Close
          </div>

          <Button variant="secondary" onClick={handleClose} className="ml-auto">
            Close
          </Button>

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WarningModalEdits;
