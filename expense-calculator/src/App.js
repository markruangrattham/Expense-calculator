import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ChartsPage from './components/ChartsPage';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen w-full bg-[#f5f2e3] dark:bg-[#2a2a2a] transition-colors duration-200">
            <Toaster position="top-center" />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/charts" 
                element={
                  <ProtectedRoute>
                    <ChartsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
