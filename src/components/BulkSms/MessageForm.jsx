import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUsers, FiCalendar, FiClock } = FiIcons;

const MessageForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    recipients: 'all',
    customRecipients: [],
    scheduledDate: '',
    scheduledTime: '',
    isScheduled: false
  });

  // Mock data for members and groups
  const members = [
    { id: 1, name: 'John Smith', phone: '+1 (555) 123-4567' },
    { id: 2, name: 'Sarah Johnson', phone: '+1 (555) 987-6543' },
    { id: 3, name: 'Mike Wilson', phone: '+1 (555) 456-7890' },
    { id: 4, name: 'Emily Davis', phone: '+1 (555) 234-5678' },
    { id: 5, name: 'Robert Brown', phone: '+1 (555) 876-5432' }
  ];

  const groups = [
    { id: 1, name: 'Worship Team', count: 12 },
    { id: 2, name: 'Youth Ministry', count: 18 },
    { id: 3, name: 'Children\'s Ministry', count: 8 },
    { id: 4, name: 'Elders', count: 5 },
    { id: 5, name: 'Deacons', count: 7 }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSelectRecipient = (id) => {
    setFormData(prev => {
      const isSelected = prev.customRecipients.includes(id);
      return {
        ...prev,
        customRecipients: isSelected
          ? prev.customRecipients.filter(recipientId => recipientId !== id)
          : [...prev.customRecipients, id]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const characterCount = formData.message.length;
  const messageCount = Math.ceil(characterCount / 160);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Compose Message</h2>
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
            {/* Message Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Message Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter message subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your message here..."
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Characters: {characterCount}/160</span>
                    <span>Messages: {messageCount}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recipients */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipients</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Send to:</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="all"
                        checked={formData.recipients === 'all'}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">All Members (50)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="groups"
                        checked={formData.recipients === 'groups'}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Select Groups</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="custom"
                        checked={formData.recipients === 'custom'}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Custom Selection</span>
                    </label>
                  </div>
                </div>

                {formData.recipients === 'groups' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Groups:</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                      {groups.map(group => (
                        <label key={group.id} className="flex items-center">
                          <input
                            type="checkbox"
                            value={group.id}
                            checked={formData.customRecipients.includes(group.id)}
                            onChange={() => handleSelectRecipient(group.id)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {group.name} <span className="text-gray-500">({group.count} members)</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {formData.recipients === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Recipients:</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-lg">
                      {members.map(member => (
                        <label key={member.id} className="flex items-center">
                          <input
                            type="checkbox"
                            value={member.id}
                            checked={formData.customRecipients.includes(member.id)}
                            onChange={() => handleSelectRecipient(member.id)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {member.name} <span className="text-gray-500">({member.phone})</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center">
                    <SafeIcon icon={FiUsers} className="text-emerald-500 mr-2" />
                    <span className="text-sm font-medium">
                      {formData.recipients === 'all'
                        ? '50 recipients selected'
                        : formData.recipients === 'custom'
                        ? `${formData.customRecipients.length} recipient(s) selected`
                        : formData.customRecipients.length === 0
                        ? '0 groups selected'
                        : `${formData.customRecipients.length} group(s) selected`}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Scheduling */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Message Scheduling</h3>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isScheduled"
                    checked={formData.isScheduled}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Schedule for later</span>
                </label>
              </div>
              
              {formData.isScheduled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      </div>
                      <input 
                        type="date" 
                        name="scheduledDate"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        required={formData.isScheduled}
                        min={new Date().toISOString().split('T')[0]}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiClock} className="text-gray-400" />
                      </div>
                      <input 
                        type="time" 
                        name="scheduledTime"
                        value={formData.scheduledTime}
                        onChange={handleChange}
                        required={formData.isScheduled}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
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
                {formData.isScheduled ? 'Schedule Message' : 'Send Now'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;