import React, { useState } from "react";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import Loader from "../common/Loader";
import Title from "../common/Title";
import { tabs } from "../../constants/tabs";
import { InputText } from "../../styles/InputText";
import { Button } from "../../styles/Button";

function CreateUser() {
  const [createUserState, setCreateUserState] = useState({
    username: "",
    email: "",
    number: "",
    password: "not-password-needed"
  });
  const [newUserOutput, setNewUserOutput] = useState(null);

  function createUser(newUser) {
    trackPromise(
      axios
        .post(`https://arcane-everglades-49934.herokuapp.com/users`, newUser)
        .then(res => {
          setCreateUserState({
            username: "",
            email: "",
            number: "",
            password: "not-password-needed"
          });
          setNewUserOutput(res)
          console.log(res);
        })
    );
  }

  function handleCreateUserChange(event) {
    setCreateUserState({
      ...createUserState,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <Title text={tabs.CREATE} />
      <div>
        <InputText
          placeholder="Nombre"
          name="username"
          type="text"
          value={createUserState.username}
          onChange={handleCreateUserChange}
        />
        <InputText
          placeholder="Email"
          name="email"
          type="text"
          value={createUserState.email}
          onChange={handleCreateUserChange}
        />
        <InputText
          placeholder="Número"
          name="number"
          type="text"
          value={createUserState.number}
          onChange={handleCreateUserChange}
        />
        <Button onClick={() => createUser(createUserState)}>
          Crear usuario
        </Button>
      </div>
      <Loader />
    </>
  );
}

export default CreateUser;
