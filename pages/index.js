import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Title from "../components/common/Title";
import { Navbar } from "../styles/Navbar";
import { PageWrapper } from "../styles/PageWrapper";
import Form from "../components/login/Form";
import FindUser from "../components/common/FindUser";

export default () => {
  return (
    <PageWrapper>
      <Navbar>
        <div>
          <Link href="/">
            <a>
              <img src="/logo.png" alt="logo" />
            </a>
          </Link>
        </div>
        <div>
          <Link href="/admin">
            <a>Administrador</a>
          </Link>
        </div>
      </Navbar>
      <div>
        <FindUser />
      </div>
    </PageWrapper>
  );
};
