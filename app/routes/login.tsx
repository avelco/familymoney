import { data, Form, redirect, useNavigation } from "react-router";
import { FcMoneyTransfer } from "react-icons/fc";
import type { Route } from "./+types/login";
import { commitSession, getSession } from "~/sessions.server";
import { LoadingButton, SubmitButton } from "~/components/Buttons";


export async function loader({
    request,
}: Route.LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has("userId")) {
        return redirect("/");
    }

    return data(
        { error: session.get("error") },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        }
    );
}

export async function action({
    request,
  }: Route.ActionArgs) {
    let formData = await request.formData();
    let email = formData.get("email");
    let password = formData.get("password");    
    console.log(email, password)
    return { email, password };
  }

export default function Login() {
    const navigation = useNavigation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                        <FcMoneyTransfer className="text-4xl" /> 
                        <span>Family Money</span>
                    </h2>
                </div>
                <Form method="post" className="mt-8 space-y-6" >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                    {navigation.formAction === "/login" ? (
                            <LoadingButton text="Validando" />
                        ) : (
                            <SubmitButton text="Iniciar sesión" />
                        )}
                    </div>
                </Form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{" "}
                        <a
                            href="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

