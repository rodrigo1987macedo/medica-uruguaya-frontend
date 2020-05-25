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
  //
  ////// CREATE USER
  // Create User initial state
  const [createUser, setCreateUser] = useState({
    username: "",
    number: "",
    email: "",
    ci: "",
    password: ""
  });
  // Error message for Create User
  const [errorMessage, setErrorMessage] = useState(null);

  ////// LAST USERS
  // Object with all categories from a Last Users containing
  // an array of all data of each
  // to be rendered in last users table
  const [lastUsers, setLastUsers] = useState({
    number: [],
    username: [],
    email: [],
    ci: [],
    updated: [],
    created: [],
    id: []
  });
  // Quantity Last Users table will display
  const [fetchedUsersQuantity, setFetchedUserQuantity] = useState(10);
  // Boolean setting the capacity of the table to load more Last Users
  const [showMoreLastUsersButton, setShowMoreLastUsersButton] = useState(true);

  function moreLastUsersHandler(from, to) {
    lastUsersHandler(from, to);
    setFetchedUserQuantity(to);
  }

  useEffect(() => {
    lastUsersHandler(0, fetchedUsersQuantity);
  }, []);

  function lastUsersHandler(from, to) {
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
              setShowMoreLastUsersButton(false);
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

  function createUserHandler(e) {
    e.preventDefault();
    let newUser = createUser
    newUser.password = createUser.ci
    trackPromise(
      axios
        .post(
          `https://arcane-everglades-49934.herokuapp.com/users`,
          newUser,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("guards")}`
            }
          }
        )
        .then(() => {
          lastUsersHandler(0, fetchedUsersQuantity);
          setCreateUser({
            username: "",
            number: "",
            email: "",
            ci: "",
            password: ""
          });
        })
        .catch(() => setErrorMessage(status.ERROR)),
      "create-user"
    );
  }

  function handleCreateUserChange(event) {
    setCreateUser({
      ...createUser,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <FindUser onUpdate={() => moreLastUsersHandler(0, fetchedUsersQuantity)} />
      <Br />
      <Title text={tabs.USERS.CREATE} tag="h1" />
      <form onSubmit={e => createUserHandler(e)}>
        <Input
          name="username"
          badge="Nombre"
          type="text"
          value={createUser.username}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="email"
          badge="Email"
          type="text"
          value={createUser.email}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="number"
          badge="Número"
          type="text"
          value={createUser.number}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Input
          name="ci"
          badge="Cédula"
          type="text"
          value={createUser.ci}
          onChange={handleCreateUserChange}
          rightMargin={true}
        />
        <Button text={tabs.USERS.CREATE} />
      </form>
      <Loader error={errorMessage} area="create-user" />
      <Title text={tabs.USERS.HISTORY} tag="h2" />
      <Table
        onUpdate={() => moreLastUsersHandler(0, fetchedUsersQuantity)}
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
      {showMoreLastUsersButton && (
        <>
          <FetchMore>
            <Button
              onClick={() =>
                moreLastUsersHandler(fetchedUsersQuantity, fetchedUsersQuantity + 10)
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
