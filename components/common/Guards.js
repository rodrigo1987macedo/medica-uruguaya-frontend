import React from "react";
import styled from "styled-components";
import Moment from "react-moment";

const GuardsWrapper = styled.div`
  display: flex;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  time {
    transform: translate(0, 2px);
    margin: 0 0 0 2px;
  }
`;

const Guard = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  background-color: ${props => props.theme.colors.border1};
  padding: 5px;
  border-radius: 4px;
  margin: 0 6px 0 0;
`;

const Img = styled.img`
  display: block;
  width: 13px;
  margin: 0 4px 0 0;
`;

const Delete = styled.div`
  cursor: pointer;
  z-index: 2;
  > img {
    display: block;
    width: 12px;
    margin: 0 0 0 5px;
  }
`;

function Guards({ guardsArr, canDelete }) {
  return (
    <GuardsWrapper>
      {guardsArr.map(item => {
        return (
          <Guard key={item.url}>
            <a href={item.url} download target="_blank">
              <Img src="file.png" alt="guardia" />
              <Moment format="DD/MM/YY">{item.date}</Moment>
            </a>
            {canDelete && (
              <Delete onClick={() => canDelete(item._id)}>
                <img src="close.png" alt="borrar" />
              </Delete>
            )}
          </Guard>
        );
      })}
    </GuardsWrapper>
  );
}

export default Guards;
