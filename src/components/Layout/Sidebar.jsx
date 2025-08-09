import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiHome, 
  FiUsers, 
  FiUserPlus, 
  FiCalendar, 
  FiDollarSign, 
  FiMessageSquare, 
  FiMonitor, 
  FiFileText, 
  FiSettings, 
  FiX, 
  FiChurch,
  FiMail,
  FiLogOut,
  FiAward,
  FiVideo,
  FiImage,
  FiHeart,
  FiChevronDown,
  FiGitBranch,
  FiZap,
  FiBell
} = FiIcons;

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = (menuPath) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuPath]: !prev[menuPath]
    }));
  };

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/members', icon: FiUsers, label: 'Members' },
    { path: '/visitors', icon: FiUserPlus, label: 'Visitors' },
    { 
      path: '/attendance', 
      icon: FiCalendar, 
      label: 'Attendance',
      submenu: [
        { path: '/attendance', label: 'Overview' },
        { path: '/attendance/digital-checkin', label: 'Digital Check-in' }
      ]
    },
    { 
      path: '/finance', 
      icon: FiDollarSign, 
      label: 'Finance',
      submenu: [
        { path: '/finance', label: 'Overview' },
        { path: '/finance/offering', label: 'Offering' },
        { path: '/finance/tithe', label: 'Tithe' },
        { path: '/finance/online-giving', label: 'Online Giving' }
      ]
    },
    { 
      path: '/communication', 
      icon: FiMessageSquare, 
      label: 'Communication',
      submenu: [
        { path: '/bulk-sms', label: 'Bulk SMS' },
        { path: '/mail', label: 'Mail System' }
      ]
    },
    { path: '/notifications', icon: FiBell, label: 'Notifications' },
    { path: '/branch', icon: FiGitBranch, label: 'Branch & Remittance' },
    { path: '/workflow', icon: FiZap, label: 'Workflow' },
    { path: '/certificates', icon: FiAward, label: 'Certificates' },
    { path: '/sermons', icon: FiVideo, label: 'Sermons' },
    { path: '/media-library', icon: FiImage, label: 'Media Library' },
    { path: '/prayer-requests', icon: FiHeart, label: 'Prayer Requests' },
    { path: '/equipment', icon: FiMonitor, label: 'Equipment' },
    { path: '/reports', icon: FiFileText, label: 'Reports' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-br from-emerald-800 to-black transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-700">
          <div className="flex items-center space-x-3">
            <SafeIcon icon={FiChurch} className="text-2xl text-white" />
            <h1 className="text-xl font-bold text-white">ChurchCMS</h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-emerald-300 transition-colors"
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
                           (item.submenu && item.submenu.some(sub => location.pathname === sub.path));
            const isExpanded = expandedMenus[item.path];
            
            if (item.submenu) {
              return (
                <div key={item.path} className="mb-2">
                  <button
                    onClick={() => toggleSubmenu(item.path)}
                    className={`
                      flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 group
                      ${isActive ? 'bg-white text-emerald-800 shadow-lg' : 'text-white hover:bg-emerald-700 hover:text-white'}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <SafeIcon
                        icon={item.icon}
                        className={`text-lg ${isActive ? 'text-emerald-800' : 'text-emerald-300 group-hover:text-white'}`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <SafeIcon
                      icon={FiIcons.FiChevronDown}
                      className={`text-sm transition-transform ${isExpanded ? 'rotate-180' : ''} ${
                        isActive ? 'text-emerald-800' : 'text-emerald-300 group-hover:text-white'
                      }`}
                    />
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.submenu.map(subItem => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            onClick={onClose}
                            className={`
                              flex items-center px-4 py-2 rounded-lg transition-all duration-200 text-sm
                              ${isSubActive ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:bg-emerald-700 hover:text-white'}
                            `}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 group
                    ${isActive ? 'bg-white text-emerald-800 shadow-lg' : 'text-white hover:bg-emerald-700 hover:text-white'}
                  `}
                >
                  <SafeIcon
                    icon={item.icon}
                    className={`text-lg ${isActive ? 'text-emerald-800' : 'text-emerald-300 group-hover:text-white'}`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            }
          })}
          
          {/* Logout Button */}
          <button
            onClick={onClose}
            className="flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 group text-white hover:bg-red-700 hover:text-white mt-6 cursor-pointer w-full text-left"
            onClick={(e) => {
              localStorage.removeItem('churchUser');
              window.location.href = '/login';
            }}
          >
            <SafeIcon
              icon={FiLogOut}
              className="text-lg text-red-300 group-hover:text-white"
            />
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* Footer - positioned at bottom */}
        <div className="p-6 border-t border-emerald-700 bg-gradient-to-br from-emerald-800 to-black">
          <div className="text-center text-emerald-300 text-sm">
            <p>&copy; 2024 ChurchCMS</p>
            <p>Admin Panel</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;