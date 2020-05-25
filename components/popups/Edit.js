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
import Guards from "../common/Guards";
import { tabs } from "../../constants/tabs";

const cookies = new Cookies();

const Form = styled.form`
  padding: 10px 0 0 0;
  button {
    width: 80px;
  }
  input {
    width: 130px;
  }
`;

const EmptyMessage = styled.div`
  color: ${props => props.theme.colors.process};
`;

const LoadFile = styled.div`
  padding: 0 0 20px 0;
`;

const process = {
  FINISHED: "Funcionario modificado con éxito",
  ERROR: "Ha ocurrido un error",
  RUNNING: "Modificando..."
};

function Edit({ id, onUpdate }) {
  const [user, setUser] = useState();
  const [successEditMessage, setSuccessEditMessage] = useState();
  const [errorEditMessage, setErrorEditMessage] = useState();
  const [successDeleteMessage, setSuccessDeleteMessage] = useState();
  const [errorDeleteMessage, setErrorDeleteMessage] = useState();

  function resetState() {
    setErrorEditMessage(null);
    setSuccessEditMessage(null);
    setErrorDeleteMessage(null);
    setSuccessDeleteMessage(null);
  }

  function fetchUser() {
    resetState();
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
          ci: res.data.ci,
          files: res.data.file
        };
        setUser(data);
      });
  }

  function deleteGuard(id) {
    resetState();
    trackPromise(
      axios
        .delete(
          `https://arcane-everglades-49934.herokuapp.com/upload/files/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("guards")}`
            }
          }
        )
        .then(() => {
          setErrorDeleteMessage(null);
          setSuccessDeleteMessage(process.FINISHED);
          onUpdate();
          fetchUser()
        })
        .catch(() => {
          setErrorDeleteMessage(process.ERROR);
          setSuccessDeleteMessage(null);
        }),
      "guards"
    );
  }

  function edit(e, user) {
    resetState();
    e.preventDefault();
    trackPromise(
      axios
        .put(
          `https://arcane-everglades-49934.herokuapp.com/users/${id}`,
          user,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("guards")}`
            }
          }
        )
        .then(() => {
          setSuccessEditMessage(process.FINISHED);
          setErrorEditMessage(null);
          onUpdate();
        })
        .catch(() => {
          setErrorEditMessage(process.ERROR);
          setSuccessEditMessage(null);
        }),
      "edit"
    );
  }

  function handleUserEdit(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  return (
    <PopUp onOpen={() => fetchUser()} buttonIcon="pen">
      <Title
        text="Editar Funcionario"
        explanation="Este proceso modificará los datos editados del funcionario en sistema de manera definitiva"
        tag="h1"
      />
      {user ? (
        <>
          <Title text="Datos" tag="h2" />
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
          <Loader
            area="edit"
            success={successEditMessage}
            error={errorEditMessage}
          />
          <Title text="Guardias" tag="h2" />
          <LoadFile>
            {user.files.length !== 0 ? (
              <Guards
                guardsArr={user.files}
                canDelete={id => deleteGuard(id)}
              />
            ) : (
              <EmptyMessage>No hay guardias</EmptyMessage>
            )}
          </LoadFile>
          <Button text={tabs.DOCS.LOAD} />
          <Input type="file" />
          <Loader
            area="guards"
            success={successDeleteMessage}
            error={errorDeleteMessage}
          />
        </>
      ) : (
        <>Procesando...</>
      )}
    </PopUp>
  );
}

export default Edit;
