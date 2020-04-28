import React, { useState } from "react";
import styled from "styled-components";
import FindUser from "../components/common/FindUser";
import CreateUser from "../components/admin/CreateUser";
import LoadFiles from "../components/admin/LoadFiles";
import { auth } from "../utils/auth";
import { Cookies } from "react-cookie";
import Router from "next/router";
import { tabs } from "../constants/tabs";
import Link from "next/link";
import { Navbar } from "../styles/Navbar";
import Layout from "../components/common/Layout";
import ModifyUser from "../components/admin/ModifyUser";

const AdminDisplay = styled.div`
  display: flex;
  > div:nth-child(1) {
    margin: 0 18px 0 0;
  }
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
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  :hover {
    color: ${props => props.theme.colors.tabHover};
  }
`;

const cookies = new Cookies();

function Admin({ data }) {
  const [currentTab, setCurrentTab] = useState(tabs.FIND);

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
          <Tabs>
            <Tab onClick={() => setCurrentTab(tabs.LOAD)}>{tabs.LOAD}</Tab>
            <Tab onClick={() => setCurrentTab(tabs.FIND)}>{tabs.FIND}</Tab>
            <Tab onClick={() => setCurrentTab(tabs.MODIFY)}>{tabs.MODIFY}</Tab>
            <Tab onClick={() => setCurrentTab(tabs.CREATE)}>{tabs.CREATE}</Tab>
          </Tabs>
          <AdminDisplay>
            <div>Bienvenido, {data.username}</div>
            <Tab onClick={() => logout()}>Cerrar sesión</Tab>
          </AdminDisplay>
        </div>
      </Navbar>
      <div>
        {currentTab === tabs.LOAD && <LoadFiles />}
        {currentTab === tabs.FIND && <FindUser />}
        {currentTab === tabs.CREATE && <CreateUser />}
        {currentTab === tabs.MODIFY && <ModifyUser />}
      </div>
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
