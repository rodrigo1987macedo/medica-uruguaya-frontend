import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input";
import Loader from "./Loader";
import { trackPromise } from "react-promise-tracker";

const SafeGuardWrapper = styled.div`
  > input {
    margin: 0 0 15px 0;
  }
`;

function SafeGuard({ children }) {
  const [isSure, setIsSure] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setErrorMessage("");
    trackPromise(
      axios
        .post("https://arcane-everglades-49934.herokuapp.com/auth/local", {
          identifier: "rodrigo1987macedo@gmail.com",
          password: userPassword
        })
        .then(() => {
          setIsSure(true);
        })
        .catch(() => {
          setErrorMessage("Clave incorrecta");
        })
    );
  }

  const handlePasswordChange = e => {
    e.persist();
    setUserPassword(e.target.value);
  };

  return (
    <SafeGuardWrapper>
      {isSure ? (
        children
      ) : (
        <>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            value={userPassword}
            placeholder="Clave"
          />
          <br />
          <Button text="Aceptar" onClick={() => handleSubmit()} />
          <Loader error={errorMessage} />
        </>
      )}
    </SafeGuardWrapper>
  );
}

export default SafeGuard;
