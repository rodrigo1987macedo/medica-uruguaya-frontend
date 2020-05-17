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
    number: "",
    email: "",
    ci: "",
    password: ""
  });
  const [newUserOutput, setNewUserOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastUsers, setLastUsers] = useState({
    number: undefined,
    username: undefined,
    email: undefined,
    ci: undefined,
    updated: undefined,
    created: undefined,
    id: undefined
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
        let username = [];
        let email = [];
        let ci = [];
        let updated = [];
        let created = [];
        let id = [];
        res.data.map(item => {
          number.push(item.number);
          username.push(item.username);
          email.push(item.email);
          ci.push(item.ci);
          updated.push(item.updatedAt);
          created.push(item.createdAt);
          id.push(item._id);
        });
        setLastUsers({
          number,
          username,
          email,
          ci,
          updated,
          created,
          id
        });
      });
  }, [newUserOutput]);

  function createUser(e, newUser) {
    e.preventDefault();
    newUser.password = newUser.ci;
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
            number: "",
            email: "",
            ci: "",
            password: ""
          });
          let document = res.data.file;
          let username = res.data.username;
          let email = res.data.email;
          let ci = res.data.ci;
          let number = res.data.number;
          setNewUserOutput({
            number,
            username,
            email,
            ci,
            document
          });
        })
        .catch(() => setErrorMessage(status.ERROR)),
      "create-user"
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
      <Title text={tabs.USERS.CREATE} tag="h1" />
      <form onSubmit={e => createUser(e, createUserState)}>
        <Input
          name="username"
          badge='Nombre'
          type="text"
          value={createUserState.username}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="email"
          badge='Email'
          type="text"
          value={createUserState.email}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="number"
          badge='Número'
          type="text"
          value={createUserState.number}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="ci"
          badge='Cédula'
          type="text"
          value={createUserState.ci}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Button text={tabs.USERS.CREATE} />
      </form>
      <Loader error={errorMessage} area="create-user" />
      <Title text={tabs.USERS.HISTORY} tag="h2" />
      <Table
        data={[
          { heading: table.NUMBER, content: lastUsers.number },
          { heading: table.NAME, content: lastUsers.username },
          { heading: table.MAIL, content: lastUsers.email },
          { heading: table.CI, content: lastUsers.ci },
          { heading: table.DATE_MOD, content: lastUsers.updated },
          { heading: table.DATE_CRE, content: lastUsers.created },
          { heading: table.ACTIONS, content: lastUsers.id }
        ]}
      />
    </>
  );
}

export default CreateUser;
