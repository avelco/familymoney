// src/components/Breadcrumb.tsx (or a suitable shared location)
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router";

interface Crumb {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    crumbs: Crumb[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ crumbs }) => {
    if (!crumbs || crumbs.length === 0) {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            {crumb.path && !isLast ? (
                                <Link
                                    to={crumb.path}
                                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            ) : (
                                <span
                                    className={isLast ? "font-medium text-gray-500" : "text-gray-700"}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {crumb.label}
                                </span>
                            )}


                            {!isLast && (
                                <FaChevronRight
                                    className="h-3 w-3 text-gray-400 mx-2 flex-shrink-0"
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
