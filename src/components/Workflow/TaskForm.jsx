import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUser, FiCalendar, FiFlag, FiSettings } = FiIcons;

const TaskForm = ({ onClose, onSubmit, initialData = null, workflows = [] }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    workflowId: initialData?.workflowId || '',
    assignedTo: initialData?.assignedTo || '',
    dueDate: initialData?.dueDate || '',
    priority: initialData?.priority || 'Medium',
    status: initialData?.status || 'Pending',
    memberName: initialData?.memberName || '',
    notes: initialData?.notes || ''
  });

  const assignees = [
    'Pastor John',
    'Elder Sarah',
    'Deacon Michael',
    'Admin User',
    'Finance Team',
    'Event Team',
    'Youth Pastor',
    'Children\'s Director',
    'Worship Leader',
    'Outreach Coordinator'
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Task' : 'Create New Task'}
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
            {/* Task Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title*</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter task title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe what needs to be done..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Workflow</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiSettings} className="text-gray-400" />
                      </div>
                      <select 
                        name="workflowId"
                        value={formData.workflowId}
                        onChange={handleChange}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">No workflow (standalone task)</option>
                        {workflows.map(workflow => (
                          <option key={workflow.id} value={workflow.id}>{workflow.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related Member</label>
                    <input 
                      type="text" 
                      name="memberName"
                      value={formData.memberName}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Member name (if applicable)"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Assignment and Timeline */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment & Timeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                    </div>
                    <select 
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select assignee</option>
                      {assignees.map((assignee, index) => (
                        <option key={index} value={assignee}>{assignee}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiFlag} className="text-gray-400" />
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
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
                placeholder="Add any additional notes or instructions..."
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
                {initialData ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;