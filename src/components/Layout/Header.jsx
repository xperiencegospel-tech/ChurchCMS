import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiBell, FiSearch, FiUser, FiLogOut } = FiIcons;

const Header = ({ onMenuClick }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: 'New Member Registration',
      message: 'John Smith has registered as a new member',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'Donation Received',
      message: 'Sarah Johnson donated ₦50,000',
      time: '4 hours ago',
      unread: true
    },
    {
      id: 3,
      title: 'Event Reminder',
      message: 'Youth meeting tomorrow at 6 PM',
      time: '1 day ago',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleProfileClick = () => {
    setShowProfileMenu(false);
    navigate('/profile');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <SafeIcon icon={FiMenu} className="text-xl" />
          </button>
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-96">
            <SafeIcon icon={FiSearch} className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search members, visitors, or records..."
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <SafeIcon icon={FiBell} className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 relative">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Church Administrator</p>
            </div>
            <button 
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full text-white hover:from-emerald-600 hover:to-emerald-800 transition-all"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <SafeIcon icon={FiUser} className="text-lg" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleProfileClick}
                >
                  Your Profile
                </button>
                <Link 
                  to="/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <button 
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                  onClick={(e) => {
                    setShowProfileMenu(false);
                    localStorage.removeItem('churchUser');
                    window.location.href = '/login';
                  }}
                >
                  <SafeIcon icon={FiLogOut} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;