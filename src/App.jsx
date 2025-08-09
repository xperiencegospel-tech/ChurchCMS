import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Members from './pages/Members/Members';
import Visitors from './pages/Visitors/Visitors';
import Attendance from './pages/Attendance/Attendance';
import Finance from './pages/Finance/Finance';
import BulkSms from './pages/BulkSms/BulkSms';
import Mail from './pages/Mail/Mail';
import Equipment from './pages/Equipment/Equipment';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import Certificates from './pages/Certificates/Certificates';
import Sermons from './pages/Sermons/Sermons';
import MediaLibrary from './pages/MediaLibrary/MediaLibrary';
import PrayerRequests from './pages/PrayerRequests/PrayerRequests';
import Branch from './pages/Branch/Branch';
import Workflow from './pages/Workflow/Workflow';
import DigitalCheckin from './pages/Attendance/DigitalCheckin';
import Offering from './pages/Finance/Offering';
import Tithe from './pages/Finance/Tithe';
import OnlineGiving from './pages/Finance/OnlineGiving';
import Notifications from './pages/Notifications/Notifications';
import Login from './pages/Auth/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('churchUser');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.id) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('churchUser');
      }
    }
    setLoading(false);
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/members" 
          element={
            <ProtectedRoute>
              <Layout>
                <Members />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/visitors" 
          element={
            <ProtectedRoute>
              <Layout>
                <Visitors />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/attendance" 
          element={
            <ProtectedRoute>
              <Layout>
                <Attendance />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/attendance/digital-checkin" 
          element={
            <ProtectedRoute>
              <Layout>
                <DigitalCheckin />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/finance/offering" 
          element={
            <ProtectedRoute>
              <Layout>
                <Offering />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/finance/tithe" 
          element={
            <ProtectedRoute>
              <Layout>
                <Tithe />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/finance/online-giving" 
          element={
            <ProtectedRoute>
              <Layout>
                <OnlineGiving />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/finance" 
          element={
            <ProtectedRoute>
              <Layout>
                <Finance />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/bulk-sms" 
          element={
            <ProtectedRoute>
              <Layout>
                <BulkSms />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/mail" 
          element={
            <ProtectedRoute>
              <Layout>
                <Mail />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/equipment" 
          element={
            <ProtectedRoute>
              <Layout>
                <Equipment />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/certificates" 
          element={
            <ProtectedRoute>
              <Layout>
                <Certificates />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/sermons" 
          element={
            <ProtectedRoute>
              <Layout>
                <Sermons />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/media-library" 
          element={
            <ProtectedRoute>
              <Layout>
                <MediaLibrary />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/prayer-requests" 
          element={
            <ProtectedRoute>
              <Layout>
                <PrayerRequests />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/branch" 
          element={
            <ProtectedRoute>
              <Layout>
                <Branch />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/workflow" 
          element={
            <ProtectedRoute>
              <Layout>
                <Workflow />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Layout>
                <div className="space-y-6 fade-in">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                    <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        AU
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Admin User</h2>
                        <p className="text-gray-600">Church Administrator</p>
                        <p className="text-sm text-gray-500">admin@church.com</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text" 
                          defaultValue="Admin User"
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          defaultValue="admin@church.com"
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input 
                          type="tel" 
                          defaultValue="+1 (555) 123-4567"
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input 
                          type="text" 
                          defaultValue="Church Administrator"
                          disabled
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </Layout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;