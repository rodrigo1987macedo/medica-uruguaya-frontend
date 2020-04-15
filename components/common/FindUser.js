import axios from "axios";
import React, { useState } from "react";
import Moment from "react-moment";
import { trackPromise } from "react-promise-tracker";
import styled from "styled-components";
import { tabs } from "../../constants/tabs";
import { Button } from "../../styles/Button";
import { InputText } from "../../styles/InputText";
import { LoaderContainer } from "../../styles/LoaderContainer";
import Loader from "../common/Loader";
import Title from "../common/Title";

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
`;

const EmptyMessage = styled.div`
  color: ${props => props.theme.colors.process};
`;

const UserData = styled.div`
  > div:nth-child(1) {
    font-family: "Alright";
    font-size: 20px;
    text-transform: uppercase;
    margin: 0 0 8px 0;
    color: ${props => props.theme.colors.primary};
  }
  > div:nth-child(n + 1) {
    margin: 0 0 5px 0;
  }
  a {
    color: ${props => props.theme.colors.primary};
  }
`;

function FindUser() {
  const [findUserState, setFindUserState] = useState("");
  const [userData, setUserDataState] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function findUser(employeeNumber) {
    setErrorMessage(null);
    setUserDataState(null);
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
          setUserDataState({
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
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
      {
        // <pre>{JSON.stringify(userData, undefined, 2)}</pre>
      }
      {userData && (
        <UserData>
          <div>#{userData.number}</div>
          <div>
            <b>Nombre:</b> {userData.username ? userData.username : "-"}
          </div>
          <div>
            <b>Email:</b> {userData.email ? userData.email : "-"}
          </div>
          {userData.document ? (
            <a href={userData.document.url} download target="_blank">
              <span>
                Descargar guardia [
                <Moment format="DD/MM/YY">{userData.document.createdAt}</Moment>
                ]
              </span>
            </a>
          ) : <EmptyMessage>No hay guardias</EmptyMessage>}
        </UserData>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
}

export default FindUser;
