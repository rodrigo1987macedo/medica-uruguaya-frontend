import axios from "axios";
import React, { useState, useEffect } from "react";
import { trackPromise } from "react-promise-tracker";
import { tabs } from "../../constants/tabs";
import { Button } from "../../styles/Button";
import { InputText } from "../../styles/InputText";
import Title from "../common/Title";
import History from "../admin/History";
import { table } from "../../constants/table";
import Loader from "../common/Loader";

function CreateUser() {
  const [createUserState, setCreateUserState] = useState({
    username: "",
    email: "",
    number: "",
    password: "not-password-needed"
  });
  const [newUserOutput, setNewUserOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastUsers, setLastUsers] = useState({
    number: undefined,
    username: undefined,
    email: undefined,
    updated: undefined,
    created: undefined
  });

  useEffect(() => {
    axios
      .get(
        `https://arcane-everglades-49934.herokuapp.com/users?_sort=createdAt:desc`
      )
      .then(res => {
        let number = [];
        res.data.map(item => {
          number.push(item.number);
        });
        let username = [];
        res.data.map(item => {
          username.push(item.username);
        });
        let email = [];
        res.data.map(item => {
          email.push(item.email);
        });
        let updated = [];
        res.data.map(item => {
          updated.push(item.updatedAt);
        });
        let created = [];
        res.data.map(item => {
          created.push(item.createdAt);
        });
        setLastUsers({
          number,
          username,
          email,
          updated,
          created
        });
      });
  }, [newUserOutput]);

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
      <Loader error={errorMessage} />
      <Title text="Historial de usuarios" tag="h2" />
      <History
        data={[
          { heading: table.NUMBER, content: lastUsers.number },
          { heading: table.NAME, content: lastUsers.username },
          { heading: table.MAIL, content: lastUsers.email },
          { heading: table.DATE_MOD, content: lastUsers.updated },
          { heading: table.DATE_CRE, content: lastUsers.created }
        ]}
      />
    </>
  );
}

export default CreateUser;
