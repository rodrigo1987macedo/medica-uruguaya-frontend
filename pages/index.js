import Link from "next/link";
import React from "react";
import Navbar from "../components/common/Navbar";
import FindUser from "../components/tabs/FindUser";

export default () => {
  return (
    <>
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
    </>
  );
};
