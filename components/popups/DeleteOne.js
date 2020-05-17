import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import Button from "../common/Button";
import Title from "../common/Title";
import PopUp from "../common/PopUp";
import SafeGuard from "../common/SafeGuard";

const cookies = new Cookies();

const Results = styled.div`
  min-height: 60px;
  > div {
    margin: 10px 0;
  }
`;

const Warning = styled.div`
  color: ${props => props.theme.colors.error};
`;

const Status = styled.div`
  color: ${props => props.theme.colors.success};
`;

const process = {
  FINISHED: "Funcionario eliminado",
  ERROR: "Ha ocurrido un error",
  RUNNING: "Eliminando..."
};

function DeleteOne({ id }) {
  const [status, setStatus] = useState();
  const [error, setError] = useState();

  function resetState() {
    setStatus(null);
    setError(null);
  }

  function deleteOne() {
    setStatus("Procesando...");
    axios
      .delete(`https://arcane-everglades-49934.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.get("guards")}`
        }
      })
      .then(() => setStatus(process.FINISHED))
      .catch(() => {
        setStatus(null);
        setError(process.ERROR);
      });
  }

  return (
    <PopUp
      buttonIcon='trash'
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
          text='Eliminar funcionario'
        />
        <Results>
          <Status>{status}</Status>
          <Warning>{error}</Warning>
        </Results>
      </SafeGuard>
    </PopUp>
  );
}

export default DeleteOne;
