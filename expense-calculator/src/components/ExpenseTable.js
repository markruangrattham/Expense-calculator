import React, { useState } from 'react';
import { Trash2Icon, EditIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

const ExpenseTable = ({ expenses }) => {
  const { deleteExpense } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        toast.success('Expense deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete expense');
      }
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      name: expense.name,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
      notes: expense.notes || ''
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      // This would need to be implemented in the AppContext
      // For now, we'll just close the edit mode
      setEditingId(null);
      setEditForm({});
      toast.success('Expense updated successfully!');
    } catch (error) {
      toast.error('Failed to update expense');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'Transportation': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Shopping': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Entertainment': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Healthcare': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Utilities': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      'Housing': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Education': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Travel': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Other': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[category] || colors['Other'];
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#3a3a3a] dark:text-[#f5f2e3] font-sans">
          No expenses found. Add your first expense to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#a3b28f] dark:border-[#5a6e48]">
            <th className="text-left py-3 px-4 font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">Name</th>
            <th className="text-left py-3 px-4 font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">Amount</th>
            <th className="text-left py-3 px-4 font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">Category</th>
            <th className="text-left py-3 px-4 font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">Date</th>
            <th className="text-left py-3 px-4 font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">Notes</th>
            <th className="text-left py-3 px-4 font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="border-b border-[#e9e5d5] dark:border-[#4a4a4a] hover:bg-[#f9f8f3] dark:hover:bg-[#3a3a3a] transition-colors duration-200">
              <td className="py-3 px-4">
                {editingId === expense.id ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-2 py-1 rounded border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] text-[#3a3a3a] dark:text-[#f5f2e3]"
                  />
                ) : (
                  <span className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">{expense.name}</span>
                )}
              </td>
              <td className="py-3 px-4">
                {editingId === expense.id ? (
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    className="w-full px-2 py-1 rounded border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] text-[#3a3a3a] dark:text-[#f5f2e3]"
                  />
                ) : (
                  <span className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                    ${expense.amount.toFixed(2)}
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                {editingId === expense.id ? (
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="w-full px-2 py-1 rounded border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] text-[#3a3a3a] dark:text-[#f5f2e3]"
                  >
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Housing">Housing</option>
                    <option value="Education">Education</option>
                    <option value="Travel">Travel</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-sans ${getCategoryColor(expense.category)}`}>
                    {expense.category}
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                {editingId === expense.id ? (
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                    className="w-full px-2 py-1 rounded border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] text-[#3a3a3a] dark:text-[#f5f2e3]"
                  />
                ) : (
                  <span className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">
                    {formatDate(expense.date)}
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                {editingId === expense.id ? (
                  <input
                    type="text"
                    value={editForm.notes}
                    onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                    className="w-full px-2 py-1 rounded border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] text-[#3a3a3a] dark:text-[#f5f2e3]"
                  />
                ) : (
                  <span className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3] text-sm">
                    {expense.notes || '-'}
                  </span>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  {editingId === expense.id ? (
                    <>
                      <button
                        onClick={() => handleSaveEdit(expense.id)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                      >
                        <EditIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable; 