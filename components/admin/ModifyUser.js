import axios from "axios";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import Title from "../common/Title";
import { tabs } from "../../constants/tabs";
import { Button } from "../../styles/Button";
import { InputText } from "../../styles/InputText";

function ModifyUser() {
  const [modifyUserState, setModifyUserState] = useState("");

  function modifyUser(employeeNumber) {
    trackPromise(
      axios
        .get(
          `https://arcane-everglades-49934.herokuapp.com/users?number=${employeeNumber}`
        )
        .then(res => {
          let result = res.data[0].file.url;
          setGetUserState(result);
        })
    );
  }

  function handleModifyUserChange(event) {
    setGetUserState(event.target.value);
  }

  return (
    <>
      <Title text={tabs.MODIFY} tag="h1" />
      <InputText
        placeholder="Número"
        type="text"
        value={modifyUserState}
        onChange={handleModifyUserChange}
      />
      <Button onClick={() => modifyUser(getUserState)} button>
        Buscar usuario
      </Button>
    </>
  );
}

export default ModifyUser;
