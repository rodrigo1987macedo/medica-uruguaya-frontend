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

function FindUser() {
  const [findUserState, setFindUserState] = useState("");
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function findUser(employeeNumber) {
    setErrorMessage(null);
    setUserData(null);
    trackPromise(
      axios
        .get(
          `https://arcane-everglades-49934.herokuapp.com/users?number=${employeeNumber}`
        )
        .then(res => {
          let document = res.data[0].file;
          let username = res.data[0].username;
          let email = res.data[0].email;
          let number = res.data[0].number;
          setUserData({
            number,
            username,
            email,
            document
          });
        })
        .catch(() => setErrorMessage("Ha ocurrido un error"))
    );
  }

  function handleFindUserChange(event) {
    setFindUserState(event.target.value);
  }

  return (
    <>
      <Title text={tabs.FIND} />
      <InputText
        placeholder="Número"
        type="text"
        value={findUserState}
        onChange={handleFindUserChange}
      />
      <Button onClick={() => findUser(findUserState)} button>
        Buscar usuario
      </Button>
      <Loader />
      {userData && <UserData userData={userData} />}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
}

export default FindUser;
