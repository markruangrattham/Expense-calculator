import React from 'react';
import './ExpenseSummary.css';

const ExpenseSummary = ({ expenses }) => {
  const now = new Date();
  const monthName = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  const currentMonthExpenses = expenses.filter(exp => {
    const expDate = new Date(exp.date);
    return (
      expDate.getFullYear() === now.getFullYear() &&
      expDate.getMonth() === now.getMonth()
    );
  });

  const totalAmount = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const expenseCount = currentMonthExpenses.length;

  return (
    <div className="total-expenses-section">
      <div className="summary-card total-card">
        <h2>Total Expenses in {monthName} {year}</h2>
        <div className="total-amount">
          ${totalAmount.toFixed(2)}
        </div>
        <div className="expenses-count">
          {expenseCount} expenses this month
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary; 