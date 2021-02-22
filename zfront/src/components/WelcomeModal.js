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
      <Modal.Header className="bg-blue-900">
        <div className="flex w-full justify-between items-center">
          <div className="text-3xl text-white ml-2">Project 42</div>
          <div className="text-sm text-blue-300 mr-2">by James Murphy, Collin Anda &amp; Yemi Obayemi</div>
        </div>
      </Modal.Header>


      <Modal.Body>
        <div className="text-lg text-center">
          <div className="mt-10 text-xl italic">&quot;The answer to the great question of life the universe and everything is… 42!&quot;</div>
          <div className="mt-4 text-md text-right mr-16">- Supercomputer Deep Thought</div>

          <div className="text-left text-blue-700">
            <div className="mt-12 text-xl font-500 ml-12 ">Instructions</div>
            <div className="mt-3 ml-24">Use your mouse scroll wheel to zoom in &amp; out, and click-n-drag to pan.</div>
            <div className="mt-2 ml-24">Click on a post to view or edit it. Click on a field to edit it.</div>
            <div className="mt-2 ml-24 mb-10">Hold Shift to drag any post or topic heading to a new location</div>
          </div>
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