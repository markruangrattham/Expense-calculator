import React from 'react';
import { useApp } from '../contexts/AppContext';
import Layout from './Layout';
import Logo from './Logo';
import Charts from './Charts';

const ChartsPage = () => {
  const { expenses } = useApp();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <Logo size="medium" />
            <div>
              <h1 className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
                Spending Analytics
              </h1>
              <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80 font-sans">
                Visualize your spending patterns and track your financial habits
              </p>
            </div>
          </div>
        </div>
        
        <Charts expenses={expenses} />
      </div>
    </Layout>
  );
};

export default ChartsPage; 