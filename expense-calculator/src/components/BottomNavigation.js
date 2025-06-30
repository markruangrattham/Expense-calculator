import React from 'react';
import './BottomNavigation.css';

const BottomNavigation = ({ activeSection, setActiveSection }) => {
  return (
    <div className="bottom-navigation">
      <button 
        className={`nav-btn ${activeSection === 'add' ? 'active' : ''}`}
        onClick={() => setActiveSection(activeSection === 'add' ? 'none' : 'add')}
      >
        Add Expenses
      </button>
      <button 
        className={`nav-btn ${activeSection === 'recent' ? 'active' : ''}`}
        onClick={() => setActiveSection(activeSection === 'recent' ? 'none' : 'recent')}
      >
        Show Recent Expenses
      </button>
    </div>
  );
};

export default BottomNavigation; 