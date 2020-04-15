import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { trackPromise } from "react-promise-tracker";
import Loader from '../common/Loader'

function Form() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["guards"]);
  const [userIdentifier, setUserIdentifier] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    setErrorMessage("")
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
    <>
      <>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleIdentifierChange}
          value={userIdentifier}
        />
      </>
      <>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordChange}
          value={userPassword}
        />
      </>
      <button onClick={() => handleSubmit()}>Login</button>
      <Loader />
      {errorMessage && <div>errorMessage</div>}
    </>
  );
}

export default Form;
