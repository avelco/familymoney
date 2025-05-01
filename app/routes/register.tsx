import { data, Form, useActionData, useNavigation } from "react-router";
import { FcMoneyTransfer } from "react-icons/fc";
import type { Route } from "./+types/register";
import { LoadingButton, SubmitButton } from "~/components/Buttons";
import type { CreateUser, CreateUserErrors } from "~/interfaces/userInterface";
import type { ActionData } from "~/interfaces/generalInterface";
import { createUser } from "~/lib/db/user";
import bcrypt from "bcrypt";

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData();
	const name = String(formData.get("name"));
	const email = String(formData.get("email"));
	const password = String(formData.get("password"));

	const errors: CreateUserErrors = {};
	
	if (!name) {
		errors.name = "Name is required";
	  }

	if (!email.includes("@")) {
		errors.email = "Invalid email address";
	}

	if (password.length < 6) {
		errors.password =
			"Password should be at least 6 characters";
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	if (Object.keys(errors).length > 0) {
		return data({ errors }, { status: 400 });
	}


	const user: CreateUser = {
		name,
		email,
		password: hashedPassword,
	};

	const newUser = await createUser(user)

	console.log(newUser);
}

export default function Register() {
	const navigation = useNavigation();
	const actionData = useActionData<ActionData>();
	const errors = actionData?.errors;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
						<FcMoneyTransfer className="text-4xl" />
						<span>Family Money</span>
					</h2>
					<h3 className="mt-2 text-center text-xl text-gray-600">
						Create your account
					</h3>
				</div>

				<Form method="post" className="mt-8 space-y-6">
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="name" className="sr-only">
								Full Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Full Name"
							/>
						</div>
						{errors && (
								<p id="name-error" className="mt-1 text-xs text-red-600">
									{errors.name}
								</p>
							)}
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
								autoComplete="new-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
						</div>
					</div>

					<div>
						{navigation.formAction === "/register" ? (
							<LoadingButton text="Creating account..." />
						) : (
							<SubmitButton text="Create account" />
						)}
					</div>
				</Form>

				<div className="text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<a
							href="/login"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							Sign in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
