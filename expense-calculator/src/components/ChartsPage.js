import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Charts from './Charts';
import { useNavigate } from 'react-router-dom';
import './ChartsPage.css';

const ChartsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      fetchExpenses();
      fetchTags();
    }
    // eslint-disable-next-line
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
      // handle error
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
    } catch (err) {
      // handle error
    }
  };

  return (
    <div className="charts-page-bg">
      <div className="charts-page-container">
        <div className="charts-page-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>&larr; Back to Dashboard</button>
          <h1>Spending Analytics</h1>
        </div>
        <div className="charts-card">
          <Charts expenses={expenses} tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default ChartsPage; 