// src/components/AllocationModal.tsx
import React, { useState, useEffect } from "react";
import type { Allocation, AllocationFormData } from "../../../interfaces/budgetInterface";
import { FaTimes } from "react-icons/fa"; // Import from react-icons

interface AllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (allocationData: AllocationFormData, budgetId: string) => void;
  budgetId: string | null;
  initialData?: Allocation | null;
}

const AllocationModal: React.FC<AllocationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  budgetId,
  initialData,
}) => {
  // ... (state and useEffect remain the same)

  const handleSubmit = (e: any) => {
    // ... (handleSubmit logic remains the same)
  };

  if (!isOpen || !budgetId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close modal"
        >
          {/* Replace Heroicon with react-icon */}
          <FaTimes className="h-5 w-5" /> {/* Adjust size if needed */}
        </button>

        <h2 className="text-xl font-semibold mb-5 text-gray-800">
          {initialData ? "Edit Allocation" : "Add New Allocation"}
        </h2>

        {/* ... (form remains the same) ... */}
      </div>
    </div>
  );
};

export default AllocationModal;
