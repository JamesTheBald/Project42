import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsLock, BsUnlock } from 'react-icons/bs';


function WelcomeModal(props) {

  const password = useRef("");
  const [disableExploreButton, setDisableExploreButton] = useState(true);
  const [hideLockButton, setHideLockButton] = useState(false);
  const [hideUnlockButton, setHideUnlockButton] = useState(true);
  const [placeholder, setPlaceholder] = useState("Password");
  const [hidePasswordField, setHidePasswordField] = useState(false);


  const handlePasswordChange = (event) => {
    password.current = event.target.value;
    if (password.current === "Secret") {
      setDisableExploreButton(false);
      setHidePasswordField(true);
      setHideLockButton(true);
      setHideUnlockButton(false);
    }
  };


  return (
    <Modal
      {...props}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header className="bg-blue-900 text-white">
        <div>
          <p className="text-3xl">EvolveU Tips and Resources</p>
        </div>
      </Modal.Header>


      <Modal.Body>
        <div className="text-lg text-center">
          <div className="mt-10 text-blue-800">Click on any post to view or edit its details</div>
          <div className="mt-2 mb-10 text-blue-800">Hover over any field in a post to edit</div>
          <div className="mt-2 mb-10 text-blue-800">Hold Shift to drag any post or topic heading to a new location</div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <input
          name="passwordField"
          hidden={hidePasswordField}
          className="p-0.5 pl-3.5 outline-none border border-blue-900 rounded-2xl placeholder-gray-400"
          placeholder={placeholder}
          type="password"
          required
          onChange={(event) => handlePasswordChange(event)}
          onClick={() => setPlaceholder("")}
          onBlur={() => setPlaceholder("Password")}
        />

        <div
          name="lock-button-container" // the button needs a container to be hidden, Bootstrap doesn't have a hidden attribute
          hidden={hideLockButton}
        >
          <Button
            disabled={disableExploreButton}
            className="flex items-center bg-gray-400 border-none ml-2"
          >
            <div className="mr-2">Explore</div>
            <BsLock size="18" className="text-blue-900"/>
          </Button>
        </div>

        <div
          name="unlock-button-container"
          hidden={hideUnlockButton}
        >
          <Button
            onClick={props.onHide}
            className="flex items-center bg-blue-900 text-white border-none ml-6"
          >
            <div className="mr-2">Explore</div>
            <BsUnlock size="18" className="text-white"/>
          </Button>

        </div>
        <Button
            onClick={props.onHide}
            className="float-left"
          >
            Dev Bypass
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeModal;