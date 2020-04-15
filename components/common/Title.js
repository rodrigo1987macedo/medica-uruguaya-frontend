import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.h1`
  margin: 0 0 20px 0;
  padding: 0;
  color: ${props => props.theme.colors.primary};
  font-family: "Alright";
  font-weight: bold;
  text-transform: uppercase;
`;

function Title({ text }) {
  return <TitleWrapper>{text}</TitleWrapper>;
}

export default Title;
