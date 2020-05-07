import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

function PopUp({ children }) {
  const [state, setState] = useState(true);

  function togglePopUp() {
    setState(!state);
  }

  return (
    <div>
      <button onClick={togglePopUp}>Verificar alcance</button>
      <Modal open={state} onClose={togglePopUp} center>
        {children}
      </Modal>
    </div>
  );
}

export default PopUp;
