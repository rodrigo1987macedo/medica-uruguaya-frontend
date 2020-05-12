import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import Buton from "../common/Button";
import styled from "styled-components";

const BaseModal = styled.div`
  width: 600px;
  height: 200px;
  // height: 80vh;
  overflow-y: scroll;
  padding: 5px;
`;

function PopUp({ children, buttonText, secondary, onClose }) {
  const [state, setState] = useState(false);

  function togglePopUp() {
    if (onClose) {
      onClose();
    }
    setState(!state);
  }

  return (
    <>
      <Buton onClick={togglePopUp} text={buttonText} secondary={secondary} />
      <Modal open={state} onClose={togglePopUp} center>
        <BaseModal>{children}</BaseModal>
      </Modal>
    </>
  );
}

export default PopUp;
