import React from "react";
import Moment from "react-moment";
import styled from "styled-components";

const UserDataWrapper = styled.div`
  display: grid;
  grid-gap: 5px;
  > div:nth-child(1) {
    font-family: "Alright";
    font-size: 20px;
    text-transform: uppercase;
    color: ${props => props.theme.colors.primary};
  }
  a {
    color: ${props => props.theme.colors.primary};
  }
`;

const EmptyMessage = styled.div`
  color: ${props => props.theme.colors.process};
`;

function UserData({ userData }) {
  return (
    <UserDataWrapper>
      <div>#{userData.number ? userData.number : " -"}</div>
      <div>
        <b>Nombre:</b> {userData.username ? userData.username : " -"}
      </div>
      <div>
        <b>Email:</b> {userData.email ? userData.email : " -"}
      </div>
      {userData.document ? (
        <a href={userData.document.url} download target="_blank">
          <span>
            Descargar guardia [
            <Moment format="DD/MM/YY">{userData.document.createdAt}</Moment>]
          </span>
        </a>
      ) : (
        <EmptyMessage>No hay guardias</EmptyMessage>
      )}
    </UserDataWrapper>
  );
}

export default UserData;
