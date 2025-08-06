import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';
import Logo from './Logo';
import { 
  HomeIcon, 
  BarChart3Icon, 
  UserIcon, 
  LogOutIcon,
  SunIcon,
  MoonIcon
} from 'lucide-react';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Charts', href: '/charts', icon: BarChart3Icon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#b5c4a1] dark:bg-[#3a4d2b] shadow-lg transition-colors duration-300">
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo size="large" />
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg font-sans transition-colors duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-[#4a4a4a] text-[#3a3a3a] dark:text-[#f5f2e3] shadow-sm'
                      : 'text-[#3a3a3a] dark:text-[#f5f2e3] hover:bg-white dark:hover:bg-[#4a4a4a] hover:bg-opacity-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 w-64 p-6 space-y-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center w-full px-4 py-3 rounded-lg font-sans text-[#3a3a3a] dark:text-[#f5f2e3] hover:bg-white dark:hover:bg-[#4a4a4a] hover:bg-opacity-50 transition-colors duration-200"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 mr-3" />
            ) : (
              <MoonIcon className="w-5 h-5 mr-3" />
            )}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-lg font-sans text-[#3a3a3a] dark:text-[#f5f2e3] hover:bg-white dark:hover:bg-[#4a4a4a] hover:bg-opacity-50 transition-colors duration-200"
          >
            <LogOutIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 