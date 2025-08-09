import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSave, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiLock, 
  FiSettings,
  FiUsers,
  FiMessageSquare,
  FiDatabase,
  FiLayout,
  FiGlobe,
  FiAlertTriangle,
  FiClock,
  FiPlusCircle,
  FiImage
} = FiIcons;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [churchName, setChurchName] = useState('Grace Community Church');
  const [churchEmail, setChurchEmail] = useState('info@gracechurch.org');
  const [churchPhone, setChurchPhone] = useState('(555) 123-4567');
  const [churchAddress, setChurchAddress] = useState('123 Faith Street, Cityville, ST 12345');
  const [churchWebsite, setChurchWebsite] = useState('www.gracechurch.org');
  const [primaryColor, setPrimaryColor] = useState('#10b981');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved');
    // Here you would save the settings to your database
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Configure system settings and preferences</p>
      </div>

      {/* Settings Tabs */}
      <Card className="p-0 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {[
            { id: 'general', label: 'General', icon: FiSettings },
            { id: 'users', label: 'Users & Permissions', icon: FiUsers },
            { id: 'appearance', label: 'Appearance', icon: FiLayout },
            { id: 'sms', label: 'SMS Settings', icon: FiMessageSquare },
            { id: 'database', label: 'Database', icon: FiDatabase },
            { id: 'backup', label: 'Backup & Restore', icon: FiDatabase },
            { id: 'logs', label: 'System Logs', icon: FiAlertTriangle }
          ].map(tab => (
            <button
              key={tab.id}
              className={`py-4 px-6 flex items-center space-x-2 whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <SafeIcon icon={tab.icon} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Church Name</label>
                  <input 
                    type="text" 
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiMail} className="text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      value={churchEmail}
                      onChange={(e) => setChurchEmail(e.target.value)}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiPhone} className="text-gray-400" />
                    </div>
                    <input 
                      type="tel" 
                      value={churchPhone}
                      onChange={(e) => setChurchPhone(e.target.value)}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiGlobe} className="text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      value={churchWebsite}
                      onChange={(e) => setChurchWebsite(e.target.value)}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Church Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiMapPin} className="text-gray-400" />
                    </div>
                    <textarea 
                      value={churchAddress}
                      onChange={(e) => setChurchAddress(e.target.value)}
                      rows={2}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>(GMT-08:00) Pacific Time</option>
                      <option>(GMT-07:00) Mountain Time</option>
                      <option>(GMT-06:00) Central Time</option>
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT) Greenwich Mean Time</option>
                      <option>(GMT+01:00) Central European Time</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                    <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>NGN (₦)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>CAD (C$)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button icon={FiSave} type="submit">Save Settings</Button>
              </div>
            </form>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                <Button icon={FiPlusCircle} size="sm">Add User</Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Admin User', email: 'admin@gracechurch.org', role: 'Administrator', status: 'Active', lastLogin: '2023-06-04 10:30 AM' },
                      { name: 'Pastor John', email: 'pastor@gracechurch.org', role: 'Pastor', status: 'Active', lastLogin: '2023-06-03 09:15 AM' },
                      { name: 'Sarah Johnson', email: 'sarah@gracechurch.org', role: 'Finance Manager', status: 'Active', lastLogin: '2023-06-02 02:45 PM' },
                      { name: 'Michael Brown', email: 'michael@gracechurch.org', role: 'Member Manager', status: 'Inactive', lastLogin: '2023-05-20 11:20 AM' }
                    ].map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-medium">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <SafeIcon icon={FiClock} className="text-gray-400" />
                            <span>{user.lastLogin}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-emerald-600 hover:text-emerald-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Role Permissions</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Administrator', description: 'Full system access with all permissions' },
                    { name: 'Pastor', description: 'Access to all member data, attendance, and reports' },
                    { name: 'Finance Manager', description: 'Access to financial records and reports' },
                    { name: 'Member Manager', description: 'Access to member and visitor data' }
                  ].map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">{role.name}</h4>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                      <Button variant="outline" size="sm">Edit Permissions</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="color" 
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded border border-gray-300"
                    />
                    <input 
                      type="text" 
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border border-gray-300">
                      <SafeIcon icon={FiImage} className="text-gray-400 text-2xl" />
                    </div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Preview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="w-full h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-md mb-3"></div>
                    <h4 className="text-base font-medium text-gray-900">Default Theme</h4>
                    <p className="text-sm text-gray-500">Green gradient with white content</p>
                    <div className="flex justify-end mt-2">
                      <button className="px-3 py-1 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700">
                        Active
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-md mb-3"></div>
                    <h4 className="text-base font-medium text-gray-900">Blue Theme</h4>
                    <p className="text-sm text-gray-500">Blue gradient with white content</p>
                    <div className="flex justify-end mt-2">
                      <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Select
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-md mb-3"></div>
                    <h4 className="text-base font-medium text-gray-900">Purple Theme</h4>
                    <p className="text-sm text-gray-500">Purple gradient with white content</p>
                    <div className="flex justify-end mt-2">
                      <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button icon={FiSave}>Save Appearance</Button>
              </div>
            </div>
          )}

          {activeTab === 'sms' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SMS Provider</label>
                  <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Twilio</option>
                    <option>Nexmo</option>
                    <option>MessageBird</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                  <input 
                    type="password" 
                    value="••••••••••••••••"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account SID</label>
                  <input 
                    type="text" 
                    value="AC1234567890abcdef1234567890abcde"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Number</label>
                  <input 
                    type="text" 
                    value="+15551234567"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Templates</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Welcome Message', content: 'Welcome to Grace Community Church! We\'re glad you joined us today. If you have any questions, please reply to this message.' },
                    { name: 'Event Reminder', content: 'Reminder: {event_name} is happening on {event_date} at {event_time}. We hope to see you there!' },
                    { name: 'Birthday Wish', content: 'Happy Birthday, {member_name}! May God bless you abundantly in the year ahead. - Grace Community Church' }
                  ].map((template, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="text-base font-medium text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-4">{template.content}</p>
                      <div className="flex justify-end">
                        <button className="text-emerald-600 hover:text-emerald-900 text-sm font-medium">Edit Template</button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" icon={FiPlusCircle} className="w-full justify-center py-3">Add New Template</Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button icon={FiSave}>Save SMS Settings</Button>
              </div>
            </div>
          )}

          {(activeTab === 'database' || activeTab === 'backup' || activeTab === 'logs') && (
            <div className="space-y-6">
              {activeTab === 'database' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Database Type:</span>
                          <span className="font-medium">PostgreSQL</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Version:</span>
                          <span className="font-medium">13.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">245 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tables:</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Backup:</span>
                          <span className="font-medium">2 hours ago</span>
                        </div>
                      </div>
                    </Card>
                    
                    <Card>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Health</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Connection Status:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            Connected
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Connections:</span>
                          <span className="font-medium">3/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Query Performance:</span>
                          <span className="font-medium text-green-600">Good</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Storage Usage:</span>
                          <span className="font-medium">24%</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Database Operations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button variant="outline" className="justify-center">
                        Optimize Database
                      </Button>
                      <Button variant="outline" className="justify-center">
                        Run Diagnostics
                      </Button>
                      <Button variant="outline" className="justify-center">
                        View Query Log
                      </Button>
                    </div>
                  </Card>
                </>
              )}
              
              {activeTab === 'backup' && (
                <>
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Automatic Backups</h4>
                          <p className="text-sm text-gray-500">Automatically backup your data daily</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
                          <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Retention Period</label>
                          <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                            <option>30 days</option>
                            <option>90 days</option>
                            <option>1 year</option>
                            <option>Forever</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Backups</h3>
                      <Button icon={FiDownload} size="sm">Create Backup</Button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { date: '2023-06-05 02:00 AM', size: '245 MB', status: 'Success' },
                        { date: '2023-06-04 02:00 AM', size: '243 MB', status: 'Success' },
                        { date: '2023-06-03 02:00 AM', size: '241 MB', status: 'Success' },
                        { date: '2023-06-02 02:00 AM', size: '239 MB', status: 'Failed' },
                        { date: '2023-06-01 02:00 AM', size: '238 MB', status: 'Success' }
                      ].map((backup, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{backup.date}</p>
                            <p className="text-sm text-gray-500">Size: {backup.size}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              backup.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {backup.status}
                            </span>
                            {backup.status === 'Success' && (
                              <Button variant="outline" size="sm">Download</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </>
              )}
              
              {activeTab === 'logs' && (
                <>
                  <Card>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
                      <div className="flex space-x-2">
                        <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                          <option>All Levels</option>
                          <option>Error</option>
                          <option>Warning</option>
                          <option>Info</option>
                        </select>
                        <Button variant="outline" size="sm">Clear Logs</Button>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {[
                        { time: '2023-06-05 14:30:25', level: 'INFO', message: 'User login successful: admin@gracechurch.org' },
                        { time: '2023-06-05 14:25:12', level: 'INFO', message: 'New member added: John Smith' },
                        { time: '2023-06-05 14:20:45', level: 'WARNING', message: 'Failed login attempt from IP: 192.168.1.100' },
                        { time: '2023-06-05 14:15:33', level: 'INFO', message: 'Database backup completed successfully' },
                        { time: '2023-06-05 14:10:22', level: 'ERROR', message: 'Email service connection timeout' },
                        { time: '2023-06-05 14:05:11', level: 'INFO', message: 'SMS sent to 25 recipients' },
                        { time: '2023-06-05 14:00:00', level: 'INFO', message: 'System health check completed' },
                        { time: '2023-06-05 13:55:44', level: 'WARNING', message: 'High memory usage detected: 85%' },
                        { time: '2023-06-05 13:50:33', level: 'INFO', message: 'Attendance record updated' },
                        { time: '2023-06-05 13:45:22', level: 'INFO', message: 'Financial report generated' }
                      ].map((log, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg text-sm">
                          <span className="text-gray-500 font-mono">{log.time}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                            log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {log.level}
                          </span>
                          <span className="flex-1 text-gray-700">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </>
              )}
            </div>
          )}
          
          {/* Fallback for other advanced settings */}
          {!['database', 'backup', 'logs'].includes(activeTab) && (
            <div className="text-center py-8">
              <SafeIcon icon={FiSettings} className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Advanced Settings</h3>
              <p className="mt-1 text-gray-500">
                These settings are managed by system administrators.
                <br />Please contact your IT department for changes.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Settings;