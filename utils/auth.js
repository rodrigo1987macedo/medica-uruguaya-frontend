import axios from "axios";
import Router from "next/router";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export async function auth(ctx) {
  let token;

  if (ctx.req && ctx.req.headers.cookie) {
    // if context has request info AKA Server Side
    token = ctx.req.headers.cookie.replace(
      /(?:(?:^|.*;\s*)guards\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  } else {
    // we dont have request info AKA Client Side
    token = cookies.get("guards");
  }

  const { data } = await axios
    .get("https://arcane-everglades-49934.herokuapp.com/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch(() => {
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: "/login"
        });
        ctx.res.end();
      } else {
        Router.push("/login");
      }
    });

  return data;
}
