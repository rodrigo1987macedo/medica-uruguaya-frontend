import axios from "axios";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { status } from "../../constants/status";
import { table } from "../../constants/table";
import { tabs } from "../../constants/tabs";
import Button from "../common/Button";
import Input from "../common/Input";
import Loader from "../common/Loader";
import Table from "../common/Table";
import Title from "../common/Title";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

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
        `https://arcane-everglades-49934.herokuapp.com/users?_sort=createdAt:desc`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("guards")}`
          }
        }
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
        .post(`https://arcane-everglades-49934.herokuapp.com/users`, newUser, {
          headers: {
            Authorization: `Bearer ${cookies.get("guards")}`
          }
        })
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
        .catch(() => setErrorMessage(status.ERROR))
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
      <Input
        placeholder="Nombre"
        name="username"
        type="text"
        value={createUserState.username}
        onChange={handleCreateUserChange}
      />
      <Input
        placeholder="Email"
        name="email"
        type="text"
        value={createUserState.email}
        onChange={handleCreateUserChange}
      />
      <Input
        placeholder="Número"
        name="number"
        type="text"
        value={createUserState.number}
        onChange={handleCreateUserChange}
      />
      <Button
        text="Crear Usuario"
        onClick={() => createUser(createUserState)}
      />
      <Loader error={errorMessage} />
      <Title text="Historial de usuarios" tag="h2" />
      <Table
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
