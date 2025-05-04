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
      route("/logout", "./routes/logout.tsx"),
      route("/budgets", "./routes/budgets.tsx"),
      route("/budgets/:budgetId/allocations", "./routes/allocations.tsx"),
      route("/wallets", "./routes/wallets.tsx"),
      route("/wallets/create", "./routes/walletsCreate.tsx"),
      route("/transactions", "./routes/transactions.tsx"),
    ]),
] satisfies RouteConfig;
