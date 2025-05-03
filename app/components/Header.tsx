import React, { useState, useRef, useEffect } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { Form, Link } from "react-router";

// Define types for our props
interface HeaderProps {
	userName: string;
	userImage?: string; // Optional user profile image URL
}

// Define menu item type
interface MenuItem {
	label: string;
	path: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userImage }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Main navigation menu items
	const menuItems: MenuItem[] = [
		{ label: "Dashboard", path: "/dashboard" },
		{ label: "Transactions", path: "/transactions" },
		{ label: "Budgets", path: "/budgets" },
		{ label: "Reports", path: "/reports" },
	];

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		// Implement your logout logic here
		console.log("Logging out...");
	};

	return (
		<header className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Logo section */}
					<div className="flex items-center">
						<Link to="/" className="flex items-center">
							<FcMoneyTransfer className="h-8 w-8" />
							<span className="ml-2 text-xl font-bold text-gray-800">FamilyMoney</span>
						</Link>
					</div>

					{/* Desktop menu */}
					<div className="hidden md:flex items-center justify-center flex-1">
						<nav className="flex space-x-8">
							{menuItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>

					{/* User profile and mobile menu button */}
					<div className="flex items-center">
						{/* Mobile menu button */}
						<button
							type="button"
							className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<span className="sr-only">Open main menu</span>
							{/* Hamburger icon */}
							<svg
								className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
							{/* X icon */}
							<svg
								className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>

						{/* User dropdown */}
						<div className="ml-4 relative flex-shrink-0" ref={dropdownRef}>
							<div>
								<button
									type="button"
									className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
								>
									<span className="sr-only">Open user menu</span>
									{userImage ? (
										<img
											className="h-8 w-8 rounded-full object-cover"
											src={userImage}
											alt={userName}
										/>
									) : (
										<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
											{userName.charAt(0).toUpperCase()}
										</div>
									)}
								</button>
							</div>
							{/* Dropdown menu */}
							{isDropdownOpen && (
								<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
									<div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
										<p className="font-medium">{userName}</p>
									</div>
									<Link
										to="/profile"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										Your Profile
									</Link>
									<Link
										to="/settings"
										className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										Settings
									</Link>
									<Form method="post" action="/logout">
										<button
											type="submit"
											name="_action"
											value="logout"
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Salir
										</button>
									</Form>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu, show/hide based on menu state */}
			<div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{menuItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
							onClick={() => setIsMenuOpen(false)}
						>
							{item.label}
						</Link>
					))}
				</div>
			</div>
		</header>
	);
};

export default Header;
