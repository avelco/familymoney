
import type { Route } from "../+types/root";
import { data, redirect } from "react-router";
import { getSession, commitSession } from "../sessions.server";

export async function loader({
    request,
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("userId")) {
        // Redirect to the home page if they are already signed in.
        return redirect("/home");
    }else{
        return redirect("/login");
    }
}

const welcome = () => {
    return (
        <div>Validando...</div>
    )
}

export default welcome