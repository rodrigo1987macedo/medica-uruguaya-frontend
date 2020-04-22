import axios from "axios";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { tabs } from "../../constants/tabs";
import { Button } from "../../styles/Button";
import { ErrorMessage } from "../../styles/ErrorMessage";
import { InputText } from "../../styles/InputText";
import Loader from "../common/Loader";
import Title from "../common/Title";
import UserData from "../common/UserData";
import History from "../admin/History";
import { table } from '../../constants/table'

function CreateUser() {
  const [createUserState, setCreateUserState] = useState({
    username: "",
    email: "",
    number: "",
    password: "not-password-needed"
  });
  const [newUserOutput, setNewUserOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
          let document = res.data.file;
          let username = res.data.username;
          let email = res.data.email;
          let number = res.data.number;
          setNewUserOutput({
            number,
            username,
            email,
            document
          });
        })
        .catch(() => setErrorMessage("Ha ocurrido un error"))
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
      <Title text={tabs.CREATE} tag="h1" />
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
      <Button onClick={() => createUser(createUserState)}>Crear usuario</Button>
      <Loader />
      {newUserOutput && <UserData userData={newUserOutput} />}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <Title text="Últimos usuarios creados" tag="h2" />
    </>
  );
}
// <History
// content={[
// { heading: table.FILES, content: filesToBeLoaded },
// { heading: table.STATE, cotent: filesToBeLoadedStatus }
// ]}
// />

export default CreateUser;
