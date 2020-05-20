import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import Button from "../common/Button";
import Title from "../common/Title";
import PopUp from "../common/PopUp";
import SafeGuard from "../common/SafeGuard";
import Loader from "../common/Loader";
import { trackPromise } from "react-promise-tracker";

const cookies = new Cookies();

const Warning = styled.div`
  color: ${props => props.theme.colors.error};
`;

const process = {
  FINISHED: "Funcionario eliminado",
  ERROR: "Ha ocurrido un error",
  RUNNING: "Eliminando..."
};

function DeleteOne({ id, onUpdate }) {
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  function resetState() {
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  function deleteOne() {
    trackPromise(
      axios
        .delete(`https://arcane-everglades-49934.herokuapp.com/users/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("guards")}`
          }
        })
        .then(() => {
          setErrorMessage(null);
          setSuccessMessage(process.FINISHED);
          onUpdate();
        })
        .catch(() => {
          setErrorMessage(process.ERROR);
          setSuccessMessage(null);
        }),
      "delete-one"
    );
  }

  return (
    <PopUp
      buttonIcon="trash"
      secondary={true}
      onClose={resetState}
      small={true}
    >
      <Title
        text="Eliminar Funcionario"
        explanation="Este proceso eliminará el funcionario del sistema de manera definitiva"
        tag="h1"
        danger={true}
      />
      <SafeGuard>
        <Button
          onClick={() => deleteOne()}
          danger={true}
          text="Eliminar funcionario"
        />
        <Loader
          area="delete-one"
          success={successMessage}
          error={errorMessage}
        />
      </SafeGuard>
    </PopUp>
  );
}

export default DeleteOne;
