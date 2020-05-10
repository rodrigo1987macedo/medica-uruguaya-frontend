import React from "react";
import styled from "styled-components";

const TitleWrapper = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.border2};
  padding: 0 0 10px 0;
  margin: 0 0 30px 0;
`;

const Explanation = styled.div`
  font-size: 12px;
  color: ${props => props.danger && props.theme.colors.error};
`;

const MainTitle = styled.div`
  color: ${props =>
    props.danger ? props.theme.colors.error : props.theme.colors.primary};
  font-family: "Alright";
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 5px 0;
`;

function Title({ text, tag, explanation, danger }) {
  return (
    <TitleWrapper>
      <MainTitle as={tag} danger={danger}>
        {text}
      </MainTitle>
      <Explanation danger={danger}>{explanation}</Explanation>
    </TitleWrapper>
  );
}

export default Title;
