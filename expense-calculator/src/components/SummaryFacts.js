import React from 'react';
import './SummaryFacts.css';

function getMonthYear(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const SummaryFacts = ({ expenses }) => {
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, '0')}`;

  // Calculate totals
  let totalThisMonth = 0;
  let totalLastMonth = 0;
  const categoryTotals = {};

  expenses.forEach(exp => {
    const expMonth = getMonthYear(exp.date);
    if (expMonth === thisMonth) {
      totalThisMonth += exp.amount;
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    } else if (expMonth === lastMonth) {
      totalLastMonth += exp.amount;
    }
  });

  // Calculate savings
  const saved = totalLastMonth - totalThisMonth;
  const savedText = saved > 0
    ? `You saved $${saved.toFixed(2)} compared to last month.`
    : saved < 0
      ? `You spent $${Math.abs(saved).toFixed(2)} more than last month.`
      : `You spent the same as last month.`;

  // Most spent category
  let mostSpentCategory = null;
  let mostSpentAmount = 0;
  for (const [cat, amt] of Object.entries(categoryTotals)) {
    if (amt > mostSpentAmount) {
      mostSpentCategory = cat;
      mostSpentAmount = amt;
    }
  }

  return (
    <div className="summary-facts-card">
      <h3>Summary Facts</h3>
      <ul>
        <li>{savedText}</li>
        <li>
          Most spent category this month: {mostSpentCategory
            ? <><b>{mostSpentCategory}</b> (${mostSpentAmount.toFixed(2)})</>
            : 'N/A'}
        </li>
      </ul>
    </div>
  );
};

export default SummaryFacts; 