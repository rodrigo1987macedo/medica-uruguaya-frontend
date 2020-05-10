import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: inline;
  background: ${props =>
    props.secondary
      ? props.theme.colors.border1
      : props.danger
      ? props.theme.colors.error
      : props.theme.colors.primary};
  color: ${props =>
    props.secondary
      ? props.theme.colors.process
      : props.theme.colors.background1};
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
`;

function Button({ text, onClick, secondary, danger }) {
  return (
    <ButtonWrapper onClick={onClick} secondary={secondary} danger={danger}>
      {text}
    </ButtonWrapper>
  );
}

export default Button;
