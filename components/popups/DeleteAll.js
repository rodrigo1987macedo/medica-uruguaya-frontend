import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import Button from "../common/Button";
import Title from "../common/Title";

const cookies = new Cookies();

const DeleteAllWrapper = styled.div`
  width: 400px;
  > div {
    margin: 10px 0;
  }
`;

const Error = styled.div`
  color: ${props => props.theme.colors.error};
`;

const Status = styled.div`
  color: ${props => props.theme.colors.success};
`;

const process = {
  FINISHED: "Proceso terminado",
  ERROR:
    "Error en el servidor. Algunas guardias no han sido borradas, intente correr el proceso de nuevo una vez terminado",
  RUNNING: "Eliminando"
};

function DeleteAll() {
  const [status, setStatus] = useState();
  const [error, setError] = useState();

  function recursiveDeletionChain() {
    axios
      .get(`https://arcane-everglades-49934.herokuapp.com/upload/files`, {
        headers: {
          Authorization: `Bearer ${cookies.get("guards")}`
        }
      })
      .then(res => {
        if (res.data.length !== 0) {
          axios
            .delete(
              `https://arcane-everglades-49934.herokuapp.com/upload/files/${
                res.data[0]._id
              }`,
              {
                headers: {
                  Authorization: `Bearer ${cookies.get("guards")}`
                }
              }
            )
            .then(deleted => {
              setStatus(`${process.RUNNING}: ${deleted.data.name}`);
            })
            .catch(() => {
              setError(process.ERROR);
            })
            .finally(() => recursiveDeletionChain());
        } else {
          setStatus(process.FINISHED);
        }
      })
      .catch(() => setError(process.ERROR));
  }

  return (
    <DeleteAllWrapper>
      <Title
        text="Eliminar guardias"
        explanation="Una vez eliminadas, no podrán recuperarse. Este proceso borrará TODAS las guardias del sistema de manera definitiva"
        tag="h1"
        danger={true}
      />
      <Button
        onClick={() => recursiveDeletionChain()}
        text="Comenzar"
        danger={true}
      />
      <Status>{status}</Status>
      <Error>{error}</Error>
    </DeleteAllWrapper>
  );
}

export default DeleteAll;
