import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Charts from './Charts';
import DashboardHeader from './DashboardHeader';
import ExpenseSummary from './ExpenseSummary';
import SummaryFacts from './SummaryFacts';
import AddExpenseForm from './AddExpenseForm';
import ExpenseList from './ExpenseList';
import TagManager from './TagManager';
import SubscriptionManager from './SubscriptionManager';
import BottomNavigation from './BottomNavigation';
import './DashboardRefactored.css';

const DashboardRefactored = () => {
  const [expenses, setExpenses] = useState([]);
  const [tags, setTags] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [newTag, setNewTag] = useState('');
  const [editingTag, setEditingTag] = useState(null);
  const [showCharts, setShowCharts] = useState(false);
  const [expenseView, setExpenseView] = useState('list'); // 'cards' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSub, setNewSub] = useState({
    name: '',
    amount: '',
    category: '',
    startDate: new Date().toISOString().split('T')[0],
    frequency: 'monthly',
    endDate: ''
  });
  const [subLoading, setSubLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState('none');
  const [activeSection, setActiveSection] = useState('none'); // 'add' or 'recent' or 'none'
  const [showTagCreator, setShowTagCreator] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      fetchExpenses();
      fetchTags();
      fetchSubscriptions();
    }
  }, []);

  const fetchExpenses = async () => {
    try {
      const q = query(
        collection(db, 'expenses'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(expensesData);
    } catch (err) {
      setError('Error fetching expenses');
    }
  };

  const fetchTags = async () => {
    try {
      const q = query(
        collection(db, 'tags'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const tagsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTags(tagsData);
      
      // Set default category if no tags exist
      if (tagsData.length > 0 && !newExpense.category) {
        setNewExpense(prev => ({ ...prev, category: tagsData[0].name }));
      }
    } catch (err) {
      setError('Error fetching tags');
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const q = query(
        collection(db, 'subscriptions'),
        where('userId', '==', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const subsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubscriptions(subsData);
    } catch (err) {
      setError('Error fetching subscriptions');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    setLoading(true);
    setError('');

    try {
      const expenseData = {
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'expenses'), expenseData);
      
      // Reset form
      setNewExpense({
        description: '',
        amount: '',
        category: tags.length > 0 ? tags[0].name : '',
        date: new Date().toISOString().split('T')[0]
      });
      
      // Refresh expenses
      fetchExpenses();
    } catch (err) {
      setError('Error adding expense');
    }
    setLoading(false);
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      const tagData = {
        name: newTag.trim(),
        userId: auth.currentUser.uid,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'tags'), tagData);
      setNewTag('');
      setShowTagCreator(false);
      fetchTags();
      // Set the new tag as the selected category
      setNewExpense(prev => ({ ...prev, category: tagData.name }));
    } catch (err) {
      setError('Error adding tag');
    }
  };

  const handleEditTag = async (tagId, newName) => {
    try {
      await updateDoc(doc(db, 'tags', tagId), { name: newName });
      fetchTags();
      setEditingTag(null);
    } catch (err) {
      setError('Error updating tag');
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteDoc(doc(db, 'tags', tagId));
      fetchTags();
    } catch (err) {
      setError('Error deleting tag');
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteDoc(doc(db, 'expenses', expenseId));
      fetchExpenses();
    } catch (err) {
      setError('Error deleting expense');
    }
  };

  const handleAddSub = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setSubLoading(true);
    setError('');
    try {
      const subData = {
        ...newSub,
        amount: parseFloat(newSub.amount),
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };
      await addDoc(collection(db, 'subscriptions'), subData);
      setNewSub({
        name: '',
        amount: '',
        category: tags.length > 0 ? tags[0].name : '',
        startDate: new Date().toISOString().split('T')[0],
        frequency: 'monthly',
        endDate: ''
      });
      fetchSubscriptions();
    } catch (err) {
      setError('Error adding subscription');
    }
    setSubLoading(false);
  };

  const handleDeleteSub = async (subId) => {
    try {
      await deleteDoc(doc(db, 'subscriptions', subId));
      fetchSubscriptions();
    } catch (err) {
      setError('Error deleting subscription');
    }
  };

  function getNextPaymentDate(sub) {
    const today = new Date();
    let next = new Date(sub.startDate);
    while (next < today) {
      if (sub.frequency === 'monthly') {
        next.setMonth(next.getMonth() + 1);
      } else if (sub.frequency === 'weekly') {
        next.setDate(next.getDate() + 7);
      } else if (sub.frequency === 'yearly') {
        next.setFullYear(next.getFullYear() + 1);
      } else {
        break;
      }
    }
    if (sub.endDate && new Date(sub.endDate) < next) return null;
    return next;
  }

  // Filter expenses based on search term and selected month
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = searchTerm === '' || 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMonth = selectedMonth === '' || 
      expense.date.startsWith(selectedMonth);
    
    return matchesSearch && matchesMonth;
  });

  // Helper to robustly parse a date and return YYYY-MM or null
  function getMonthString(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date)) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  // Get unique, valid months from expenses for the filter dropdown
  const availableMonths = Array.from(
    new Set(
      expenses
        .map(exp => getMonthString(exp.date))
        .filter(Boolean)
    )
  ).sort((a, b) => b.localeCompare(a)); // Descending order

  function formatMonthLabel(monthStr) {
    // monthStr is "YYYY-MM"
    const [year, month] = monthStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader error={error} setError={setError} />

      {/* Top summary section */}
      <div className="dashboard-top-summary">
        <ExpenseSummary expenses={expenses} />
        <SummaryFacts expenses={expenses} />
      </div>

      {/* Main Content Area */}
      <div className="dashboard-main-content">
        {/* Add Expense Section */}
        {activeSection === 'add' && (
          <AddExpenseForm
            newExpense={newExpense}
            setNewExpense={setNewExpense}
            tags={tags}
            loading={loading}
            error={error}
            handleSubmit={handleSubmit}
            showTagCreator={showTagCreator}
            setShowTagCreator={setShowTagCreator}
            newTag={newTag}
            setNewTag={setNewTag}
            handleAddTag={handleAddTag}
            onClose={() => setActiveSection('none')}
          />
        )}

        {/* Recent Expenses Section */}
        {activeSection === 'recent' && (
          <ExpenseList
            expenses={expenses}
            filteredExpenses={filteredExpenses}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            expenseView={expenseView}
            setExpenseView={setExpenseView}
            handleDelete={handleDelete}
            availableMonths={availableMonths}
            formatMonthLabel={formatMonthLabel}
            onClose={() => setActiveSection('none')}
          />
        )}

        {/* Tag Manager Section */}
        {activeSection === 'tags' && (
          <TagManager
            tags={tags}
            handleEditTag={handleEditTag}
            handleDeleteTag={handleDeleteTag}
            editingTag={editingTag}
            setEditingTag={setEditingTag}
          />
        )}

        {/* Subscription Manager Section */}
        {activeSection === 'subscriptions' && (
          <SubscriptionManager
            subscriptions={subscriptions}
            newSub={newSub}
            setNewSub={setNewSub}
            handleAddSub={handleAddSub}
            handleDeleteSub={handleDeleteSub}
            subLoading={subLoading}
            tags={tags}
            getNextPaymentDate={getNextPaymentDate}
          />
        )}
      </div>

      <BottomNavigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
    </div>
  );
};

export default DashboardRefactored; 