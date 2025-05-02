
import type { Route } from "../+types/root";
import { redirect } from "react-router";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Home - Familymoney" },
		{ name: "description", content: "Welcome to Familymoney!" },
	];
}


export default function Home() {
	return (
		<div>Home</div>
	)
}
