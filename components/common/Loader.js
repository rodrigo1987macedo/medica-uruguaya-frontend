import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  position: relative;
  height: 30px;
  > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

function Loader() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <LoaderWrapper>{promiseInProgress && <div>Cargando...</div>}</LoaderWrapper>
  );
}

export default Loader;
