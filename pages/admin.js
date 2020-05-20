import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import styled from "styled-components";
import FindUser from "../components/tabs/FindUser";
import Layout from "../components/common/Layout";
import CreateUser from "../components/tabs/CreateUser";
import LoadFiles from "../components/tabs/LoadFiles";
import { tabs } from "../constants/tabs";
import Navbar from "../components/common/Navbar";
import { auth } from "../utils/auth";
import MeData from "../components/tabs/MeData";

const AdminDisplay = styled.div`
  display: flex;
  > div:nth-child(1) {
    margin: 0 18px 0 0;
  }
`;

const Br = styled.div`
  width: 100%;
  height: 3px;
  background: ${props => props.theme.colors.process};
  margin: 45px 0 40px 0;
`;

const Tabs = styled.div`
  display: flex;
  > div {
    margin: 0 18px 0 0;
  }
`;

const Tab = styled.div`
  color: ${props => props.theme.colors.tab};
  font-family: "Alright";
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  :hover {
    color: ${props => props.theme.colors.tabHover};
  }
`;

const cookies = new Cookies();

function Admin({ data }) {
  const [currentTab, setCurrentTab] = useState(tabs.DOCS.MANAGE);

  function logout() {
    cookies.remove("guards");
    Router.push("/login");
  }

  return (
    <Layout>
      <Navbar>
        <div>
          <Link href="/">
            <a>
              <img src="/logo.png" alt="logo" />
            </a>
          </Link>
        </div>
        <div>
          {data.role.type === "admin" && (
            <Tabs>
              <Tab onClick={() => setCurrentTab(tabs.DOCS.MANAGE)}>
                {tabs.DOCS.MANAGE}
              </Tab>
              <Tab onClick={() => setCurrentTab(tabs.USERS.MANAGE)}>
                {tabs.USERS.MANAGE}
              </Tab>
            </Tabs>
          )}
          <AdminDisplay>
            <div>Bienvenido, {data.username}</div>
            <Tab onClick={() => logout()}>Cerrar sesión</Tab>
          </AdminDisplay>
        </div>
      </Navbar>
      {data.role.type === "admin" && (
        <main>
          {currentTab === tabs.DOCS.MANAGE && <LoadFiles />}
          {currentTab === tabs.USERS.MANAGE && <CreateUser />}
        </main>
      )}
      {data.role.type === "authenticated" && (
        <main>
          <MeData data={data} />
        </main>
      )}
    </Layout>
  );
}

Admin.getInitialProps = async ctx => {
  const data = await auth(ctx);

  return {
    data: data
  };
};

export default Admin;
