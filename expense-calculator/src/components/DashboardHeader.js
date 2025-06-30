import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

const DashboardHeader = ({ error, setError }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError('Error signing out');
    }
  };

  return (
    <header className="dashboard-header">
      <h1>Expense Tracker</h1>
      <div className="header-buttons">
        <button 
          onClick={() => navigate('/charts')} 
          className="charts-btn"
        >
          View Charts
        </button>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader; 