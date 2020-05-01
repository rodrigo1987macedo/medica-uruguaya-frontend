import axios from "axios";
import React, { useEffect } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const MeDataWrapper = styled.div`
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

function MeData({ data }) {
  // console.log('date: ', Date.now())
  // console.log('data: ', data)
  // useEffect(() => {
    // axios
      // .post(
        // `https://arcane-everglades-49934.herokuapp.com/users?id=${data.id}`,
        // {
          // seen: Date.now()
        // },
        // {
          // headers: {
            // Authorization: `Bearer ${cookies.get("guards")}`
          // }
        // }
      // )
      // .then(res => {
        // console.log("res: ", res);
      // })
      // .catch(() => console.log("error"));
  // }, []);

  return (
    <MeDataWrapper>
      <div>#{data.number ? data.number : " -"}</div>
      <div>
        <b>Nombre:</b> {data.username ? data.username : " -"}
      </div>
      <div>
        <b>Email:</b> {data.email ? data.email : " -"}
      </div>
      {data.file.url ? (
        <a href={data.file.url} download target="_blank">
          <span>
            Descargar guardia [
            <Moment format="DD/MM/YY">{data.file.createdAt}</Moment>]
          </span>
        </a>
      ) : (
        <EmptyMessage>No hay guardias</EmptyMessage>
      )}
    </MeDataWrapper>
  );
}

export default MeData;
