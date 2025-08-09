import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiSettings, FiPlus, FiTrash2, FiArrowUp, FiArrowDown } = FiIcons;

const WorkflowForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    status: initialData?.status || 'Draft',
    triggerEvent: initialData?.triggerEvent || '',
    notes: initialData?.notes || ''
  });

  const [steps, setSteps] = useState(initialData?.steps || [
    { id: 1, title: '', description: '', assignedTo: '', daysToComplete: 1, required: true }
  ]);

  const categories = [
    'Membership',
    'Events',
    'Outreach',
    'Finance',
    'Leadership',
    'Operations',
    'Pastoral Care',
    'Education',
    'Other'
  ];

  const triggerEvents = [
    'New Member Registration',
    'Visitor Check-in',
    'Event Creation',
    'Expense Request',
    'Prayer Request Submission',
    'Equipment Purchase',
    'Manual Start',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (stepId, field, value) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, [field]: value } : step
    ));
  };

  const addStep = () => {
    const newStep = {
      id: Math.max(...steps.map(s => s.id)) + 1,
      title: '',
      description: '',
      assignedTo: '',
      daysToComplete: 1,
      required: true
    };
    setSteps(prev => [...prev, newStep]);
  };

  const removeStep = (stepId) => {
    if (steps.length > 1) {
      setSteps(prev => prev.filter(step => step.id !== stepId));
    }
  };

  const moveStep = (stepId, direction) => {
    const currentIndex = steps.findIndex(step => step.id === stepId);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < steps.length - 1)
    ) {
      const newSteps = [...steps];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newSteps[currentIndex], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[currentIndex]];
      setSteps(newSteps);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      steps
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Workflow' : 'Create New Workflow'}
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
            {/* Basic Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name*</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter workflow name"
                  />
                </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Event</label>
                  <select 
                    name="triggerEvent"
                    value={formData.triggerEvent}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select trigger</option>
                    {triggerEvents.map((event, index) => (
                      <option key={index} value={event}>{event}</option>
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
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe what this workflow accomplishes..."
                  />
                </div>
              </div>
            </Card>

            {/* Workflow Steps */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Workflow Steps</h3>
                <Button icon={FiPlus} size="sm" onClick={addStep}>Add Step</Button>
              </div>
              
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Step {index + 1}</h4>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => moveStep(step.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                        >
                          <SafeIcon icon={FiArrowUp} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveStep(step.id, 'down')}
                          disabled={index === steps.length - 1}
                          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                        >
                          <SafeIcon icon={FiArrowDown} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeStep(step.id)}
                          disabled={steps.length === 1}
                          className="p-1 text-gray-400 hover:text-red-600 disabled:opacity-50"
                        >
                          <SafeIcon icon={FiTrash2} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Step Title*</label>
                        <input 
                          type="text" 
                          value={step.title}
                          onChange={(e) => handleStepChange(step.id, 'title', e.target.value)}
                          required
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Enter step title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                        <input 
                          type="text" 
                          value={step.assignedTo}
                          onChange={(e) => handleStepChange(step.id, 'assignedTo', e.target.value)}
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Role or person name"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                          value={step.description}
                          onChange={(e) => handleStepChange(step.id, 'description', e.target.value)}
                          rows={2}
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Describe what needs to be done in this step"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Days to Complete</label>
                        <input 
                          type="number" 
                          min="1"
                          value={step.daysToComplete}
                          onChange={(e) => handleStepChange(step.id, 'daysToComplete', parseInt(e.target.value))}
                          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={step.required}
                          onChange={(e) => handleStepChange(step.id, 'required', e.target.checked)}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Required Step</label>
                      </div>
                    </div>
                  </div>
                ))}
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
                placeholder="Add any additional notes about this workflow..."
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
                {initialData ? 'Update Workflow' : 'Save Workflow'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkflowForm;