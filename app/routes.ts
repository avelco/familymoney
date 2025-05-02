import {
    type RouteConfig,
    route,
    index,
    layout,
  } from "@react-router/dev/routes";

export default [
    index("./routes/welcome.tsx"),
    route("/login", "./routes/login.tsx"),
    route("/register", "./routes/register.tsx"),
    layout("./routes/privateLayout.tsx", [
      route("/home", "./routes/home.tsx"),
      route("/budgets", "./routes/budgets.tsx"),
      route("/budgets/:id/allocations", "./routes/allocations.tsx"),
    ]),
] satisfies RouteConfig;
