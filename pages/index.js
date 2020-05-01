import Link from "next/link";
import React from "react";
import Navbar from "../components/common/Navbar";

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
      </Navbar>
      <div>
      </div>
    </>
  );
};
