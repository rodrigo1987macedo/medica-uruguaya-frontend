import axios from "axios";
import React, { useState } from "react";
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

function FindUser() {
  const [findUserState, setFindUserState] = useState();
  const [userData, setUserData] = useState({
    number: undefined,
    username: undefined,
    email: undefined,
    guard: undefined,
    ci: undefined
  });
  const [errorMessage, setErrorMessage] = useState();

  function findUser(e, employeeNumber) {
    e.preventDefault();
    setErrorMessage(null);
    setUserData({
      number: null,
      username: null,
      email: null,
      guard: null,
      ci: null
    });
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
            setErrorMessage(status.ERROR_USER);
          }
          let number = [];
          let username = [];
          let email = [];
          let guard = [];
          let ci = [];
          res.data.map(item => {
            number.push(item.number);
            username.push(item.username);
            email.push(item.email);
            guard.push(item.file);
            ci.push(item.ci);
          });
          setUserData({
            number,
            username,
            email,
            guard,
            ci
          });
        })
        .catch(() => {
          setErrorMessage(status.ERROR_SERVER);
        }),
      "find-user"
    );
  }

  function handleFindUserChange(event) {
    setFindUserState(event.target.value);
  }

  return (
    <>
      <Title text={tabs.USERS.FIND} tag="h1" />
      <form onSubmit={e => findUser(e, findUserState)}>
        <Input
          placeholder="# funcionario"
          type="text"
          value={findUserState}
          onChange={handleFindUserChange}
          rightMargin={true}
        />
        <Button text={tabs.USERS.FIND} />
      </form>
      <Loader error={errorMessage} area="find-user" />
      <Title text="Usuario buscado" tag="h2" />
      <Table
        data={[
          { heading: table.NUMBER, content: userData.number },
          { heading: table.NAME, content: userData.username },
          { heading: table.MAIL, content: userData.email },
          { heading: table.GUARD, content: userData.guard },
          { heading: table.CI, content: userData.ci }
        ]}
      />
    </>
  );
}

export default FindUser;
