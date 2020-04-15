import React from "react";
import styled from "styled-components";
import Head from "next/head";

const LayoutWrapper = styled.div`
  background: ${props => props.theme.colors.background2};
  min-height: 100vh;
  > div {
    padding: 32px 150px 14px 150px;
  }
`;

function Layout({ children }) {
  return (
    <LayoutWrapper>
      <Head>
        <title>Gestión de guardias | Médica Uruguaya</title>
        <meta name="description" content="Gestión de guardias" />
        <link
          rel="icon"
          type="image/icon"
          sizes="256x256"
          href="/faavicon.ico"
        />
      </Head>
      {children}
    </LayoutWrapper>
  );
}

export default Layout;
