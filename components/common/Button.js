import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: inline;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background1};
  border: none;
  border-radius: 4px;
  padding: 4px 10px;
  cursor: pointer;
`;

function Button({ text, onClick }) {
  return <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>;
}

export default Button;
