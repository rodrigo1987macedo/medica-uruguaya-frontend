import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { trackPromise } from "react-promise-tracker";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { InputText } from "../styles/InputText";
import Loader from "../components/common/Loader";
import Title from "../components/common/Title";

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  input {
    margin: 0 0 10px 0;
  }
  > div {
    text-align: center;
    width: 400px;
    height: 400px;
    border: 1px solid ${props => props.theme.colors.border2};
    border-radius: 4px;
    padding: 30px 14px;
  }
`;

const Logo = styled.img`
  width: 250px;
  margin: 0;
`;

export default () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["guards"]);
  const [userIdentifier, setUserIdentifier] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setErrorMessage("");
    trackPromise(
      axios
        .post("https://arcane-everglades-49934.herokuapp.com/auth/local", {
          identifier: userIdentifier,
          password: userPassword
        })
        .then(function(response) {
          if (response.data) {
            setCookie("guards", response.data.jwt, { path: "/" });
            router.push("/admin");
          }
        })
        .catch(function(error) {
          if (error.response) {
            setErrorMessage("Usuario o clave incorrectos");
          } else {
            setErrorMessage("Error en el servidor");
          }
        })
    );
  }

  const handleIdentifierChange = e => {
    e.persist();
    setUserIdentifier(e.target.value);
  };

  const handlePasswordChange = e => {
    e.persist();
    setUserPassword(e.target.value);
  };

  return (
    <FormWrapper>
      <div>
        <Title text="Ingresar" tag="h1" />
        <>
          <InputText
            type="email"
            id="email"
            name="email"
            onChange={handleIdentifierChange}
            value={userIdentifier}
            placeholder="email"
          />
        </>
        <br />
        <>
          <InputText
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            value={userPassword}
            placeholder="clave"
          />
        </>
        <br />
        <Button onClick={() => handleSubmit()}>Ingresar</Button>
        <Loader error={errorMessage} />
        <Logo src="logo.png" />
      </div>
    </FormWrapper>
  );
};
