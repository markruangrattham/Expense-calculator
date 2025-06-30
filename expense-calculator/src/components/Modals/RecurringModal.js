import React from 'react';
import './RecurringModal.css';

const RecurringModal = ({ 
  showRecurringModal, 
  setShowRecurringModal, 
  recurringDetails, 
  setRecurringDetails, 
  setIsRecurring,
  recurringOptions 
}) => {
  if (!showRecurringModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>How often should this expense recur?</h4>
        <div className="recurring-options">
          {recurringOptions.map(opt => (
            <label key={opt.value} className="recurring-radio-label">
              <input
                type="radio"
                name="recurring-frequency"
                value={opt.value}
                checked={recurringDetails.frequency === opt.value}
                onChange={e => setRecurringDetails({ ...recurringDetails, frequency: e.target.value })}
              />
              {opt.label}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button
            className="modal-confirm-btn"
            onClick={() => setShowRecurringModal(false)}
          >
            Confirm
          </button>
          <button
            className="modal-cancel-btn"
            onClick={() => {
              setShowRecurringModal(false);
              setIsRecurring(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecurringModal; 