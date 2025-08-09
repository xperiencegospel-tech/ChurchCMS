import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Button from '../../components/UI/Button';

const { FiUser, FiLock, FiLogIn, FiChurch } = FiIcons;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  const existingUser = localStorage.getItem('churchUser');
  if (existingUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Mock authentication logic
    setTimeout(() => {
      // More flexible authentication - accept multiple valid credentials
      const validCredentials = [
        { email: 'admin@church.com', password: 'password' },
        { email: 'admin@gracechurch.org', password: 'password' },
        { email: 'pastor@church.com', password: 'password' },
        { email: 'demo@church.com', password: 'demo' }
      ];
      
      const isValidUser = validCredentials.some(
        cred => cred.email.toLowerCase() === email.toLowerCase() && cred.password === password
      );
      
      if (isValidUser) {
        // Set user in localStorage or context
        localStorage.setItem('churchUser', JSON.stringify({
          id: 1,
          name: email.includes('pastor') ? 'Pastor John' : 'Admin User',
          email: email,
          role: 'Administrator'
        }));
        
        // Force a page reload to ensure the app recognizes the authentication
        window.location.href = '/dashboard';
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4">
            <SafeIcon icon={FiChurch} className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">ChurchCMS</h1>
          <p className="text-gray-600 mt-1">Login to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiUser} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="admin@church.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiLock} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            icon={FiLogIn}
            loading={loading}
            disabled={loading}
            className="w-full py-3"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Demo Credentials:</p>
          <p>Email: admin@church.com or demo@church.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;