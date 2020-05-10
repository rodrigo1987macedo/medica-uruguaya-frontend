import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import Buton from "../common/Button";

function PopUp({ children, buttonText, secondary }) {
  const [state, setState] = useState(false);

  function togglePopUp() {
    setState(!state);
  }

  return (
    <>
      <Buton onClick={togglePopUp} text={buttonText} secondary={secondary} />
      <Modal open={state} onClose={togglePopUp} center>
        {children}
      </Modal>
    </>
  );
}

export default PopUp;
