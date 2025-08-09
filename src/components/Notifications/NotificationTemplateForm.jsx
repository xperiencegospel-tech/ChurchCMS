import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiMessageSquare, FiMail, FiType, FiInfo } = FiIcons;

const NotificationTemplateForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'Custom',
    subject: initialData?.subject || '',
    message: initialData?.message || '',
    channels: initialData?.channels || ['SMS'],
    active: initialData?.active !== undefined ? initialData.active : true,
    variables: initialData?.variables || [],
    description: initialData?.description || ''
  });

  const templateTypes = [
    'Birthday',
    'Anniversary',
    'Membership Milestone',
    'Event Reminder',
    'Follow-up',
    'Welcome',
    'Thank You',
    'Custom'
  ];

  const availableVariables = [
    { name: '{member_name}', description: 'Member\'s full name' },
    { name: '{first_name}', description: 'Member\'s first name' },
    { name: '{church_name}', description: 'Church name' },
    { name: '{event_name}', description: 'Event name' },
    { name: '{event_date}', description: 'Event date' },
    { name: '{event_time}', description: 'Event time' },
    { name: '{years}', description: 'Number of years (for milestones)' },
    { name: '{anniversary_type}', description: 'Type of anniversary' },
    { name: '{relationship_type}', description: 'Type of relationship' },
    { name: '{pastor_name}', description: 'Pastor\'s name' }
  ];

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

  const insertVariable = (variable) => {
    const textarea = document.querySelector('textarea[name="message"]');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.message;
    const before = text.substring(0, start);
    const after = text.substring(end, text.length);
    
    setFormData(prev => ({
      ...prev,
      message: before + variable + after
    }));
    
    // Set cursor position after the inserted variable
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + variable.length;
      textarea.focus();
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Template' : 'Create New Template'}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Template Details */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Name*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiType} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter template name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Type*</label>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {templateTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input 
                      type="text" 
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Brief description of when to use this template"
                    />
                  </div>
                </div>
              </Card>

              {/* Message Content */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line (for Email)</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter email subject line"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message Template*</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter your message template with variables..."
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Characters: {formData.message.length}</span>
                      <span>Use variables like {'{member_name}'} for personalization</span>
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
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Active Template (available for use)
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Variables Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <div className="flex items-center space-x-2 mb-4">
                  <SafeIcon icon={FiInfo} className="text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Available Variables</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Click on any variable to insert it into your message template.
                </p>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {availableVariables.map((variable, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => insertVariable(variable.name)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                    >
                      <div className="font-mono text-sm text-emerald-700 mb-1">
                        {variable.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {variable.description}
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Template Preview</h4>
                  <div className="text-sm text-blue-800 bg-white p-2 rounded border">
                    {formData.message || 'Your message will appear here...'}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6">
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
              {initialData ? 'Update Template' : 'Save Template'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationTemplateForm;