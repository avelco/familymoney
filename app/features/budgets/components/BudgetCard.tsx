// src/components/BudgetCard.tsx
import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa"; // Import from react-icons
import AllocationItem from "~/features/allocation/components/AllocationItem";
import AllocationModal from "~/features/allocation/components/AllocationModal";
import type { Allocation, AllocationFormData, Budget } from "~/interfaces/budgetInterface";

interface BudgetCardProps {
  budget: Budget;
  onEditBudget: (budget: Budget) => void; // Callback to edit the budget itself
  onDeleteBudget: (budgetId: string) => void; // Callback to delete the budget
  // Callbacks for allocation changes within this budget
  onAddAllocation: (allocationData: AllocationFormData, budgetId: string) => void;
  onUpdateAllocation: (allocationData: AllocationFormData, budgetId: string) => void;
  onDeleteAllocation: (allocationId: string, budgetId: string) => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  budget,
  onEditBudget,
  onDeleteBudget,
  onAddAllocation,
  onUpdateAllocation,
  onDeleteAllocation,
}) => {
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(null);

  const handleOpenAddAllocationModal = () => {
    setEditingAllocation(null);
    setIsAllocationModalOpen(true);
  };

  const handleOpenEditAllocationModal = (allocation: Allocation) => {
    setEditingAllocation(allocation);
    setIsAllocationModalOpen(true);
  };

  const handleCloseAllocationModal = () => {
    setIsAllocationModalOpen(false);
    setEditingAllocation(null);
  };

  const handleAllocationSubmit = (
    allocationData: AllocationFormData,
    budgetId: string
  ) => {
    if (editingAllocation) {
      // We are editing
      onUpdateAllocation({ ...allocationData, id: editingAllocation.id }, budgetId);
    } else {
      // We are adding
      onAddAllocation(allocationData, budgetId);
    }
    handleCloseAllocationModal();
  };

  const handleDeleteAllocation = (allocationId: string) => {
     if (window.confirm("Are you sure you want to delete this allocation?")) {
        onDeleteAllocation(allocationId, budget.id);
     }
  }

  const totalAllocated = budget.allocations.reduce((sum, alloc) => sum + alloc.allocatedAmount, 0);
  const totalSpent = budget.allocations.reduce((sum, alloc) => sum + alloc.spentAmount, 0);

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-5 transition hover:shadow-md flex flex-col">
      {/* Budget Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{budget.name}</h2>
        <div className="flex space-x-2">
           <button
            onClick={() => onEditBudget(budget)}
            className="text-gray-500 hover:text-blue-600 p-1"
            aria-label={`Edit budget ${budget.name}`}
           >
             <FaEdit className="h-5 w-5" />
           </button>
            <button
            onClick={() => onDeleteBudget(budget.id)}
            className="text-gray-500 hover:text-red-600 p-1"
            aria-label={`Delete budget ${budget.name}`}
           >
             <FaTrashAlt className="h-5 w-5" />
           </button>
        </div>
      </div>

      {/* Budget Summary (Optional) */}
       <div className="mb-4 text-sm text-gray-600 flex justify-between">
           <span>Total Allocated: <span className="font-medium">{formatCurrency(totalAllocated)}</span></span>
           <span>Total Spent: <span className="font-medium">{formatCurrency(totalSpent)}</span></span>
       </div>

      {/* Allocations List */}
      <div className="flex-grow mb-4">
        <h3 className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Allocations</h3>
        {budget.allocations.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No allocations added yet.</p>
        ) : (
          <div className="space-y-2">
            {budget.allocations.map((alloc) => (
              <AllocationItem
                key={alloc.id}
                allocation={alloc}
                onEdit={handleOpenEditAllocationModal}
                onDelete={handleDeleteAllocation}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Allocation Button */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <button
          onClick={handleOpenAddAllocationModal}
          className="w-full inline-flex items-center justify-center px-3 py-1.5 border border-dashed border-gray-300 text-sm font-medium rounded text-gray-700 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
        >
          <FaPlus className="h-4 w-4 mr-1.5" />
          Add Allocation
        </button>
      </div>

      {/* Allocation Modal Instance */}
      <AllocationModal
        isOpen={isAllocationModalOpen}
        onClose={handleCloseAllocationModal}
        onSubmit={handleAllocationSubmit}
        budgetId={budget.id} // Pass the current budget's ID
        initialData={editingAllocation}
      />
    </div>
  );
};

// Re-add formatCurrency helper here if not globally available
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
};


export default BudgetCard;
