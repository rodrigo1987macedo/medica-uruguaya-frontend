import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

function Loader() {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <LoaderWrapper>
        Cargando...
      </LoaderWrapper>
    )
  );
}

export default Loader;
