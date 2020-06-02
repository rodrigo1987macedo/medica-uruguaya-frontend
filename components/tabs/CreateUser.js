import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { trackPromise } from "react-promise-tracker";
import styled from "styled-components";
import { status } from "../../constants/status";
import { table } from "../../constants/table";
import { tabs } from "../../constants/tabs";
import Button from "../common/Button";
import Input from "../common/Input";
import Loader from "../common/Loader";
import Table from "../common/Table";
import Title from "../common/Title";

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

const Form = styled.form`
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
  > span > span {
    @media (max-width: 1000px) {
      top: -15px;
    }
  }
  input {
    margin: 0 10px 0 0;
    @media (max-width: 1000px) {
      margin: 0 0 30px 0;
    }
  }
`;

function CreateUser() {
  //
  ////// FIND USER
  // Find User initial state
  const [findUserNumber, setFindUserNumber] = useState();
  // Found User initial state
  const [foundUser, setFoundUser] = useState({
    number: undefined,
    username: undefined,
    email: undefined,
    guard: undefined,
    ci: undefined
  });
  // Error message for Find User
  const [errorMessageFoundUser, setErrorMessageFoundUser] = useState();

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
            } else {
              number.push(item.number);
              username.push(item.username);
              email.push(item.email);
              ci.push(item.ci);
              updated.push(item.updatedAt);
              created.push(item.createdAt);
              id.push(item._id);
            }
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
    let newUser = createUser;
    newUser.password = createUser.ci;
    trackPromise(
      axios
        .post(`https://arcane-everglades-49934.herokuapp.com/users`, newUser, {
          headers: {
            Authorization: `Bearer ${cookies.get("guards")}`
          }
        })
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

  function findUser(employeeNumber) {
    setErrorMessageFoundUser(null);
    trackPromise(
      axios
        .get(
          `https://arcane-everglades-49934.herokuapp.com/users?number=${employeeNumber}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("guards")}`
            }
          }
        )
        .then(res => {
          if (res.data.length === 0) {
            setErrorMessageFoundUser(status.ERROR_USER);
          }
          let number = [];
          let username = [];
          let email = [];
          let guard = [];
          let ci = [];
          let id = [];
          res.data.map(item => {
            number.push(item.number);
            username.push(item.username);
            email.push(item.email);
            guard.push(item.file);
            ci.push(item.ci);
            id.push(item._id);
          });
          setFoundUser({
            number,
            username,
            email,
            guard,
            ci,
            id
          });
        })
        .catch(() => {
          setErrorMessageFoundUser(status.ERROR_SERVER);
        }),
      "find-user"
    );
  }

  function handleCreateUserChange(event) {
    setCreateUser({
      ...createUser,
      [event.target.name]: event.target.value
    });
  }

  function updateFoundUsers(from, to) {
    lastUsersHandler(from, to);
    setFetchedUserQuantity(to);
    findUserNumber && findUser(findUserNumber);
  }

  function findUserHandler(e) {
    e.preventDefault();
    findUser(findUserNumber);
  }

  function handleFindUserChange(event) {
    setFindUserNumber(event.target.value);
  }

  return (
    <>
      <Title text={tabs.USERS.FIND} tag="h1" />
      <form onSubmit={e => findUserHandler(e)}>
        <Input
          badge="Número"
          type="text"
          value={findUserNumber}
          onChange={handleFindUserChange}
          rightMargin={true}
        />
        <Button text={tabs.USERS.FIND} />
      </form>
      <Loader error={errorMessageFoundUser} area="find-user" />
      <Table
        onUpdate={() => updateFoundUsers(0, fetchedUsersQuantity)}
        data={[
          { heading: table.NUMBER, content: foundUser.number },
          { heading: table.NAME, content: foundUser.username },
          { heading: table.MAIL, content: foundUser.email },
          { heading: table.GUARD, content: foundUser.guard },
          { heading: table.CI, content: foundUser.ci },
          { heading: table.ACTIONS, content: foundUser.id }
        ]}
      />
      <Br />
      <Title text={tabs.USERS.CREATE} tag="h1" />
      <Form onSubmit={e => createUserHandler(e)}>
        <Input
          name="username"
          badge="Nombre"
          type="text"
          value={createUser.username}
          onChange={handleCreateUserChange}
        />
        <Input
          name="email"
          badge="Email"
          type="text"
          value={createUser.email}
          onChange={handleCreateUserChange}
        />
        <Input
          name="number"
          badge="Número"
          type="text"
          value={createUser.number}
          onChange={handleCreateUserChange}
        />
        <Input
          name="ci"
          badge="Cédula"
          type="text"
          value={createUser.ci}
          onChange={handleCreateUserChange}
        />
        <Button text={tabs.USERS.CREATE} />
      </Form>
      <Loader error={errorMessage} area="create-user" />
      <Title text={tabs.USERS.HISTORY} tag="h2" />
      <Table
        onUpdate={() => updateFoundUsers(0, fetchedUsersQuantity)}
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
                updateFoundUsers(
                  fetchedUsersQuantity,
                  fetchedUsersQuantity + 10
                )
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
