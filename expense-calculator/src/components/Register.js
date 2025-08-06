import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'sonner';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon } from 'lucide-react';
import Logo from './Logo';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      let errorMessage = 'Failed to create account';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f2e3] dark:bg-[#2a2a2a] px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Logo size="xlarge" />
          </div>
          
          <h1 className="text-4xl font-serif text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
            Create Account
          </h1>
          <p className="text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80 font-sans">
            Start tracking your expenses today
          </p>
        </div>

        <div className="bg-[#b5c4a1] dark:bg-[#3a4d2b] p-8 rounded-lg shadow-md transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
                  placeholder="Enter your email"
                  required
                />
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8a9c78] dark:text-[#a3b28f]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
                  placeholder="Create a password"
                  required
                />
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8a9c78] dark:text-[#a3b28f]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8a9c78] dark:text-[#a3b28f] hover:text-[#3a3a3a] dark:hover:text-[#f5f2e3] transition-colors duration-200"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-[#3a3a3a] dark:text-[#f5f2e3] opacity-60 mt-1">
                Must be at least 6 characters long
              </p>
            </div>

            <div>
              <label className="block text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded font-sans text-[#3a3a3a] dark:text-[#f5f2e3] border border-[#a3b28f] dark:border-[#5a6e48] bg-white dark:bg-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#8a9c78] dark:focus:ring-[#5a6e48] shadow-sm"
                  placeholder="Confirm your password"
                  required
                />
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8a9c78] dark:text-[#a3b28f]" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8a9c78] dark:text-[#a3b28f] hover:text-[#3a3a3a] dark:hover:text-[#f5f2e3] transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded font-sans text-white bg-[#8a9c78] dark:bg-[#5a6e48] hover:bg-[#7a8c68] dark:hover:bg-[#4a5e38] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm font-sans text-[#3a3a3a] dark:text-[#f5f2e3] opacity-80">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#8a9c78] dark:text-[#a3b28f] hover:text-[#7a8c68] dark:hover:text-[#8a9c78] font-semibold transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 