// src/components/BudgetItem.tsx
import React from "react";
import { CiEdit } from "react-icons/ci";
import type { Budget } from "~/interfaces/budgetInterface";

interface BudgetItemProps {
  budget: Budget;
  onEdit: (budget: Budget) => void;
}

// Helper to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const BudgetItem: React.FC<BudgetItemProps> = ({ budget, onEdit }) => {
  const spentPercentage =
    budget.allocatedAmount > 0
      ? Math.min((budget.spentAmount / budget.allocatedAmount) * 100, 100) // Cap at 100%
      : 0;

  // Determine progress bar color based on percentage
  let progressBarColor = "bg-blue-500"; // Default
  if (spentPercentage > 90) {
    progressBarColor = "bg-red-500";
  } else if (spentPercentage > 70) {
    progressBarColor = "bg-yellow-500";
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 transition hover:shadow-md flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{budget.name}</h3>
          <button
            onClick={() => onEdit(budget)}
            className="text-gray-400 hover:text-blue-600 transition-colors p-1 -mt-1 -mr-1"
            aria-label={`Edit budget ${budget.name}`}
          >
            <CiEdit className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          Allocated:{" "}
          <span className="font-medium text-gray-700">
            {formatCurrency(budget.allocatedAmount)}
          </span>
        </p>

        {/* Progress Bar */}
        <div className="mb-1">
           <div className="flex justify-between text-xs text-gray-600 mb-1">
             <span>Spent: {formatCurrency(budget.spentAmount)}</span>
             <span>{spentPercentage.toFixed(0)}%</span>
           </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full ${progressBarColor} transition-all duration-300 ease-out`}
              style={{ width: `${spentPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Placeholder for Sub-budget info/actions */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
        Sub-budgets info...
      </div>
    </div>
  );
};

export default BudgetItem;
