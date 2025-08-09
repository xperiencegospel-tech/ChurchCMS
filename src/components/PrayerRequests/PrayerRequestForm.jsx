import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUser, FiMail, FiPhone, FiHeart, FiLock, FiGlobe, FiAlertCircle } = FiIcons;

const PrayerRequestForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    requester: initialData?.requester || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    category: initialData?.category || '',
    priority: initialData?.priority || 'Medium',
    privacy: initialData?.privacy || 'Private',
    status: initialData?.status || 'Active',
    description: initialData?.description || '',
    assignedTo: initialData?.assignedTo || '',
    followUpDate: initialData?.followUpDate || '',
    notes: initialData?.notes || ''
  });

  const categories = [
    'Health',
    'Family',
    'Financial',
    'Career',
    'Salvation',
    'Relationships',
    'Spiritual Growth',
    'Travel Safety',
    'Guidance',
    'Thanksgiving',
    'Other'
  ];

  const assignees = [
    'Pastor John',
    'Elder Sarah',
    'Deacon Michael',
    'Prayer Team Leader',
    'Ministry Leader Emily',
    'Pastoral Care Team'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            {initialData ? 'Edit Prayer Request' : 'Add New Prayer Request'}
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
            {/* Request Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prayer Request Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Request Title*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiHeart} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Brief title for the prayer request"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Detailed description of the prayer request..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiAlertCircle} className="text-gray-400" />
                      </div>
                      <select 
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Privacy*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon 
                          icon={formData.privacy === 'Public' ? FiGlobe : FiLock} 
                          className="text-gray-400" 
                        />
                      </div>
                      <select 
                        name="privacy"
                        value={formData.privacy}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="Public">Public - Can be shared openly</option>
                        <option value="Private">Private - Limited sharing</option>
                        <option value="Confidential">Confidential - Pastoral care only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Requester Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requester Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="requester"
                      value={formData.requester}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter requester's name"
                    />
                  </div>
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
                      placeholder="email@example.com"
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

            {/* Assignment and Follow-up */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment & Follow-up</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <select 
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select assignee</option>
                    {assignees.map((assignee, index) => (
                      <option key={index} value={assignee}>{assignee}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Answered">Answered</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                  <input 
                    type="date" 
                    name="followUpDate"
                    value={formData.followUpDate}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </Card>

            {/* Additional Notes */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Add any additional notes, updates, or pastoral observations..."
              />
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
                {initialData ? 'Update Request' : 'Save Request'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrayerRequestForm;