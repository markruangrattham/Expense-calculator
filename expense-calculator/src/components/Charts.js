import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Charts.css';

const Charts = ({ expenses, tags }) => {
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1'];

  // Calculate spending by category
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  // Calculate monthly spending
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    acc[monthYear] = (acc[monthYear] || 0) + expense.amount;
    return acc;
  }, {});

  const barData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({
      month: month,
      total: parseFloat(total.toFixed(2))
    }));

  // Calculate daily spending for line chart (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyData = expenses
    .filter(expense => new Date(expense.date) >= thirtyDaysAgo)
    .reduce((acc, expense) => {
      const date = expense.date;
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {});

  const lineData = Object.entries(dailyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, total]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      total: parseFloat(total.toFixed(2))
    }));

  // Calculate top spending categories
  const topCategories = pieData
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Calculate average daily spending
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageDaily = totalSpending / 30; // Assuming 30 days

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : $${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="charts-container">
      <div className="charts-header">
        <h2>Expense Analytics</h2>
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Total Expenses</span>
            <span className="stat-value">${totalSpending.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Daily</span>
            <span className="stat-value">${averageDaily.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Categories</span>
            <span className="stat-value">{Object.keys(categoryData).length}</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Spending by Category - Pie Chart */}
        <div className="chart-card">
          <h3>Spending by Category</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="no-data">No expense data available</div>
          )}
        </div>

        {/* Monthly Spending - Bar Chart */}
        <div className="chart-card">
          <h3>Monthly Spending Trend</h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="no-data">No monthly data available</div>
          )}
        </div>

        {/* Daily Spending - Line Chart */}
        <div className="chart-card">
          <h3>Daily Spending (Last 30 Days)</h3>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="no-data">No daily data available</div>
          )}
        </div>

        {/* Top Categories - Simple List */}
        <div className="chart-card">
          <h3>Top Spending Categories</h3>
          {topCategories.length > 0 ? (
            <div className="top-categories">
              {topCategories.map((category, index) => (
                <div key={category.name} className="category-item">
                  <div className="category-rank">#{index + 1}</div>
                  <div className="category-info">
                    <div className="category-name">{category.name}</div>
                    <div className="category-amount">${category.value.toFixed(2)}</div>
                  </div>
                  <div 
                    className="category-bar" 
                    style={{ 
                      width: `${(category.value / topCategories[0].value) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  ></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">No category data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts; 