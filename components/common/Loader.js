import React from "react";
import styled from "styled-components";
import { usePromiseTracker } from "react-promise-tracker";

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  border-bottom: 1px solid ${props => props.theme.colors.border2};
  margin: 0 0 40px 0;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
`;

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const Loading = styled.div`
  color: ${props => props.theme.colors.process};
`;

function Loader({ success, error }) {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <ResultWrapper>
      {promiseInProgress ? (
        <Loading>Cargando...</Loading>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : success ? (
        <SuccessMessage>{success}</SuccessMessage>
      ) : null}
    </ResultWrapper>
  );
}

export default Loader;
