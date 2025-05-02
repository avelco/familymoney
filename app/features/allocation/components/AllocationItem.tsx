// src/components/AllocationItem.tsx
import React from "react";
import type { Allocation } from "../../../interfaces/budgetInterface";
// import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"; // Remove Heroicons import
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import from react-icons

interface AllocationItemProps {
  allocation: Allocation;
  onEdit: (allocation: Allocation) => void;
  onDelete: (allocationId: string) => void;
}

// ... (formatCurrency helper remains the same)

const AllocationItem: React.FC<AllocationItemProps> = ({ allocation, onEdit, onDelete }) => {
  // ... (spentPercentage and progressBarColor logic remains the same)

  return (
    <div className="bg-gray-50 rounded-md p-3 shadow-sm mb-3 transition hover:bg-gray-100">
       <div className="flex justify-between items-start mb-1">
         <h4 className="font-medium text-gray-700">{allocation.name}</h4>
         <div className="flex space-x-2">
            <button
                onClick={() => onEdit(allocation)}
                className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                aria-label={`Edit allocation ${allocation.name}`}
            >
                {/* Replace Heroicon with react-icon */}
                <FaEdit className="h-4 w-4" /> {/* Adjust size */}
            </button>
             <button
                onClick={() => onDelete(allocation.id)}
                className="text-gray-400 hover:text-red-600 transition-colors p-1"
                aria-label={`Delete allocation ${allocation.name}`}
            >
                {/* Replace Heroicon with react-icon */}
                <FaTrashAlt className="h-4 w-4" /> {/* Adjust size */}
            </button>
         </div>
       </div>

       {/* ... (rest of the component remains the same) ... */}
    </div>
  );
};

export default AllocationItem;
