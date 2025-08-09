import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUser, FiMail, FiDollarSign, FiCalendar, FiCreditCard, FiRepeat, FiTarget } = FiIcons;

const OnlineGivingForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    donorName: initialData?.donorName || '',
    email: initialData?.email || '',
    amount: initialData?.amount || '',
    currency: initialData?.currency || 'NGN',
    paymentMethod: initialData?.paymentMethod || 'paystack',
    category: initialData?.category || 'general',
    campaign: initialData?.campaign || '',
    recurring: initialData?.recurring || false,
    frequency: initialData?.frequency || 'monthly',
    startDate: initialData?.startDate || new Date().toISOString().split('T')[0],
    endDate: initialData?.endDate || '',
    notes: initialData?.notes || ''
  });

  const currencies = [
    { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' }
  ];

  const paymentMethods = {
    nigerian: [
      { value: 'paystack', label: 'Paystack', description: 'Cards, Bank Transfer, USSD' },
      { value: 'flutterwave', label: 'Flutterwave', description: 'Cards, Bank Transfer, Mobile Money' },
      { value: 'interswitch', label: 'Interswitch', description: 'WebPAY, Verve Cards' },
      { value: 'remita', label: 'Remita', description: 'Bank Transfer, USSD' }
    ],
    international: [
      { value: 'stripe', label: 'Stripe', description: 'Credit/Debit Cards Worldwide' },
      { value: 'paypal', label: 'PayPal', description: 'PayPal Accounts, Cards' },
      { value: 'square', label: 'Square', description: 'Cards, Digital Wallets' }
    ]
  };

  const categories = [
    'Tithe',
    'Offering',
    'Building Fund',
    'Missions',
    'Youth Ministry',
    'Children\'s Ministry',
    'Outreach',
    'General',
    'Other'
  ];

  const campaigns = [
    'New Sanctuary Building',
    'Mission Trip 2023',
    'Youth Camp Scholarship',
    'Community Outreach',
    'Equipment Fund'
  ];

  const frequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'annually', label: 'Annually' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getPaymentMethods = () => {
    return formData.currency === 'NGN' ? paymentMethods.nigerian : paymentMethods.international;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Online Donation' : 'Record Online Donation'}
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
            {/* Donor Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Donor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      placeholder="Enter donor's name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiMail} className="text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="donor@email.com"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">
                        {currencies.find(c => c.code === formData.currency)?.symbol || '₦'}
                      </span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency*</label>
                  <select 
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCreditCard} className="text-gray-400" />
                    </div>
                    <select 
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {getPaymentMethods().map(method => (
                        <option key={method.value} value={method.value}>
                          {method.label} - {method.description}
                        </option>
                      ))}
                    </select>
                  </div>
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
                    {categories.map((category, index) => (
                      <option key={index} value={category.toLowerCase().replace(' ', '_')}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign (Optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiTarget} className="text-gray-400" />
                    </div>
                    <select 
                      name="campaign"
                      value={formData.campaign}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">No specific campaign</option>
                      {campaigns.map((campaign, index) => (
                        <option key={index} value={campaign}>{campaign}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recurring Donation Settings */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recurring Donation</h3>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="recurring"
                    checked={formData.recurring}
                    onChange={handleChange}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Set up recurring donation</span>
                </label>
              </div>
              
              {formData.recurring && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiRepeat} className="text-gray-400" />
                      </div>
                      <select 
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        required={formData.recurring}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        {frequencies.map(freq => (
                          <option key={freq.value} value={freq.value}>{freq.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date*</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      </div>
                      <input 
                        type="date" 
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required={formData.recurring}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      </div>
                      <input 
                        type="date" 
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Payment Method Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nigerian Methods */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Nigerian Payment Methods</h4>
                    <div className="space-y-2">
                      {paymentMethods.nigerian.map(method => (
                        <label key={method.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={formData.paymentMethod === method.value}
                            onChange={handleChange}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{method.label}</p>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* International Methods */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">International Payment Methods</h4>
                    <div className="space-y-2">
                      {paymentMethods.international.map(method => (
                        <label key={method.value} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.value}
                            checked={formData.paymentMethod === method.value}
                            onChange={handleChange}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{method.label}</p>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Notes */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Add any additional notes about this donation..."
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
                {initialData ? 'Update Donation' : 'Save Donation'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnlineGivingForm;