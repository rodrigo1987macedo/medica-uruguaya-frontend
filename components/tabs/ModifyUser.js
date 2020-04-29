import axios from "axios";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import Title from "../common/Title";
import { tabs } from "../../constants/tabs";
import Button from "../common/Button";
import Input from "../common/Input";

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
      <Input
        placeholder="Número"
        type="text"
        value={modifyUserState}
        onChange={handleModifyUserChange}
      />
      <Button text='Buscar usuario' onClick={() => modifyUser(getUserState)} />
    </>
  );
}

export default ModifyUser;
