import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

const ExpenseForm = ({ onAddExpense, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Utilities',
    'Housing',
    'Education',
    'Travel',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    onAddExpense(expenseData);
    
    // Reset form
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expense Name */}
        <div>
          <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
            Expense Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
            placeholder="e.g., Groceries"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
            Amount *
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
            placeholder="0.00"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm resize-none"
          placeholder="Add any additional notes..."
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] hover:bg-[#f0f0f0] dark:hover:bg-[#5a5a5a] transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded font-sans text-white bg-[#8a9c78] dark:bg-[#5a6e48] hover:bg-[#7a8c68] dark:hover:bg-[#4a5e38] transition-colors duration-200 shadow-sm"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm; 