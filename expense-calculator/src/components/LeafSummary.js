import React from 'react';
import { LeafIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const LeafSummary = () => {
  const { expenses } = useApp();

  // Calculate summary statistics
  const totalExpenses = expenses.length;
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = totalExpenses > 0 ? totalAmount / totalExpenses : 0;

  // Get most common category
  const categoryCounts = {};
  expenses.forEach(expense => {
    categoryCounts[expense.category] = (categoryCounts[expense.category] || 0) + 1;
  });
  
  const mostCommonCategory = Object.keys(categoryCounts).length > 0 
    ? Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b)
    : 'None';

  // Get recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo;
  });

  const recentTotal = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
      <div className="flex items-center mb-4">
        <LeafIcon className="w-6 h-6 text-[#3a3a3a] dark:text-[#f5f2e3] mr-2" />
        <h2 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
          Summary
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
              {totalExpenses}
            </div>
            <div className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
              Total Expenses
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
              ${totalAmount.toFixed(2)}
            </div>
            <div className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
              Total Spent
            </div>
          </div>
        </div>

        <div className="border-t border-[#a3b28f] dark:border-[#5a6e48] pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
                Average per expense
              </span>
              <span className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                ${averageExpense.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
                Last 7 days
              </span>
              <span className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                ${recentTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
                Top category
              </span>
              <span className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                {mostCommonCategory}
              </span>
            </div>
          </div>
        </div>

        {totalExpenses === 0 && (
          <div className="text-center py-4">
            <div className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-60">
              Start tracking your expenses to see insights here!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeafSummary; 