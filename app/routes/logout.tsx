import { redirect, type ActionFunction } from "react-router";
import { destroySession, getSession } from "~/sessions.server";


export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

const logout = () => {
  return (
    <div>logout</div>
  )
}

export default logout