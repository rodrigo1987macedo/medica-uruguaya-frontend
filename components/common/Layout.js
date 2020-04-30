import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Footer from "../common/Footer";

const LayoutWrapper = styled.div`
  background: ${props => props.theme.colors.background2};
`;

const Content = styled.div`
  min-height: 100vh;
  > main {
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
          href="/favicon.ico"
        />
      </Head>
      <Content>{children}</Content>
      <Footer />
    </LayoutWrapper>
  );
}

export default Layout;
