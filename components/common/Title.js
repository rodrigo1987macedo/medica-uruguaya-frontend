import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  margin: 0 0 30px 0;
  padding: 0 0 12px 0;
  color: ${props => props.theme.colors.primary};
  font-family: "Alright";
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1px solid ${props => props.theme.colors.border1};
`;

function Title({ text, tag }) {
  return <TitleWrapper as={tag}>{text}</TitleWrapper>;
}

export default Title;
