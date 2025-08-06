import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import Layout from './Layout';
import { toast } from 'sonner';
import { 
  UserIcon, 
  MailIcon, 
  CalendarIcon, 
  SettingsIcon,
  Trash2Icon,
  EditIcon,
  SaveIcon,
  XIcon
} from 'lucide-react';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode, expenses, budget } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || ''
  });

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to log out. Please try again.');
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Here you would typically update the user profile
      // For now, we'll just show a success message
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || ''
    });
    setIsEditing(false);
  };

  // Calculate user statistics
  const totalExpenses = expenses.length;
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = totalExpenses > 0 ? totalSpent / totalExpenses : 0;
  const categories = Array.from(new Set(expenses.map(expense => expense.category)));
  const joinDate = currentUser?.metadata?.creationTime 
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
    : 'Unknown';

  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
              Profile
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center px-4 py-2 rounded-lg font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] hover:bg-white dark:hover:bg-[#4a4a4a] transition-colors duration-200"
            >
              {isEditing ? (
                <>
                  <XIcon className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <EditIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-[#8a9c78] dark:bg-[#5a6e48] rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">
                {currentUser?.displayName || 'User'}
              </h2>
              <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80 font-sans">
                Member since {joinDate}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-4">
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
                Display Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.displayName}
                  onChange={(e) => setEditForm({...editForm, displayName: e.target.value})}
                  className="w-full px-3 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
                />
              ) : (
                <div className="flex items-center px-3 py-2 bg-white dark:bg-[#4a4a4a] rounded border border-[#a3b28f] dark:border-[#5a6e48]">
                  <UserIcon className="w-4 h-4 text-[#8a9c78] dark:text-[#a3b28f] mr-2" />
                  <span className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">
                    {currentUser?.displayName || 'No display name set'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
                Email Address
              </label>
              <div className="flex items-center px-3 py-2 bg-white dark:bg-[#4a4a4a] rounded border border-[#a3b28f] dark:border-[#5a6e48]">
                <MailIcon className="w-4 h-4 text-[#8a9c78] dark:text-[#a3b28f] mr-2" />
                <span className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">
                  {currentUser?.email}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
                Member Since
              </label>
              <div className="flex items-center px-3 py-2 bg-white dark:bg-[#4a4a4a] rounded border border-[#a3b28f] dark:border-[#5a6e48]">
                <CalendarIcon className="w-4 h-4 text-[#8a9c78] dark:text-[#a3b28f] mr-2" />
                <span className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3]">
                  {joinDate}
                </span>
              </div>
            </div>

            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center px-4 py-2 rounded font-sans text-white bg-[#8a9c78] dark:bg-[#5a6e48] hover:bg-[#7a8c68] dark:hover:bg-[#4a5e38] transition-colors duration-200 shadow-sm"
                >
                  <SaveIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] hover:bg-[#f0f0f0] dark:hover:bg-[#5a5a5a] transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
            <h3 className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">Total Expenses</h3>
            <p className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">{totalExpenses}</p>
          </div>
          
          <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
            <h3 className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">Total Spent</h3>
            <p className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">${totalSpent.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
            <h3 className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">Average Expense</h3>
            <p className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">${averageExpense.toFixed(2)}</p>
          </div>
          
          <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
            <h3 className="text-lg font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">Categories</h3>
            <p className="text-3xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3]">{categories.length}</p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-6 rounded-lg shadow-md transition-colors duration-300">
          <h3 className="text-xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-4">
            Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-[#4a4a4a] rounded-lg">
              <div className="flex items-center">
                <SettingsIcon className="w-5 h-5 text-[#8a9c78] dark:text-[#a3b28f] mr-3" />
                <div>
                  <h4 className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                    Dark Mode
                  </h4>
                  <p className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
                    Toggle between light and dark themes
                  </p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  darkMode ? 'bg-[#8a9c78] dark:bg-[#5a6e48]' : 'bg-[#a3b28f] dark:bg-[#5a6e48]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white dark:bg-[#4a4a4a] rounded-lg">
              <div className="flex items-center">
                <UserIcon className="w-5 h-5 text-[#8a9c78] dark:text-[#a3b28f] mr-3" />
                <div>
                  <h4 className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                    Current Budget
                  </h4>
                  <p className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
                    ${budget.amount.toFixed(2)} {budget.period}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg shadow-md border border-red-200 dark:border-red-800">
          <h3 className="text-xl font-serif text-red-800 dark:text-red-200 mb-4">
            Danger Zone
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-[#4a4a4a] rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center">
                <Trash2Icon className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <div>
                  <h4 className="font-sans text-[#3a3a3a] dark:text-[#f5f2e3] font-semibold">
                    Logout
                  </h4>
                  <p className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
                    Sign out of your account
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded font-sans text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 