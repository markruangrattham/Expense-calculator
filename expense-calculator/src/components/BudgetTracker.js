import React, { useState } from 'react';
import { SettingsIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

const BudgetTracker = ({ totalSpent, budget }) => {
  const { setBudget } = useApp();
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [budgetForm, setBudgetForm] = useState({
    amount: budget.amount.toString(),
    period: budget.period
  });

  const remaining = budget.amount - totalSpent;
  const percentageUsed = (totalSpent / budget.amount) * 100;
  const isOverBudget = remaining < 0;

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await setBudget({
        amount: parseFloat(budgetForm.amount),
        period: budgetForm.period
      });
      setShowBudgetForm(false);
      toast.success('Budget updated successfully!');
    } catch (error) {
      toast.error('Failed to update budget');
    }
  };

  const getProgressColor = () => {
    if (percentageUsed >= 90) return 'bg-red-500';
    if (percentageUsed >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRemainingColor = () => {
    if (isOverBudget) return 'text-red-600 dark:text-red-400';
    if (remaining < budget.amount * 0.1) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
          Budget Tracker
        </h2>
        <button
          onClick={() => setShowBudgetForm(!showBudgetForm)}
          className="text-[#3a3a3a] dark:text-[#f5f2e3] hover:text-[#8a9c78] dark:hover:text-[#a3b28f] transition-colors duration-200"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {showBudgetForm ? (
        <form onSubmit={handleBudgetSubmit} className="space-y-4 animate-fadeIn">
          <div>
            <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
              Budget Amount
            </label>
            <input
              type="number"
              value={budgetForm.amount}
              onChange={(e) => setBudgetForm({...budgetForm, amount: e.target.value})}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
              Period
            </label>
            <select
              value={budgetForm.period}
              onChange={(e) => setBudgetForm({...budgetForm, period: e.target.value})}
              className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-4 py-2 rounded font-sans text-white bg-[#8a9c78] dark:bg-[#5a6e48] hover:bg-[#7a8c68] dark:hover:bg-[#4a5e38] transition-colors duration-200 shadow-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowBudgetForm(false)}
              className="px-4 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] hover:bg-[#f0f0f0] dark:hover:bg-[#5a5a5a] transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">
              {budget.period.charAt(0).toUpperCase() + budget.period.slice(1)} Budget
            </span>
            <span className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
              ${budget.amount.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-[#3a3a3a] dark:text-[#f5f2e3]">Spent</span>
              <span className="text-[#3a3a3a] dark:text-[#f5f2e3]">
                ${totalSpent.toFixed(2)}
              </span>
            </div>
            
            <div className="w-full bg-[#e9e5d5] dark:bg-[#4a4a4a] rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(percentageUsed, 100)}%` }}
              ></div>
            </div>

            <div className="flex justify-between text-sm font-sans">
              <span className="text-[#3a3a3a] dark:text-[#f5f2e3]">Remaining</span>
              <span className={`font-semibold ${getRemainingColor()}`}>
                {isOverBudget ? '-' : '$'}{Math.abs(remaining).toFixed(2)}
              </span>
            </div>
          </div>

          {isOverBudget && (
            <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-2 rounded text-sm font-sans">
              ⚠️ You're over budget by ${Math.abs(remaining).toFixed(2)}
            </div>
          )}

          {percentageUsed >= 90 && !isOverBudget && (
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-2 rounded text-sm font-sans">
              ⚠️ You're close to your budget limit
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetTracker; 