import axios from "axios";
import { table } from "../../constants/table";
import React, { useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { tabs } from "../../constants/tabs";
import { Button } from "../../styles/Button";
import { InputText } from "../../styles/InputText";
import Title from "../common/Title";
import History from "../admin/History";
import Loader from "./Loader";

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
          `https://arcane-everglades-49934.herokuapp.com/users?number=${employeeNumber}`
        )
        .then(res => {
          if (res.data.length === 0) {
            setErrorMessage("No existe usuario con tal número");
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
          setErrorMessage("Error en el servidor");
        })
    );
  }

  function handleFindUserChange(event) {
    setFindUserState(event.target.value);
  }

  return (
    <>
      <Title text={tabs.FIND} tag="h1" />
      <InputText
        placeholder="Número"
        type="text"
        value={findUserState}
        onChange={handleFindUserChange}
      />
      <Button onClick={() => findUser(findUserState)} button>
        Buscar usuario
      </Button>
      <Loader error={errorMessage} />
      <History
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
