import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, onSnapshot } from 'firebase/firestore';

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState({ amount: 1000, period: 'monthly' });
  const [darkMode, setDarkMode] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState(null);

  // Load dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load expenses from Firebase when user changes
  useEffect(() => {
    if (!currentUser) {
      setExpenses([]);
      return;
    }

    const expensesRef = collection(db, 'expenses');
    const q = query(expensesRef, where('userId', '==', currentUser.uid));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const expensesData = [];
      querySnapshot.forEach((doc) => {
        expensesData.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(expensesData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Load budget from Firebase when user changes
  useEffect(() => {
    if (!currentUser) {
      setBudget({ amount: 1000, period: 'monthly' });
      return;
    }

    const loadBudget = async () => {
      try {
        const budgetRef = collection(db, 'budgets');
        const q = query(budgetRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const budgetDoc = querySnapshot.docs[0];
          setBudget(budgetDoc.data());
        }
      } catch (error) {
        console.error('Error loading budget:', error);
      }
    };

    loadBudget();
  }, [currentUser]);

  const addExpense = async (expenseData) => {
    if (!currentUser) return;

    try {
      const expenseWithUser = {
        ...expenseData,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'expenses'), expenseWithUser);
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const deleteExpense = async (expenseId) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, 'expenses', expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  };

  const editExpense = async (expenseId, updatedExpense) => {
    if (!currentUser) return;

    try {
      const expenseRef = doc(db, 'expenses', expenseId);
      await updateDoc(expenseRef, updatedExpense);
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  const updateBudget = async (newBudget) => {
    if (!currentUser) return;

    try {
      const budgetRef = collection(db, 'budgets');
      const q = query(budgetRef, where('userId', '==', currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const budgetDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'budgets', budgetDoc.id), newBudget);
      } else {
        await addDoc(budgetRef, { ...newBudget, userId: currentUser.uid });
      }
      
      setBudget(newBudget);
    } catch (error) {
      console.error('Error updating budget:', error);
      throw error;
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    editExpense,
    budget,
    setBudget: updateBudget,
    darkMode,
    toggleDarkMode,
    filteredCategory,
    setFilteredCategory
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 