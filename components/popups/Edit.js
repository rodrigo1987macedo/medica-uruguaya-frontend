import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import Button from "../common/Button";
import Title from "../common/Title";
import PopUp from "../common/PopUp";
import Input from "../common/Input";
import { trackPromise } from "react-promise-tracker";
import Loader from "../common/Loader";

const cookies = new Cookies();

const Results = styled.div`
  min-height: 60px;
  > div {
    margin: 10px 0;
  }
`;

const Warning = styled.div`
  color: ${props => props.theme.colors.error};
`;

const Status = styled.div`
  color: ${props => props.theme.colors.success};
`;

const Form = styled.form`
  button {
    width: 80px;
  }
  input {
    width: 130px;
  }
`;

const process = {
  FINISHED: "Funcionario modificado con éxito",
  ERROR: "Ha ocurrido un error",
  RUNNING: "Modificando..."
};

function Edit({ id }) {
  const [user, setUser] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  function fetchUser() {
    setErrorMessage(null);
    setSuccessMessage(null);
      axios
        .get(`https://arcane-everglades-49934.herokuapp.com/users/${id}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("guards")}`
          }
        })
        .then(res => {
          let data = {
            number: res.data.number,
            username: res.data.username,
            email: res.data.email,
            ci: res.data.ci
          };
          setUser(data);
        });
  }

  function edit(e, user) {
    setErrorMessage(null);
    setSuccessMessage(null);
    e.preventDefault();
    trackPromise(
    axios
      .put(`https://arcane-everglades-49934.herokuapp.com/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${cookies.get("guards")}`
        }
      })
      .then(() => setSuccessMessage(process.FINISHED))
      .catch(() => {
        setErrorMessage(process.ERROR);
      }),
      "edit"
    );
  }

  function handleUserEdit(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  return (
    <PopUp onOpen={() => fetchUser()} buttonIcon="pen" small={true}>
      <Title
        text="Editar Funcionario"
        explanation="Este proceso modificará los datos editados del funcionario en sistema de manera definitiva"
        tag="h1"
      />
      {user ? (
        <>
          <Form onSubmit={e => edit(e, user)}>
            <Input
              badge="Nombre"
              name="username"
              type="text"
              value={user.username}
              onChange={handleUserEdit}
              rightMargin={true}
            />
            <Input
              badge="Email"
              name="email"
              type="text"
              value={user.email}
              onChange={handleUserEdit}
              rightMargin={true}
            />
            <Input
              badge="Número"
              name="number"
              type="text"
              value={user.number}
              onChange={handleUserEdit}
              rightMargin={true}
            />
            <Input
              badge="Cédula"
              name="ci"
              type="text"
              value={user.ci}
              onChange={handleUserEdit}
              rightMargin={true}
            />
            <Button text="Modificar" />
          </Form>
          <Loader area="edit" success={successMessage} error={errorMessage} />
        </>
      ) : (
        <>Procesando...</>
      )}
    </PopUp>
  );
}

export default Edit;
