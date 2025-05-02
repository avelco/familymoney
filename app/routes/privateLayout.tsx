import { Outlet, redirect } from 'react-router'
import type { Route } from '../+types/root';
import { getSession } from '~/sessions.server';
import Header from '~/components/Header';

export async function loader({
    request,
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    console.log("Private layout loader check:", session.has("userId"));
    if (session.has("userId")) {
        return {};
    } else {
        return redirect("/login");
    }
}

export default function privateLayout() {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <Header
                    userName="John Doe"
                    userImage="https://ui-avatars.com/api/?name=John&background=0D8ABC&color=fff"
                />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Outlet />
                </main>
            </div>
        </>
    )
}
