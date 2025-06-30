import React from 'react';
import './SubscriptionManager.css';

const SubscriptionManager = ({
  subscriptions,
  newSub,
  setNewSub,
  handleAddSub,
  handleDeleteSub,
  subLoading,
  tags,
  getNextPaymentDate
}) => {
  return (
    <div className="subscriptions-section">
      <h2>Manage Subscriptions</h2>
      <form onSubmit={handleAddSub} className="sub-form">
        <input
          type="text"
          placeholder="Subscription name"
          value={newSub.name}
          onChange={(e) => setNewSub({...newSub, name: e.target.value})}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newSub.amount}
          onChange={(e) => setNewSub({...newSub, amount: e.target.value})}
          step="0.01"
          min="0"
          required
        />
        <select
          value={newSub.category}
          onChange={(e) => setNewSub({...newSub, category: e.target.value})}
          required
        >
          <option value="">Select Category</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>{tag.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={newSub.startDate}
          onChange={(e) => setNewSub({...newSub, startDate: e.target.value})}
          required
        />
        <select
          value={newSub.frequency}
          onChange={(e) => setNewSub({...newSub, frequency: e.target.value})}
          required
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <input
          type="date"
          placeholder="End date (optional)"
          value={newSub.endDate}
          onChange={(e) => setNewSub({...newSub, endDate: e.target.value})}
        />
        <button type="submit" disabled={subLoading}>
          {subLoading ? 'Adding...' : 'Add Subscription'}
        </button>
      </form>
      
      <div className="subs-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Frequency</th>
              <th>Next Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => {
              const nextPayment = getNextPaymentDate(sub);
              return (
                <tr key={sub.id}>
                  <td>{sub.name}</td>
                  <td>${sub.amount.toFixed(2)}</td>
                  <td>{sub.category}</td>
                  <td>{sub.frequency}</td>
                  <td>
                    {nextPayment 
                      ? nextPayment.toLocaleDateString()
                      : 'Ended'
                    }
                  </td>
                  <td>
                    <button onClick={() => handleDeleteSub(sub.id)}>
                      ×
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {subscriptions.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            No subscriptions yet. Add your first subscription above!
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManager; 