import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiBell, FiMessageSquare } = FiIcons;

const NotificationForm = ({ onClose, onSubmit, initialData = null, templates = [] }) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'Custom',
    title: initialData?.title || '',
    recipient: initialData?.recipient || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    message: initialData?.message || '',
    scheduledDate: initialData?.scheduledDate || new Date().toISOString().split('T')[0],
    scheduledTime: initialData?.scheduledTime || '09:00',
    channels: initialData?.channels || ['SMS'],
    template: initialData?.template || '',
    priority: initialData?.priority || 'Medium',
    recurring: initialData?.recurring || false,
    recurringFrequency: initialData?.recurringFrequency || 'monthly'
  });

  const notificationTypes = [
    'Birthday',
    'Anniversary',
    'Membership Milestone',
    'Event Reminder',
    'Follow-up',
    'Custom'
  ];

  const priorities = ['Low', 'Medium', 'High'];
  const recurringOptions = ['daily', 'weekly', 'monthly', 'yearly'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChannelChange = (channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === parseInt(templateId));
    if (template) {
      setFormData(prev => ({
        ...prev,
        template: template.name,
        message: template.message,
        type: template.type,
        channels: template.channels
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Notification' : 'Create New Notification'}
          </h2>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Notification Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiBell} className="text-gray-400" />
                    </div>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {notificationTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template (Optional)</label>
                  <select 
                    name="templateSelect"
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select template</option>
                    {templates
                      .filter(t => t.type === formData.type || formData.type === 'Custom')
                      .map(template => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter notification title"
                  />
                </div>
              </div>
            </Card>

            {/* Recipient Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="recipient"
                      value={formData.recipient}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter recipient name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select 
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {priorities.map((priority, index) => (
                      <option key={index} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiMail} className="text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="recipient@email.com"
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
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Message Content */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your notification message..."
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Characters: {formData.message.length}</span>
                    <span>SMS Messages: {Math.ceil(formData.message.length / 160)}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Channels*</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.channels.includes('SMS')}
                        onChange={() => handleChannelChange('SMS')}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">SMS</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.channels.includes('Email')}
                        onChange={() => handleChannelChange('Email')}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            {/* Scheduling */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduling</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiClock} className="text-gray-400" />
                    </div>
                    <input 
                      type="time" 
                      name="scheduledTime"
                      value={formData.scheduledTime}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="recurring"
                      checked={formData.recurring}
                      onChange={handleChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Recurring Notification</span>
                  </label>
                  
                  {formData.recurring && (
                    <select 
                      name="recurringFrequency"
                      value={formData.recurringFrequency}
                      onChange={handleChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {recurringOptions.map((option, index) => (
                        <option key={index} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <Button 
                variant="secondary" 
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                icon={FiSave}
                type="submit"
              >
                {initialData ? 'Update Notification' : 'Schedule Notification'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationForm;