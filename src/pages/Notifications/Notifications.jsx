import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import NotificationForm from '../../components/Notifications/NotificationForm';
import NotificationTemplateForm from '../../components/Notifications/NotificationTemplateForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiBell,
  FiCalendar,
  FiClock,
  FiUser,
  FiMail,
  FiMessageSquare,
  FiSettings,
  FiPlay,
  FiPause,
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiGift,
  FiHeart,
  FiAward,
  FiRefreshCw
} = FiIcons;

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Mock data for automated notifications
  const automatedNotifications = [
    {
      id: 1,
      type: 'Birthday',
      title: 'Birthday Reminder - Sarah Johnson',
      recipient: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      scheduledDate: '2023-06-15',
      scheduledTime: '09:00',
      status: 'Scheduled',
      template: 'Birthday Wishes',
      message: 'Happy Birthday, Sarah! May God bless you abundantly in the year ahead. - Grace Community Church',
      triggerDate: '2023-06-15',
      sent: false
    },
    {
      id: 2,
      type: 'Anniversary',
      title: 'Wedding Anniversary - John & Mary Smith',
      recipient: 'John & Mary Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      scheduledDate: '2023-06-20',
      scheduledTime: '10:00',
      status: 'Scheduled',
      template: 'Anniversary Celebration',
      message: 'Congratulations on your wedding anniversary! May God continue to bless your marriage.',
      triggerDate: '2023-06-20',
      sent: false
    },
    {
      id: 3,
      type: 'Membership Milestone',
      title: '5 Year Membership - Mike Wilson',
      recipient: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+1 (555) 456-7890',
      scheduledDate: '2023-06-10',
      scheduledTime: '11:00',
      status: 'Sent',
      template: 'Membership Milestone',
      message: 'Congratulations on 5 years of faithful membership! Thank you for your dedication to our church family.',
      triggerDate: '2023-06-10',
      sent: true
    },
    {
      id: 4,
      type: 'Event Reminder',
      title: 'Youth Camp Registration Reminder',
      recipient: 'All Youth Parents',
      email: 'youth-parents@church.com',
      phone: null,
      scheduledDate: '2023-06-12',
      scheduledTime: '14:00',
      status: 'Sent',
      template: 'Event Reminder',
      message: 'Reminder: Youth camp registration closes in 3 days. Please register your child by June 15th.',
      triggerDate: '2023-06-12',
      sent: true
    },
    {
      id: 5,
      type: 'Follow-up',
      title: 'Visitor Follow-up - Alex Thompson',
      recipient: 'Alex Thompson',
      email: 'alex.t@email.com',
      phone: '+1 (555) 234-5678',
      scheduledDate: '2023-06-08',
      scheduledTime: '16:00',
      status: 'Failed',
      template: 'Visitor Follow-up',
      message: 'Thank you for visiting Grace Community Church! We would love to connect with you.',
      triggerDate: '2023-06-05',
      sent: false
    }
  ];

  // Mock data for notification templates
  const notificationTemplates = [
    {
      id: 1,
      name: 'Birthday Wishes',
      type: 'Birthday',
      subject: 'Happy Birthday from Grace Community Church!',
      message: 'Happy Birthday, {member_name}! May God bless you abundantly in the year ahead. We are grateful to have you as part of our church family. - Grace Community Church',
      channels: ['SMS', 'Email'],
      active: true,
      lastUsed: '2023-06-04'
    },
    {
      id: 2,
      name: 'Anniversary Celebration',
      type: 'Anniversary',
      subject: 'Happy Anniversary!',
      message: 'Congratulations on your {anniversary_type} anniversary, {member_name}! May God continue to bless your {relationship_type}. - Grace Community Church',
      channels: ['SMS', 'Email'],
      active: true,
      lastUsed: '2023-05-28'
    },
    {
      id: 3,
      name: 'Membership Milestone',
      type: 'Membership Milestone',
      subject: 'Celebrating Your Faithful Membership',
      message: 'Congratulations on {years} years of faithful membership, {member_name}! Thank you for your dedication to our church family. - Grace Community Church',
      channels: ['SMS', 'Email'],
      active: true,
      lastUsed: '2023-06-01'
    },
    {
      id: 4,
      name: 'Event Reminder',
      type: 'Event Reminder',
      subject: 'Upcoming Event: {event_name}',
      message: 'Reminder: {event_name} is happening on {event_date} at {event_time}. We hope to see you there! - Grace Community Church',
      channels: ['SMS', 'Email'],
      active: true,
      lastUsed: '2023-06-03'
    },
    {
      id: 5,
      name: 'Visitor Follow-up',
      type: 'Follow-up',
      subject: 'Thank you for visiting us!',
      message: 'Thank you for visiting Grace Community Church, {visitor_name}! We would love to connect with you and answer any questions you might have. - Grace Community Church',
      channels: ['SMS', 'Email'],
      active: true,
      lastUsed: '2023-06-02'
    }
  ];

  // Mock data for notification settings
  const notificationSettings = {
    birthday: {
      enabled: true,
      daysInAdvance: 0,
      time: '09:00',
      channels: ['SMS', 'Email']
    },
    anniversary: {
      enabled: true,
      daysInAdvance: 1,
      time: '10:00',
      channels: ['SMS', 'Email']
    },
    membershipMilestone: {
      enabled: true,
      milestones: [1, 5, 10, 15, 20, 25],
      time: '11:00',
      channels: ['SMS', 'Email']
    },
    eventReminder: {
      enabled: true,
      daysInAdvance: [7, 3, 1],
      time: '14:00',
      channels: ['SMS', 'Email']
    },
    followUp: {
      enabled: true,
      visitorFollowUp: 3,
      memberFollowUp: 7,
      time: '16:00',
      channels: ['SMS', 'Email']
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Birthday':
        return FiGift;
      case 'Anniversary':
        return FiHeart;
      case 'Membership Milestone':
        return FiAward;
      case 'Event Reminder':
        return FiCalendar;
      case 'Follow-up':
        return FiUser;
      default:
        return FiBell;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Birthday':
        return 'text-pink-500';
      case 'Anniversary':
        return 'text-red-500';
      case 'Membership Milestone':
        return 'text-purple-500';
      case 'Event Reminder':
        return 'text-blue-500';
      case 'Follow-up':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Sent':
        return FiCheckCircle;
      case 'Scheduled':
        return FiClock;
      case 'Failed':
        return FiXCircle;
      case 'Cancelled':
        return FiAlertTriangle;
      default:
        return FiClock;
    }
  };

  const handleEditNotification = (notification) => {
    setSelectedNotification(notification);
    setShowNotificationForm(true);
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setShowTemplateForm(true);
  };

  const handleAddNotification = (formData) => {
    console.log('New notification data:', formData);
    setShowNotificationForm(false);
    setSelectedNotification(null);
  };

  const handleUpdateNotification = (formData) => {
    console.log('Updated notification data:', formData);
    setShowNotificationForm(false);
    setSelectedNotification(null);
  };

  const handleAddTemplate = (formData) => {
    console.log('New template data:', formData);
    setShowTemplateForm(false);
    setSelectedTemplate(null);
  };

  const handleUpdateTemplate = (formData) => {
    console.log('Updated template data:', formData);
    setShowTemplateForm(false);
    setSelectedTemplate(null);
  };

  const filteredNotifications = automatedNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notification.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const filteredTemplates = notificationTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    return matchesSearch && matchesType;
  });

  // Calculate stats
  const totalNotifications = automatedNotifications.length;
  const scheduledNotifications = automatedNotifications.filter(n => n.status === 'Scheduled').length;
  const sentNotifications = automatedNotifications.filter(n => n.status === 'Sent').length;
  const failedNotifications = automatedNotifications.filter(n => n.status === 'Failed').length;
  const activeTemplates = notificationTemplates.filter(t => t.active).length;

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification System</h1>
          <p className="text-gray-600 mt-1">Manage automated notifications and communication templates</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            icon={FiSettings}
          >
            Notification Settings
          </Button>
          <Button 
            icon={FiPlus}
            onClick={() => {
              setSelectedNotification(null);
              setShowNotificationForm(true);
            }}
          >
            Create Notification
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Notifications</p>
              <p className="text-3xl font-bold text-gray-900">{totalNotifications}</p>
              <p className="text-sm text-gray-500 mt-2">This month</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiBell} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Scheduled</p>
              <p className="text-3xl font-bold text-gray-900">{scheduledNotifications}</p>
              <p className="text-sm text-gray-500 mt-2">Pending delivery</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiClock} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Sent</p>
              <p className="text-3xl font-bold text-gray-900">{sentNotifications}</p>
              <p className="text-sm text-gray-500 mt-2">Successfully delivered</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiCheckCircle} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Failed</p>
              <p className="text-3xl font-bold text-gray-900">{failedNotifications}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiAlertTriangle} className="text-red-500 mr-1" />
                <span className="text-sm text-red-600 font-medium">Needs attention</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiXCircle} className="text-red-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Templates</p>
              <p className="text-3xl font-bold text-gray-900">{activeTemplates}</p>
              <p className="text-sm text-gray-500 mt-2">Ready to use</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiMessageSquare} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'templates', label: 'Templates' },
            { id: 'settings', label: 'Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Upcoming Notifications */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Automated Notifications</h3>
              <Button variant="outline" icon={FiRefreshCw} size="sm">Refresh</Button>
            </div>
            
            <div className="space-y-4">
              {automatedNotifications
                .filter(n => n.status === 'Scheduled')
                .slice(0, 5)
                .map(notification => (
                  <div key={notification.id} className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <SafeIcon 
                          icon={getTypeIcon(notification.type)} 
                          className={`${getTypeColor(notification.type)}`} 
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">
                          {notification.recipient} • {format(new Date(notification.scheduledDate), 'MMM d, yyyy')} at {notification.scheduledTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(notification.status)}`}>
                        {notification.status}
                      </span>
                      <Button variant="outline" size="sm" icon={FiEdit}>Edit</Button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Notification Types Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: 'Birthday', count: 12, icon: FiGift, color: 'pink', description: 'Birthday reminders for members' },
              { type: 'Anniversary', count: 5, icon: FiHeart, color: 'red', description: 'Wedding and other anniversaries' },
              { type: 'Membership Milestone', count: 3, icon: FiAward, color: 'purple', description: 'Membership anniversary celebrations' },
              { type: 'Event Reminder', count: 8, icon: FiCalendar, color: 'blue', description: 'Upcoming event notifications' },
              { type: 'Follow-up', count: 15, icon: FiUser, color: 'orange', description: 'Visitor and member follow-ups' }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-${item.color}-100`}>
                    <SafeIcon icon={item.icon} className={`text-${item.color}-500 text-xl`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{item.count}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.type}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View {item.type}s
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'scheduled' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="w-full">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Filter and Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Membership Milestone">Membership Milestone</option>
                    <option value="Event Reminder">Event Reminder</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Sent">Sent</option>
                    <option value="Failed">Failed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <Button variant="outline" size="sm" className="text-sm">
                    <SafeIcon icon={FiFilter} className="mr-1" />
                    More Filters
                  </Button>
                </div>
              </div>
            </div>
          </Card>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Membership Milestone">Membership Milestone</option>
                  <option value="Event Reminder">Event Reminder</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Sent">Sent</option>
                  <option value="Failed">Failed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
              </div>
            </div>
          </Card>

          {/* Notifications List */}
          <Card>
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Notification</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Recipient</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Scheduled</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotifications.map((notification) => (
                      <tr key={notification.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <SafeIcon 
                              icon={getTypeIcon(notification.type)} 
                              className={`${getTypeColor(notification.type)}`} 
                            />
                            <div>
                              <p className="font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">{notification.message}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-gray-900">{notification.recipient}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              {notification.email && (
                                <div className="flex items-center space-x-1">
                                  <SafeIcon icon={FiMail} className="text-xs" />
                                  <span>Email</span>
                                </div>
                              )}
                              {notification.phone && (
                                <div className="flex items-center space-x-1">
                                  <SafeIcon icon={FiMessageSquare} className="text-xs" />
                                  <span>SMS</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                            {notification.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCalendar} className="text-gray-400" />
                            <div>
                              <p className="text-gray-900">{format(new Date(notification.scheduledDate), 'MMM d, yyyy')}</p>
                              <p className="text-sm text-gray-500">{notification.scheduledTime}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${getStatusClass(notification.status)}`}>
                            <SafeIcon icon={getStatusIcon(notification.status)} className="mr-1" />
                            {notification.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button 
                              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <SafeIcon icon={FiEye} />
                            </button>
                            <button 
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => handleEditNotification(notification)}
                              title="Edit Notification"
                            >
                              <SafeIcon icon={FiEdit} />
                            </button>
                            {notification.status === 'Scheduled' && (
                              <button 
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Send Now"
                              >
                                <SafeIcon icon={FiPlay} />
                              </button>
                            )}
                            <button 
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Cancel/Delete"
                            >
                              <SafeIcon icon={FiTrash2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {filteredNotifications.map((notification) => (
                  <div key={notification.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <SafeIcon 
                          icon={getTypeIcon(notification.type)} 
                          className={`mt-1 ${getTypeColor(notification.type)}`} 
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">{notification.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{notification.message}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${getStatusClass(notification.status)} ml-2`}>
                        <SafeIcon icon={getStatusIcon(notification.status)} className="mr-1" />
                        {notification.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                        <span className="text-gray-600">{notification.recipient}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className="text-gray-600">{format(new Date(notification.scheduledDate), 'MMM d, yyyy')} at {notification.scheduledTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                          {notification.type}
                        </span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          {notification.email && (
                            <div className="flex items-center space-x-1">
                              <SafeIcon icon={FiMail} className="text-xs" />
                              <span>Email</span>
                            </div>
                          )}
                          {notification.phone && (
                            <div className="flex items-center space-x-1">
                              <SafeIcon icon={FiMessageSquare} className="text-xs" />
                              <span>SMS</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditNotification(notification)}
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      {notification.status === 'Scheduled' && (
                        <button 
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={FiPlay} />
                        </button>
                      )}
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination - Inside Card */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Showing <span className="font-medium">{filteredNotifications.length}</span> of <span className="font-medium">{automatedNotifications.length}</span> notifications
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Notification</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Recipient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Scheduled</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotifications.map((notification) => (
                    <tr key={notification.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <SafeIcon 
                            icon={getTypeIcon(notification.type)} 
                            className={`${getTypeColor(notification.type)}`} 
                          />
                          <div>
                            <p className="font-medium text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-500 truncate max-w-xs">{notification.message}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-gray-900">{notification.recipient}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {notification.email && (
                              <div className="flex items-center space-x-1">
                                <SafeIcon icon={FiMail} className="text-xs" />
                                <span>Email</span>
                              </div>
                            )}
                            {notification.phone && (
                              <div className="flex items-center space-x-1">
                                <SafeIcon icon={FiMessageSquare} className="text-xs" />
                                <span>SMS</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                          {notification.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiCalendar} className="text-gray-400" />
                          <div>
                            <p className="text-gray-900">{format(new Date(notification.scheduledDate), 'MMM d, yyyy')}</p>
                            <p className="text-sm text-gray-500">{notification.scheduledTime}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 inline-flex items-center text-xs font-medium rounded-full ${getStatusClass(notification.status)}`}>
                          <SafeIcon icon={getStatusIcon(notification.status)} className="mr-1" />
                          {notification.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <SafeIcon icon={FiEye} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => handleEditNotification(notification)}
                            title="Edit Notification"
                          >
                            <SafeIcon icon={FiEdit} />
                          </button>
                          {notification.status === 'Scheduled' && (
                            <button 
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Send Now"
                            >
                              <SafeIcon icon={FiPlay} />
                            </button>
                          )}
                          <button 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel/Delete"
                          >
                            <SafeIcon icon={FiTrash2} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Templates Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Notification Templates</h3>
            <Button 
              icon={FiPlus} 
              size="sm"
              onClick={() => {
                setSelectedTemplate(null);
                setShowTemplateForm(true);
              }}
            >
              Create Template
            </Button>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon 
                      icon={getTypeIcon(template.type)} 
                      className={`${getTypeColor(template.type)}`} 
                    />
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {template.channels.map((channel, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.type}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{template.message}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Last used: {template.lastUsed ? format(new Date(template.lastUsed), 'MMM d') : 'Never'}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      className="p-1 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                      title="View Template"
                    >
                      <SafeIcon icon={FiEye} />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      onClick={() => handleEditTemplate(template)}
                      title="Edit Template"
                    >
                      <SafeIcon icon={FiEdit} />
                    </button>
                    <button 
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Template"
                    >
                      <SafeIcon icon={FiTrash2} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Automated Notification Settings */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Automated Notification Settings</h3>
            
            <div className="space-y-6">
              {/* Birthday Notifications */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiGift} className="text-pink-500" />
                    <h4 className="font-medium text-gray-900">Birthday Notifications</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={notificationSettings.birthday.enabled} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Days in Advance</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="30"
                      defaultValue={notificationSettings.birthday.daysInAdvance}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Send Time</label>
                    <input 
                      type="time" 
                      defaultValue={notificationSettings.birthday.time}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Channels</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">SMS</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Anniversary Notifications */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiHeart} className="text-red-500" />
                    <h4 className="font-medium text-gray-900">Anniversary Notifications</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={notificationSettings.anniversary.enabled} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Days in Advance</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="30"
                      defaultValue={notificationSettings.anniversary.daysInAdvance}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Send Time</label>
                    <input 
                      type="time" 
                      defaultValue={notificationSettings.anniversary.time}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Channels</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">SMS</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Email</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Milestone Notifications */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiAward} className="text-purple-500" />
                    <h4 className="font-medium text-gray-900">Membership Milestone Notifications</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={notificationSettings.membershipMilestone.enabled} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Milestone Years</label>
                    <input 
                      type="text" 
                      defaultValue={notificationSettings.membershipMilestone.milestones.join(', ')}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="1, 5, 10, 15, 20, 25"
                    />
                    <p className="text-xs text-gray-500 mt-1">Comma-separated years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Send Time</label>
                    <input 
                      type="time" 
                      defaultValue={notificationSettings.membershipMilestone.time}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Event Reminder Notifications */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiCalendar} className="text-blue-500" />
                    <h4 className="font-medium text-gray-900">Event Reminder Notifications</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={notificationSettings.eventReminder.enabled} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Days</label>
                    <input 
                      type="text" 
                      defaultValue={notificationSettings.eventReminder.daysInAdvance.join(', ')}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="7, 3, 1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Days before event</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Send Time</label>
                    <input 
                      type="time" 
                      defaultValue={notificationSettings.eventReminder.time}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Follow-up Notifications */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiUser} className="text-orange-500" />
                    <h4 className="font-medium text-gray-900">Follow-up Notifications</h4>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={notificationSettings.followUp.enabled} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Follow-up (days)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="30"
                      defaultValue={notificationSettings.followUp.visitorFollowUp}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Follow-up (days)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="30"
                      defaultValue={notificationSettings.followUp.memberFollowUp}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Send Time</label>
                    <input 
                      type="time" 
                      defaultValue={notificationSettings.followUp.time}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button icon={FiSettings}>Save Settings</Button>
            </div>
          </Card>

          {/* Notification Channels */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Channels</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMessageSquare} className="text-blue-500" />
                    <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">Twilio</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">From Number:</span>
                    <span className="font-medium">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Limit:</span>
                    <span className="font-medium">1,000 messages</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Used This Month:</span>
                    <span className="font-medium">245 messages</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">Configure SMS</Button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <SafeIcon icon={FiMail} className="text-green-500" />
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-medium">SendGrid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">From Email:</span>
                    <span className="font-medium">noreply@gracechurch.org</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Limit:</span>
                    <span className="font-medium">10,000 emails</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Used This Month:</span>
                    <span className="font-medium">1,245 emails</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">Configure Email</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notification Form Modal */}
      {showNotificationForm && (
        <NotificationForm 
          initialData={selectedNotification} 
          templates={notificationTemplates}
          onClose={() => {
            setShowNotificationForm(false);
            setSelectedNotification(null);
          }} 
          onSubmit={selectedNotification ? handleUpdateNotification : handleAddNotification} 
        />
      )}

      {/* Template Form Modal */}
      {showTemplateForm && (
        <NotificationTemplateForm 
          initialData={selectedTemplate} 
          onClose={() => {
            setShowTemplateForm(false);
            setSelectedTemplate(null);
          }} 
          onSubmit={selectedTemplate ? handleUpdateTemplate : handleAddTemplate} 
        />
      )}
    </div>
  );
};

export default Notifications;