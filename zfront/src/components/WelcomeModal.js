import React, { useState, useRef } from "react";
// import button from "react-bootstrap/Button";
import ReactModal from "react-modal";
// import Modal from "react-bootstrap/Modal";
import { BsLock, BsUnlock } from "react-icons/bs";

function WelcomeModal(props) {
  console.log("WelcomeModal component invoked");

  let showWelcomeModal = props.showWelcomeModal;
  const onHide = props.onHide;

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
    console.log("WelcomeModal.js hideLockButton=", hideLockButton, "hideUnlockButton=", hideUnlockButton);
  };

  // console.log("window.innerWidth=", window.innerWidth, "window.innerHeight=", window.innerHeight);

  return (
    <ReactModal
      isOpen={showWelcomeModal}
      onRequestClose={onHide}
      ariaHideApp={false}
      overlayClassName="absolute left-1/2 top-48"
      className="w-120 lg:w-180  relative -left-1/2 bg-gray-50 rounded-xl focus:outline-none"
    >
      {/* Modal header */}
      <div className="p-6 flex w-full justify-between items-center lg:items-baseline bg-indigo-background rounded-t-xl">
        <div className="ml-4 py-2 text-3xl text-white font-roundy font-500">SwarmShare</div>
        <div className="mr-2 py-2 text-sm lg:text-md text-yellow-200  flex flex-col lg:flex-row items-center">
          <div className="pr-1">by James Murphy</div>
          <div> &amp; Collin Anda</div>
        </div>
      </div>

      {/* Modal body */}
      <div className="text-md lg:text-lg  flex flex-col  text-center text-gray-800">
        <div className="mt-14 text-2xl lg:text-3xl italic   font-roundy font-500 ">
          <div>Sharing the swarm of learnings</div>
        </div>

        <div className="mt-16 text-center font-500 text-gray-800">Instructions</div>

        <div className="ml-8 lg:ml-44 mr-4  text-left opacity-70">
          <div className="mt-4">Mouse scroll wheel zooms in &amp; out.</div>
          <div className="mt-2">Click-and-drag on the background to move around.</div>
          <div className="mt-2">Click on any post/topic to view or edit it.</div>
          <div className="mt-2">Hold Shift to drag-and-drop posts/topics.</div>
          <div className="mt-6 mb-8 text-md text-gray-600">For best performance set browser zoom level to 100%.</div>
        </div>
      </div>
      {/* <Modal.Footer */}
      <div className="h-20 py-2 flex flex-row justify-end items-center bg-indigo-gray rounded-b-xl">
        <input
          name="passwordField"
          hidden={hidePasswordField}
          className="px-3 py-1.5 outline-none  rounded-xl placeholder-gray-600"
          placeholder={placeholder}
          type="password"
          required
          onChange={(event) => handlePasswordChange(event)}
          onClick={() => setPlaceholder("")}
          onBlur={() => setPlaceholder("Password")}
        />

        <div disabled={disableExploreButton} hidden={hideLockButton}>
          <button className="ml-4 mr-8 px-2 py-1.5  flex items-center text-gray-50 bg-gray-700 rounded-lg outline-none">
            <div>Explore</div>
            <BsLock size="18" className="ml-2" />
          </button>
        </div>

        <div hidden={!hideLockButton} onClick={props.onHide}>
          <button
            className="ml-4 mr-8 px-2 py-1.5  flex items-center text-yellow-200 bg-indigo-background rounded-lg outline-none"
          >
            <div>Explore</div>
            <BsUnlock size="18" className="ml-2" />
          </button>
        </div>

      </div>      
    </ReactModal>
  )
}

export default WelcomeModal;
