import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUser, FiBook, FiCalendar, FiAward } = FiIcons;

const CertificateForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    recipientName: initialData?.recipientName || '',
    certificateType: initialData?.certificateType || '',
    courseName: initialData?.courseName || '',
    dateCompleted: initialData?.dateCompleted || '',
    dateIssued: initialData?.dateIssued || '',
    instructor: initialData?.instructor || '',
    grade: initialData?.grade || '',
    status: initialData?.status || 'Draft',
    notes: initialData?.notes || '',
    template: initialData?.template || 'landscape-bible-school'
  });

  const certificateTypes = [
    'Bible School Completion',
    'Baptism',
    'Confirmation',
    'Ministry Training',
    'Volunteer Recognition',
    'Sunday School Completion',
    'Youth Program Completion',
    'Leadership Training',
    'Mission Trip Participation',
    'Other'
  ];

  const templates = [
    { value: 'landscape-bible-school', label: 'Bible School (Landscape)' },
    { value: 'portrait-baptism', label: 'Baptism (Portrait)' },
    { value: 'landscape-ministry', label: 'Ministry Training (Landscape)' },
    { value: 'portrait-volunteer', label: 'Volunteer Recognition (Portrait)' }
  ];

  const instructors = [
    'Pastor John',
    'Elder Sarah',
    'Deacon Michael',
    'Ministry Leader Emily',
    'Bible School Director',
    'Youth Pastor',
    'Children\'s Director'
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
            {initialData ? 'Edit Certificate' : 'Create New Certificate'}
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
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter recipient's full name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Type*</label>
                  <select 
                    name="certificateType"
                    value={formData.certificateType}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select certificate type</option>
                    {certificateTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Course/Program Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course/Program Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course/Program Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiBook} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., Foundations of Faith, Leadership Development"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor/Supervisor</label>
                  <select 
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select instructor</option>
                    {instructors.map((instructor, index) => (
                      <option key={index} value={instructor}>{instructor}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Completed*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      name="dateCompleted"
                      value={formData.dateCompleted}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade/Score</label>
                  <input 
                    type="text" 
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., A, B+, 95%, Pass"
                  />
                </div>
              </div>
            </Card>

            {/* Certificate Settings */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template Design</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiAward} className="text-gray-400" />
                    </div>
                    <select 
                      name="template"
                      value={formData.template}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {templates.map((template) => (
                        <option key={template.value} value={template.value}>{template.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Pending">Pending Approval</option>
                    <option value="Issued">Issued</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Issued</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      name="dateIssued"
                      value={formData.dateIssued}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
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
                placeholder="Add any additional notes or special instructions..."
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
                {initialData ? 'Update Certificate' : 'Create Certificate'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateForm;