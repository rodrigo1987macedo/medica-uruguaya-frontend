import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border1};
  padding: 0 0 10px 0;
  margin: 0 0 30px 0;
`;

const Explanation = styled.div`
  font-size: 12px;
`;

const MainTitle = styled.div`
  color: ${props => props.theme.colors.primary};
  font-family: "Alright";
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 5px 0;
`;

function Title({ text, tag, explanation }) {
  return (
    <TitleWrapper>
      <MainTitle as={tag}>{text}</MainTitle>
      <Explanation>{explanation}</Explanation>
    </TitleWrapper>
  );
}

export default Title;
