import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BsLock, BsUnlock } from "react-icons/bs";

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
    <Modal {...props} size="lg" centered backdrop="static">
      <Modal.Header className="bg-blue-900">
        <div className="flex w-full justify-between items-center">
          <div className="ml-4 py-2 text-3xl text-white font-roundy font-500">SwarmShare</div>{" "}
          {/* Make this a link to the project's GitHub page */}
          <div className="mr-2 py-2 text-sm lg:text-md text-blue-300  flex flex-col lg:flex-row items-center">
            <div className="pr-1">by James Murphy, Collin</div>
            <div className="pr-2"> Anda &amp; &apos;Yemi Obayemi</div>
          </div>
        </div>
      </Modal.Header> 

      <Modal.Body>
        <div className="text-lg lg:text-xl  flex flex-col  text-center">
          <div className="mt-14 text-2xl lg:text-3xl italic text-gray-700 font-roundy font-500 ">
            <div>Build the swarm, share the learning</div>
          </div>

          <div className="mt-16 text-center font-500 text-blue-700">Instructions</div>

          <div className="ml-8 lg:ml-44 mr-4  text-left text-blue-700">
            <div className="mt-3">Mouse scroll wheel zooms in &amp; out.</div>
            <div className="mt-2">Click-and-drag on the background to move around.</div>
            <div className="mt-2">Click on any post/topic to view or edit it.</div>
            <div className="mt-2">Hold Shift to drag-and-drop posts/topics.</div>
            <div className="mt-6 mb-6 text-md text-gray-600">
              For best performance set browser zoom level to 100%.
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-gray-500">
        <div className="flex flex-row py-2">
          <input
            name="passwordField"
            hidden={hidePasswordField}
            className="p-0.5 pl-3.5 outline-none  rounded-2xl placeholder-gray-600"
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
            <Button disabled={disableExploreButton} className="flex items-center bg-gray-800 border-none ml-2 rounded-lg">
              <div className="mr-2 text-gray-50">Explore</div>
              <BsLock size="18" className="text-gray-50" />
            </Button>
          </div>

          <div name="unlock-button-container" hidden={hideUnlockButton}>
            <Button onClick={props.onHide} className="flex items-center bg-blue-900 text-white border-none ml-6">
              <div className="mr-2">Explore</div>
              <BsUnlock size="18" className="text-white" />
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default WelcomeModal;
