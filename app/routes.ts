import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
  } from "@react-router/dev/routes";

export default [
    index("./routes/welcome.tsx"),
    route("/login", "./routes/login.tsx"),
    route("/register", "./routes/register.tsx"),
] satisfies RouteConfig;
