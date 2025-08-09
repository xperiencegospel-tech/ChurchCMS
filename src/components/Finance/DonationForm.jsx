import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiDollarSign, FiUser, FiCalendar } = FiIcons;

const DonationForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    amount: initialData?.amount || '',
    donorId: initialData?.donorId || '',
    donorName: initialData?.donorName || '',
    donorType: initialData?.donorType || 'member',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    paymentMethod: initialData?.paymentMethod || 'cash',
    category: initialData?.category || 'tithe',
    campaign: initialData?.campaign || '',
    notes: initialData?.notes || '',
    receiptIssued: initialData?.receiptIssued || false
  });

  // Mock data for members
  const members = [
    { id: 1, name: 'John Smith' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Mike Wilson' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'Robert Brown' }
  ];

  // Mock data for campaigns
  const campaigns = [
    { id: 1, name: 'Building Fund' },
    { id: 2, name: 'Mission Trip' },
    { id: 3, name: 'Youth Camp' },
    { id: 4, name: 'Charity Outreach' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDonorChange = (e) => {
    const memberId = parseInt(e.target.value, 10);
    if (memberId) {
      const selectedMember = members.find(m => m.id === memberId);
      setFormData(prev => ({
        ...prev,
        donorId: memberId,
        donorName: selectedMember?.name || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        donorId: '',
        donorName: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Donation' : 'Record New Donation'}
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
            {/* Amount and Date */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">₦</span>
                    </div>
                    <input
                      type="number"
                      name="amount"
                      min="0.01"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Donor Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Donor Type</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="donorType"
                        value="member"
                        checked={formData.donorType === 'member'}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Member</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="donorType"
                        value="visitor"
                        checked={formData.donorType === 'visitor'}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Visitor</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="donorType"
                        value="other"
                        checked={formData.donorType === 'other'}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Other</span>
                    </label>
                  </div>
                </div>

                {formData.donorType === 'member' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Member*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                      </div>
                      <select
                        name="donorId"
                        value={formData.donorId}
                        onChange={handleDonorChange}
                        required
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Select member</option>
                        {members.map(member => (
                          <option key={member.id} value={member.id}>{member.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Donor Name*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="donorName"
                        value={formData.donorName}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Enter donor name"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Payment Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method*</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="ussd">USSD</option>
                    <option value="paystack">Paystack</option>
                    <option value="flutterwave">Flutterwave</option>
                    <option value="pos">POS</option>
                    <option value="mobile">Mobile Money</option>
                    <option value="other">Other</option>
                  </select>
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
                    <option value="tithe">Tithe</option>
                    <option value="offering">Offering</option>
                    <option value="building_fund">Building Fund</option>
                    <option value="missions">Missions</option>
                    <option value="youth">Youth Ministry</option>
                    <option value="children">Children's Ministry</option>
                    <option value="charity">Charity/Outreach</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign (if applicable)</label>
                  <select
                    name="campaign"
                    value={formData.campaign}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">None</option>
                    {campaigns.map(campaign => (
                      <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <input
                    id="receiptIssued"
                    name="receiptIssued"
                    type="checkbox"
                    checked={formData.receiptIssued}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                  />
                  <label htmlFor="receiptIssued" className="ml-2 block text-sm text-gray-700">
                    Receipt Issued
                  </label>
                </div>
              </div>
            </Card>

            {/* Notes */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Add any additional notes about this donation..."
              />
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button icon={FiSave} type="submit">
                {initialData ? 'Update Donation' : 'Save Donation'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;