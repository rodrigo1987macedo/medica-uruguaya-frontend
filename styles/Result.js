import React from "react";
import styled from "styled-components";
import { usePromiseTracker } from "react-promise-tracker";

const ResultWrapper = styled.div`
  min-height: 40px;
  border-bottom: 1px solid ${props => props.theme.colors.border2};
  margin: 0 0 40px 0;
`;

function Result(error) {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <ResultWrapper>
      {promiseInProgress ? (
        <div>Cargando...</div>
      ) : error ? (
        <div>{error}</div>
      ) : null}
    </ResultWrapper>
  );
}

export default Result;
