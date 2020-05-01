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
    email: undefined
  });
  const [errorMessage, setErrorMessage] = useState();

  function findUser(employeeNumber) {
    setErrorMessage(null);
    setUserData({
      number: null,
      username: null,
      email: null
    });
    trackPromise(
      axios
        .get(
          `https://arcane-everglades-49934.herokuapp.com/users?number=${employeeNumber}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("guards")}`
          }
        })
        .then(res => {
          if (res.data.length === 0) {
            setErrorMessage(status.ERROR_USER);
          }
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
          setUserData({
            number,
            username,
            email
          });
        })
        .catch(() => {
          setErrorMessage(status.ERROR_SERVER);
        })
    );
  }

  function handleFindUserChange(event) {
    setFindUserState(event.target.value);
  }

  return (
    <>
      <Title text={tabs.FIND} tag="h1" />
      <Input
        placeholder="Número"
        type="text"
        value={findUserState}
        onChange={handleFindUserChange}
      />
      <Button text="Buscar Usuario" onClick={() => findUser(findUserState)} />
      <Loader error={errorMessage} />
      <Table
        data={[
          { heading: table.NUMBER, content: userData.number },
          { heading: table.NAME, content: userData.username },
          { heading: table.MAIL, content: userData.email }
        ]}
      />
    </>
  );
}

export default FindUser;
