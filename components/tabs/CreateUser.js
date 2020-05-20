import axios from "axios";
import styled from "styled-components";
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
import FindUser from "./FindUser";

const Br = styled.div`
  width: 100%;
  height: 3px;
  background: ${props => props.theme.colors.process};
  margin: 45px 0 40px 0;
`;

const cookies = new Cookies();

const FetchMore = styled.div`
  text-align: center;
  margin: 30px 0 0 0;
`;

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
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [lastUsers, setLastUsers] = useState({
    number: [],
    username: [],
    email: [],
    ci: [],
    updated: [],
    created: [],
    id: []
  });
  const [fetchedUsersQuantity, setFetchedUserQuantity] = useState(10);

  function fetchMore(from, to) {
    fetchLastUsers(from, to);
    setFetchedUserQuantity(to);
  }

  function fetchLastUsers(from, to) {
    trackPromise(
      axios
        .get(
          `https://arcane-everglades-49934.herokuapp.com/users?_sort=createdAt:desc&_start=${from}&_limit=${to}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("guards")}`
            }
          }
        )
        .then(res => {
          let number = [].concat(from === 0 ? [] : lastUsers.number);
          let username = [].concat(from === 0 ? [] : lastUsers.username);
          let email = [].concat(from === 0 ? [] : lastUsers.email);
          let ci = [].concat(from === 0 ? [] : lastUsers.ci);
          let updated = [].concat(from === 0 ? [] : lastUsers.updated);
          let created = [].concat(from === 0 ? [] : lastUsers.created);
          let id = [].concat(from === 0 ? [] : lastUsers.id);
          res.data.map(item => {
            if (item.number == 1) {
              setCanFetchMore(false);
            }
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
        }),
      "fetch-last"
    );
  }

  useEffect(() => {
    fetchLastUsers(0, fetchedUsersQuantity);
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
      <FindUser onUpdate={() => fetchMore(0, fetchedUsersQuantity)} />
      <Br />
      <Title text={tabs.USERS.CREATE} tag="h1" />
      <form onSubmit={e => createUser(e, createUserState)}>
        <Input
          name="username"
          badge="Nombre"
          type="text"
          value={createUserState.username}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="email"
          badge="Email"
          type="text"
          value={createUserState.email}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="number"
          badge="Número"
          type="text"
          value={createUserState.number}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="ci"
          badge="Cédula"
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
        onUpdate={() => fetchMore(0, fetchedUsersQuantity)}
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
      {canFetchMore && (
        <>
          <FetchMore>
            <Button
              onClick={() =>
                fetchMore(fetchedUsersQuantity, fetchedUsersQuantity + 10)
              }
              text="Cargar más"
            />
          </FetchMore>
          <Loader area="fetch-last" centered={true} />
        </>
      )}
    </>
  );
}

export default CreateUser;
