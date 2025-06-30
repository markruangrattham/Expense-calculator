import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({
  expenses,
  filteredExpenses,
  searchTerm,
  setSearchTerm,
  selectedMonth,
  setSelectedMonth,
  expenseView,
  setExpenseView,
  handleDelete,
  availableMonths,
  formatMonthLabel,
  onClose
}) => {
  return (
    <div className="expenses-list">
      <div className="section-header">
        <h3>Recent Expenses</h3>
        <button 
          className="close-section-btn"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="expenses-controls">
        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-filter"
          >
            <option value="">All Months</option>
            {availableMonths.map(month => (
              <option key={month} value={month}>
                {formatMonthLabel(month)}
              </option>
            ))}
          </select>
        </div>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${expenseView === 'cards' ? 'active' : ''}`}
            onClick={() => setExpenseView('cards')}
          >
            <span className="toggle-icon">⊞</span>
            Cards
          </button>
          <button 
            className={`toggle-btn ${expenseView === 'list' ? 'active' : ''}`}
            onClick={() => setExpenseView('list')}
          >
            <span className="toggle-icon">☰</span>
            List
          </button>
        </div>
      </div>
      {filteredExpenses.length === 0 ? (
        <p className="no-expenses">
          {expenses.length === 0 
            ? 'No expenses yet. Add your first expense above!' 
            : 'No expenses match your search criteria.'
          }
        </p>
      ) : expenseView === 'cards' ? (
        <div className="expenses-grid">
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="expense-card">
              <div className="expense-header">
                <h4>{expense.description}</h4>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="delete-btn"
                >
                  ×
                </button>
              </div>
              <p className="expense-amount">${expense.amount.toFixed(2)}</p>
              <p className="expense-category">{expense.category}</p>
              <p className="expense-date">{new Date(expense.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="expenses-table">
          <div className="table-header">
            <div className="table-cell">Description</div>
            <div className="table-cell">Amount</div>
            <div className="table-cell">Category</div>
            <div className="table-cell">Date</div>
            <div className="table-cell">Actions</div>
          </div>
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="table-row">
              <div className="table-cell description-cell">
                <strong>{expense.description}</strong>
              </div>
              <div className="table-cell amount-cell">
                <span className="amount-value">${expense.amount.toFixed(2)}</span>
              </div>
              <div className="table-cell category-cell">
                <span className="category-tag">{expense.category}</span>
              </div>
              <div className="table-cell date-cell">
                {new Date(expense.date).toLocaleDateString()}
              </div>
              <div className="table-cell action-cell">
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="delete-btn-small"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {filteredExpenses.length > 0 && (
        <div className="expenses-summary">
          <p>Showing {filteredExpenses.length} of {expenses.length} expenses</p>
          <p>Total: ${filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 