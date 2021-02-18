import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function WelcomeModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <div className="text-3xl">EvolveU Tips and Resources</div>
      </Modal.Header>
      <Modal.Body>
        <div className="text-lg text-center">
          <div className="mt-10 text-xl italic">&quot;The answer to the great question of life the universe and everything is… 42!&quot;</div>
          <div className="mt-2 ml-10">- Supercomputer Deep Thought</div>
          <div className="mt-10 text-blue-800">Click on any post to view or edit its details</div>
          <div className="mt-2 mb-10 text-blue-800">Hover over any field in a post to edit</div>
          <div className="mt-2 mb-10 text-blue-800">Hold Shift to drag any post or topic heading to a new location</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeModal;