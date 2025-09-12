import React, { useState } from 'react';
import { toast } from 'sonner';
import { SearchIcon, FilterIcon, PlusIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Layout from './Layout';
import Logo from './Logo';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import LeafSummary from './LeafSummary';
import BudgetTracker from './BudgetTracker';

const Dashboard = () => {
  const {
    expenses,
    addExpense,
    budget
  } = useApp();
  
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleExpenseForm = () => {
    setShowExpenseForm(prev => !prev);
  };

  // Filter expenses based on search query and selected category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = searchQuery === '' || 
      expense.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      expense.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (expense.notes && expense.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || expense.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate total spent for the current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const totalSpent = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Get all available categories
  const categories = Array.from(new Set(expenses.map(expense => expense.category)));

  const handleAddExpense = async (expense) => {
    try {
      await addExpense(expense);
      toast.success('Expense added successfully!');
      setShowExpenseForm(false);
    } catch (error) {
      toast.error('Failed to add expense');
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Dashboard Header with Logo */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Logo size="medium" />
              <div>
                <h1 className="text-2xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
                  Dashboard
                </h1>
                <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80 font-sans">
                  Track your expenses and manage your budget
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
            <h2 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-4">
              Total Spent This Month
            </h2>
            <p className="text-4xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
              ${totalSpent.toFixed(2)}
            </p>
          </div>
          
          <BudgetTracker totalSpent={totalSpent} budget={budget} />
          <LeafSummary />
        </div>

        {/* Add Expense Section */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
              {showExpenseForm ? 'Record Your Expense' : 'Add New Expense'}
            </h2>
            {!showExpenseForm && (
              <button
                onClick={toggleExpenseForm}
                className="bg-white dark:bg-[#4a4a4a] text-[#3a3a3a] dark:text-[#f5f2e3] py-2 px-4 rounded-full font-sans flex items-center hover:bg-[#f0f0f0] dark:hover:bg-[#5a5a5a] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] transition-colors duration-200"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Expense
              </button>
            )}
          </div>
          
          {showExpenseForm && (
            <div className="animate-fadeIn">
              <ExpenseForm onAddExpense={handleAddExpense} onCancel={toggleExpenseForm} />
            </div>
          )}
        </div>

        {/* Expenses List Section */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2 sm:mb-0">
              Fresh Spends
            </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Expenses"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm w-full sm:w-auto"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8a9c78] dark:text-[#a3b28f]" />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => handleCategoryFilter(e.target.value === '' ? null : e.target.value)}
                  className="py-2 px-3 pr-8 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm w-full sm:w-auto appearance-none"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <FilterIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8a9c78] dark:text-[#a3b28f] pointer-events-none" />
              </div>
            </div>
          </div>
          
          <ExpenseTable expenses={filteredExpenses} />
          
          <div className="mt-4 bg-[#e9e5d5] dark:bg-[#4a4a4a] py-2 px-4 rounded-full text-center text-[#3a3a3a] dark:text-[#f5f2e3] font-sans shadow-sm">
            Displaying {filteredExpenses.length} of {expenses.length} Expenses
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 