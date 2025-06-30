import React from 'react';
import TagCreatorModal from './Modals/TagCreatorModal';
// import RecurringModal from './Modals/RecurringModal'; // COMMENTED OUT
import './AddExpenseForm.css';

const AddExpenseForm = ({
  newExpense,
  setNewExpense,
  tags,
  loading,
  error,
  handleSubmit,
  showTagCreator,
  setShowTagCreator,
  newTag,
  setNewTag,
  handleAddTag,
  // isRecurring, // COMMENTED OUT
  // setIsRecurring, // COMMENTED OUT
  // showRecurringModal, // COMMENTED OUT
  // setShowRecurringModal, // COMMENTED OUT
  // recurringDetails, // COMMENTED OUT
  // setRecurringDetails, // COMMENTED OUT
  // recurringOptions, // COMMENTED OUT
  onClose
}) => {
  return (
    <div className="add-expense-section">
      <div className="section-header">
        <h3>Add New Expense</h3>
        <button 
          className="close-section-btn"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      
      {/* Tag Creator Modal */}
      <TagCreatorModal
        showTagCreator={showTagCreator}
        setShowTagCreator={setShowTagCreator}
        newTag={newTag}
        setNewTag={setNewTag}
        handleAddTag={handleAddTag}
      />
      
      {/* Regular Expense Form */}
      <form onSubmit={handleSubmit} className="expense-form modern-expense-form">
        <div className="form-group">
          <input
            type="text"
            placeholder=" "
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            required
            className="modern-input"
            id="description-input"
          />
          <label htmlFor="description-input" className="floating-label">Description</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder=" "
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            step="0.01"
            min="0"
            required
            className="modern-input"
            id="amount-input"
          />
          <label htmlFor="amount-input" className="floating-label">Amount</label>
        </div>
        <div className="modern-category-selector">
          <div className="form-group" style={{marginBottom: 0, flex: 1}}>
            <select
              id="tags-select"
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              required
              className="modern-input"
            >
              <option value="" disabled hidden></option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.name}>{tag.name}</option>
              ))}
            </select>
            <label htmlFor="tags-select" className="floating-label">Select Tag</label>
          </div>
          <button 
            type="button"
            className="create-tag-btn-large"
            onClick={() => setShowTagCreator(true)}
            title="Create new tag"
          >
            <span style={{fontWeight: 700, fontSize: '1.3em', marginRight: 8}}>+</span> New Tag
          </button>
        </div>
        <div className="form-group">
          <input
            type="date"
            placeholder=" "
            value={newExpense.date}
            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
            required
            className="modern-input"
            id="date-input"
          />
          <label htmlFor="date-input" className="floating-label">Date</label>
        </div>
        {/* Recurring checkbox - COMMENTED OUT
        <div className="modern-checkbox-row">
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={e => {
              setIsRecurring(e.target.checked);
              if (e.target.checked) setShowRecurringModal(true);
            }}
            id="recurring-checkbox"
            className="modern-checkbox"
          />
          <label htmlFor="recurring-checkbox" className="modern-checkbox-label">
            Recurring/Subscription
          </label>
        </div>
        */}
        {/* Centered button row */}
        <div className="modern-submit-row">
          <button type="submit" disabled={loading} className="modern-submit-btn">
            {loading ? 'Adding...' : 'Add Expense'}
          </button>
        </div>
      </form>

      {/* Recurring Frequency Modal - COMMENTED OUT
      <RecurringModal
        showRecurringModal={showRecurringModal}
        setShowRecurringModal={setShowRecurringModal}
        recurringDetails={recurringDetails}
        setRecurringDetails={setRecurringDetails}
        setIsRecurring={setIsRecurring}
        recurringOptions={recurringOptions}
      />
      */}
    </div>
  );
};

export default AddExpenseForm; 