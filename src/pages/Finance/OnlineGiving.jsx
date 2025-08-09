import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import OnlineGivingForm from '../../components/Finance/OnlineGivingForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';
import ReactEcharts from 'echarts-for-react';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2,
  FiDollarSign,
  FiCalendar,
  FiTrendingUp,
  FiDownload,
  FiCreditCard,
  FiGlobe,
  FiRepeat,
  FiTarget,
  FiSettings,
  FiLink
} = FiIcons;

const OnlineGiving = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showGivingForm, setShowGivingForm] = useState(false);

  // Mock data for online donations
  const onlineDonations = [
    {
      id: 1,
      donorName: 'John Smith',
      email: 'john@email.com',
      amount: 75000.00,
      currency: 'NGN',
      date: '2023-06-04',
      paymentMethod: 'Paystack',
      category: 'Tithe',
      campaign: null,
      recurring: true,
      frequency: 'Monthly',
      status: 'Completed',
      reference: 'PS_123456789'
    },
    {
      id: 2,
      donorName: 'Sarah Johnson',
      email: 'sarah@email.com',
      amount: 250.00,
      currency: 'USD',
      date: '2023-06-04',
      paymentMethod: 'Stripe',
      category: 'Missions',
      campaign: 'Mission Trip 2023',
      recurring: false,
      frequency: null,
      status: 'Completed',
      reference: 'ST_987654321'
    },
    {
      id: 3,
      donorName: 'Mike Wilson',
      email: 'mike@email.com',
      amount: 50000.00,
      currency: 'NGN',
      date: '2023-06-03',
      paymentMethod: 'Flutterwave',
      category: 'Building Fund',
      campaign: 'New Sanctuary',
      recurring: true,
      frequency: 'Weekly',
      status: 'Completed',
      reference: 'FW_456789123'
    },
    {
      id: 4,
      donorName: 'Emily Davis',
      email: 'emily@email.com',
      amount: 100.00,
      currency: 'EUR',
      date: '2023-06-02',
      paymentMethod: 'PayPal',
      category: 'General',
      campaign: null,
      recurring: false,
      frequency: null,
      status: 'Pending',
      reference: 'PP_789123456'
    }
  ];

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      name: 'New Sanctuary Building',
      target: 5000000.00,
      raised: 3250000.00,
      donors: 145,
      endDate: '2023-12-31',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Mission Trip 2023',
      target: 800000.00,
      raised: 650000.00,
      donors: 89,
      endDate: '2023-08-15',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Youth Camp Scholarship',
      target: 300000.00,
      raised: 285000.00,
      donors: 56,
      endDate: '2023-07-01',
      status: 'Nearly Complete'
    }
  ];

  // Payment methods data
  const paymentMethodsData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      data: ['Paystack', 'Flutterwave', 'Stripe', 'PayPal', 'Bank Transfer']
    },
    series: [
      {
        name: 'Payment Methods',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 45, name: 'Paystack' },
          { value: 25, name: 'Flutterwave' },
          { value: 15, name: 'Stripe' },
          { value: 10, name: 'PayPal' },
          { value: 5, name: 'Bank Transfer' }
        ],
        color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#6b7280']
      }
    ]
  };

  const formatCurrency = (amount, currency = 'NGN') => {
    const currencyMap = {
      'NGN': { locale: 'en-NG', currency: 'NGN' },
      'USD': { locale: 'en-US', currency: 'USD' },
      'EUR': { locale: 'en-EU', currency: 'EUR' },
      'GBP': { locale: 'en-GB', currency: 'GBP' }
    };
    
    const config = currencyMap[currency] || currencyMap['NGN'];
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculateProgress = (raised, target) => {
    return Math.min((raised / target) * 100, 100);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Online Giving</h1>
          <p className="text-gray-600 mt-1">Manage online donations and payment methods</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={FiSettings}>
            Payment Settings
          </Button>
          <Button icon={FiPlus} onClick={() => setShowGivingForm(true)}>
            Add Donation
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'donations', label: 'Donations' },
            { id: 'recurring', label: 'Recurring' },
            { id: 'campaigns', label: 'Campaigns' },
            { id: 'methods', label: 'Payment Methods' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100 mb-1">Total Online Giving</p>
                  <p className="text-3xl font-bold">₦425,000</p>
                  <p className="text-sm mt-2">This month</p>
                </div>
                <div className="p-3 bg-white bg-opacity-20 rounded-full">
                  <SafeIcon icon={FiGlobe} className="text-white text-xl" />
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Recurring Donors</p>
                  <p className="text-3xl font-bold text-gray-900">89</p>
                  <div className="flex items-center mt-2">
                    <SafeIcon icon={FiRepeat} className="text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600 font-medium">Monthly active</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <SafeIcon icon={FiRepeat} className="text-blue-500 text-xl" />
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Campaigns</p>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-500 mt-2">Fundraising goals</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100">
                  <SafeIcon icon={FiTarget} className="text-purple-500 text-xl" />
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">98.5%</p>
                  <p className="text-sm text-gray-500 mt-2">Payment success</p>
                </div>
                <div className="p-3 rounded-full bg-emerald-100">
                  <SafeIcon icon={FiTrendingUp} className="text-emerald-500 text-xl" />
                </div>
              </div>
            </Card>
          </div>

          {/* Payment Methods Chart */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods Distribution</h3>
              <SafeIcon icon={FiCreditCard} className="text-gray-400" />
            </div>
            <ReactEcharts option={paymentMethodsData} style={{ height: '300px' }} />
          </Card>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
            <Button icon={FiPlus} size="sm">Create Campaign</Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaigns.map(campaign => (
              <Card key={campaign.id}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    campaign.status === 'Nearly Complete' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">
                        {formatCurrency(campaign.raised)} / {formatCurrency(campaign.target)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${calculateProgress(campaign.raised, campaign.target)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">{campaign.donors} donors</span>
                      <span className="font-medium text-emerald-600">
                        {calculateProgress(campaign.raised, campaign.target).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">End Date:</span>
                    <span className="font-medium">{format(new Date(campaign.endDate), 'MMM d, yyyy')}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={FiEdit}>Edit</Button>
                    <Button variant="outline" size="sm" icon={FiLink}>Share Link</Button>
                    <Button variant="outline" size="sm" icon={FiDownload}>Export</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'methods' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Payment Method Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nigerian Payment Methods */}
            <Card>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Nigerian Payment Methods</h4>
              <div className="space-y-4">
                {[
                  { name: 'Paystack', status: 'Active', description: 'Nigerian cards, bank transfers, USSD' },
                  { name: 'Flutterwave', status: 'Active', description: 'Cards, bank transfers, mobile money' },
                  { name: 'Interswitch', status: 'Inactive', description: 'WebPAY, Verve cards' },
                  { name: 'Remita', status: 'Active', description: 'Bank transfers, USSD codes' }
                ].map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">{method.name}</h5>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        method.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {method.status}
                      </span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* International Payment Methods */}
            <Card>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">International Payment Methods</h4>
              <div className="space-y-4">
                {[
                  { name: 'Stripe', status: 'Active', description: 'Credit/debit cards worldwide' },
                  { name: 'PayPal', status: 'Active', description: 'PayPal accounts, cards' },
                  { name: 'Square', status: 'Inactive', description: 'Credit cards, digital wallets' },
                  { name: 'Razorpay', status: 'Inactive', description: 'International cards, wallets' }
                ].map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-900">{method.name}</h5>
                      <p className="text-sm text-gray-500">{method.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        method.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {method.status}
                      </span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Supported Currencies */}
          <Card>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Supported Currencies</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', active: true },
                { code: 'USD', name: 'US Dollar', symbol: '$', active: true },
                { code: 'EUR', name: 'Euro', symbol: '€', active: true },
                { code: 'GBP', name: 'British Pound', symbol: '£', active: false }
              ].map((currency, index) => (
                <div key={index} className={`p-4 border rounded-lg text-center ${
                  currency.active ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                }`}>
                  <div className="text-2xl font-bold mb-1">{currency.symbol}</div>
                  <div className="font-medium text-gray-900">{currency.code}</div>
                  <div className="text-sm text-gray-500">{currency.name}</div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      currency.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {currency.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'donations' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="w-full">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search donations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Filter and Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button variant="outline" size="sm" className="text-sm">
                    <SafeIcon icon={FiFilter} className="mr-1" />
                    More Filters
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-sm">
                    <SafeIcon icon={FiDownload} className="mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Donations List */}
          <Card>
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Donor</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Method</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onlineDonations.map((donation) => (
                      <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{donation.donorName}</p>
                            <p className="text-sm text-gray-500">{donation.email}</p>
                            {donation.recurring && (
                              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
                                <SafeIcon icon={FiRepeat} className="mr-1" />
                                {donation.frequency}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-green-600">
                          {formatCurrency(donation.amount, donation.currency)}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                            {donation.paymentMethod}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                              {donation.category}
                            </span>
                            {donation.campaign && (
                              <p className="text-xs text-gray-500 mt-1">{donation.campaign}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCalendar} className="text-gray-400" />
                            <span>{format(new Date(donation.date), 'MMM d, yyyy')}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            donation.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                              <SafeIcon icon={FiEdit} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <SafeIcon icon={FiDownload} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {onlineDonations.map((donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{donation.donorName}</p>
                        <p className="text-sm text-gray-500">{donation.email}</p>
                        {donation.recurring && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
                            <SafeIcon icon={FiRepeat} className="mr-1" />
                            {donation.frequency}
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(donation.amount, donation.currency)}</p>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className="text-gray-600">{format(new Date(donation.date), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          {donation.paymentMethod}
                        </span>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                          {donation.category}
                        </span>
                      </div>
                      {donation.campaign && (
                        <p className="text-xs text-gray-500">Campaign: {donation.campaign}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          donation.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {donation.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiDownload} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination - Inside Card */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Showing <span className="font-medium">{onlineDonations.length}</span> donations
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Donor</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {onlineDonations.map((donation) => (
                    <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{donation.donorName}</p>
                          <p className="text-sm text-gray-500">{donation.email}</p>
                          {donation.recurring && (
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mt-1">
                              <SafeIcon icon={FiRepeat} className="mr-1" />
                              {donation.frequency}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-green-600">
                        {formatCurrency(donation.amount, donation.currency)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                          {donation.paymentMethod}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                            {donation.category}
                          </span>
                          {donation.campaign && (
                            <p className="text-xs text-gray-500 mt-1">{donation.campaign}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiCalendar} className="text-gray-400" />
                          <span>{format(new Date(donation.date), 'MMM d, yyyy')}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          donation.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                            <SafeIcon icon={FiEdit} />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <SafeIcon icon={FiDownload} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Online Giving Form Modal */}
      {showGivingForm && (
        <OnlineGivingForm 
          onClose={() => setShowGivingForm(false)} 
          onSubmit={(data) => {
            console.log('Online giving data:', data);
            setShowGivingForm(false);
          }} 
        />
      )}
    </div>
  );
};

export default OnlineGiving;