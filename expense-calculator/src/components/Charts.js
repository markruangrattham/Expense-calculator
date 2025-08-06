import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Charts = ({ expenses }) => {
  // Colors for charts - using the design system colors
  const COLORS = [
    '#8a9c78', '#a3b28f', '#b5c4a1', '#7a8c68', '#5a6e48',
    '#4a5e38', '#3a4d2b', '#8a9c78', '#a3b28f', '#b5c4a1'
  ];

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
        <div className="bg-white dark:bg-[#4a4a4a] p-3 rounded-lg shadow-lg border border-[#a3b28f] dark:border-[#5a6e48]">
          <p className="text-[#3a3a3a] dark:text-[#f5f2e3] font-sans">
            {`${label}: $${payload[0].value}`}
          </p>
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
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-sm font-sans">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">Total Expenses</h3>
          <p className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
            ${totalSpending.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">Average Daily</h3>
          <p className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
            ${averageDaily.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">Categories</h3>
          <p className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
            {Object.keys(categoryData).length}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category - Pie Chart */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-4">
            Spending by Category
          </h3>
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
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-60 font-sans">
                No expense data available
              </p>
            </div>
          )}
        </div>

        {/* Monthly Spending - Bar Chart */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-4">
            Monthly Spending Trend
          </h3>
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#a3b28f" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#3a3a3a' }}
                  className="dark:text-[#f5f2e3]"
                />
                <YAxis 
                  tick={{ fill: '#3a3a3a' }}
                  className="dark:text-[#f5f2e3]"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#8a9c78" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-60 font-sans">
                No monthly data available
              </p>
            </div>
          )}
        </div>

        {/* Daily Spending - Line Chart */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-4">
            Daily Spending (Last 30 Days)
          </h3>
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#a3b28f" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#3a3a3a' }}
                  className="dark:text-[#f5f2e3]"
                />
                <YAxis 
                  tick={{ fill: '#3a3a3a' }}
                  className="dark:text-[#f5f2e3]"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#8a9c78" 
                  strokeWidth={3}
                  dot={{ fill: '#8a9c78', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-60 font-sans">
                No daily data available
              </p>
            </div>
          )}
        </div>

        {/* Top Categories - Simple List */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-4">
            Top Spending Categories
          </h3>
          {topCategories.length > 0 ? (
            <div className="space-y-3">
              {topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center space-x-3 p-3 bg-white dark:bg-[#4a4a4a] rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#8a9c78] dark:bg-[#5a6e48] flex items-center justify-center text-white font-sans font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                      {category.name}
                    </div>
                    <div className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
                      ${category.value.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-20 h-2 bg-[#e9e5d5] dark:bg-[#4a4a4a] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(category.value / topCategories[0].value) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-60 font-sans">
                No category data available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts; 