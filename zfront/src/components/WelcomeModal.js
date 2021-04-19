import React, { useState, useRef } from "react";
// import button from "react-bootstrap/Button";
import ReactModal from "react-modal";
// import Modal from "react-bootstrap/Modal";
import { BsLock, BsUnlock } from "react-icons/bs";
import { CgScrollV } from "react-icons/cg";
import { BiMouseAlt } from "react-icons/bi";
import { GiArrowCursor } from "react-icons/gi";
import { ImShift } from "react-icons/im";

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
      className="w-110 xl:w-180  relative -left-1/2 bg-gray-100 rounded-xl shadow-2xl focus:outline-none"
    >
      {/* Modal header */}
      <div className="p-6 flex w-full justify-between items-center xl:items-baseline bannerColor rounded-t-xl">
        <div className="ml-4 py-2 text-3xl text-white font-roundy font-500">SwarmShare</div>
        <div className="mr-2 py-2 text-sm xl:text-md text-yellow-200  flex flex-col xl:flex-row items-center">
          <div className="pr-1">by James Murphy</div>
          <div> &amp; Collin Anda</div>
        </div>
      </div>

      {/* Modal body */}
      <div className="text-md xl:text-lg  flex flex-col  text-center">
        <div className="mt-14 xl:mt-20 text-3xl xl:text-4xl text-indigo-800 font-roundy font-700"
          // style={{textShadow: "1.2px 1.2px 3px #aaaaaa"}}
        >
          Share the Learning
        </div>

        <div className="ml-16 xl:ml-48 mt-14 xl:mt-18 mr-4  text-left text-gray-800 opacity-70">
          <div className="flex flex-row items-center">
            <CgScrollV size="22" />
            <div className="ml-4">mouse scroll wheel zooms in &amp; out</div>
          </div>

          <div className="mt-3 flex flex-row items-center">
            <BiMouseAlt size="22" />
            <div className="ml-4">click-and-drag background to pan</div>
          </div>

          <div className="mt-3 -ml-5 flex flex-row items-center">
            <ImShift size="22" />
            <BiMouseAlt size="22" />
            <div className="ml-3.5">shift + click-and-drag to move posts/topics</div>
          </div>

          <div className="mt-3 flex flex-row items-center">
            <GiArrowCursor size="20" className="ml-1"/>
            <div className="ml-3.5">click posts/topics to view or edit</div>
          </div>
          
          <div className="mt-4 mb-10 -ml-2 text-sm xl:text-md text-gray-600">For best performance set browser zoom level to 100%</div>
        </div>
      </div>
      {/* <Modal.Footer */}
      <div className="h-20 py-2 flex flex-row justify-end items-center rounded-b-xl"
        style={{background: "#4f4f7c"}}
      >
        <input
          name="passwordField"
          hidden={hidePasswordField}
          className="px-3 py-1.5 w-32  outline-none  rounded-xl text-gray-800 placeholder-gray-600 bg-gray-300"
          placeholder={placeholder}
          type="password"
          required
          onChange={(event) => handlePasswordChange(event)}
          onClick={() => setPlaceholder("")}
          onBlur={() => setPlaceholder("Password")}
        />

        <div className="ml-4 mr-4 xl:mr-8">

          <div disabled={disableExploreButton} hidden={hideLockButton}>
            <button className="px-2 py-1.5  text-gray-50 bg-gray-800  flex items-center rounded-lg outline-none">
              <div>Explore</div>
              <BsLock size="18" className="ml-2" />
            </button>
          </div>

          <div hidden={!hideLockButton} onClick={props.onHide}>
            <button
              className="px-2 py-1.5  text-yellow-200 backgroundColor  flex items-center rounded-lg outline-none"
            >
              <div>Explore</div>
              <BsUnlock size="18" className="ml-2" />
            </button>
          </div>
        </div>
      </div>      
    </ReactModal>
  )
}

export default WelcomeModal;
