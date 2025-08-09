import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import DonationForm from '../../components/Finance/DonationForm';
import ExpenseForm from '../../components/Finance/ExpenseForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';
import ReactEcharts from 'echarts-for-react';

const {
  FiPlus,
  FiSearch,
  FiFilter,
  FiDollarSign,
  FiArrowUp,
  FiArrowDown,
  FiDownload,
  FiPieChart,
  FiTrendingUp,
  FiCalendar,
  FiCreditCard
} = FiIcons;

const Finance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  // Mock data
  const donations = [
    {
      id: 1,
      donorName: 'John Smith',
      amount: 50000.00,
      date: '2023-06-04',
      category: 'tithe',
      paymentMethod: 'transfer'
    },
    {
      id: 2,
      donorName: 'Sarah Johnson',
      amount: 25000.00,
      date: '2023-06-04',
      category: 'offering',
      paymentMethod: 'cash'
    },
    {
      id: 3,
      donorName: 'Mike Wilson',
      amount: 100000.00,
      date: '2023-06-03',
      category: 'building_fund',
      paymentMethod: 'pos'
    },
    {
      id: 4,
      donorName: 'Emily Davis',
      amount: 15000.00,
      date: '2023-06-01',
      category: 'missions',
      paymentMethod: 'ussd'
    },
    {
      id: 5,
      donorName: 'Robert Brown',
      amount: 7500.00,
      date: '2023-05-28',
      category: 'tithe',
      paymentMethod: 'paystack'
    }
  ];

  const expenses = [
    {
      id: 1,
      description: 'Utilities',
      amount: 35000.00,
      date: '2023-06-02',
      category: 'Utilities',
      paymentMethod: 'transfer'
    },
    {
      id: 2,
      description: 'Office Supplies',
      amount: 12050.00,
      date: '2023-06-01',
      category: 'Office Supplies',
      paymentMethod: 'pos'
    },
    {
      id: 3,
      description: 'Worship Equipment',
      amount: 75000.00,
      date: '2023-05-29',
      category: 'Equipment',
      paymentMethod: 'check'
    },
    {
      id: 4,
      description: 'Pastor Salary',
      amount: 250000.00,
      date: '2023-05-28',
      category: 'Salaries',
      paymentMethod: 'transfer'
    },
    {
      id: 5,
      description: 'Building Repair',
      amount: 42575.00,
      date: '2023-05-25',
      category: 'Maintenance',
      paymentMethod: 'pos'
    }
  ];

  // Calculate stats
  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netBalance = totalDonations - totalExpenses;
  const netChangePercentage = ((totalDonations - totalExpenses) / totalDonations * 100).toFixed(1);

  // Filter functions
  const filterItems = (items) => {
    return items.filter(item => {
      const matchesSearch = item.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesDate = !filterDate || item.date === filterDate;
      return matchesSearch && matchesCategory && matchesDate;
    });
  };

  const filteredDonations = filterItems(donations);
  const filteredExpenses = filterItems(expenses);

  // Format currency function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Chart data
  const donationsByCategoryData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ₦{c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      data: ['Tithe', 'Offering', 'Building Fund', 'Missions', 'Other']
    },
    series: [
      {
        name: 'Donations',
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
          { value: 120000, name: 'Tithe' },
          { value: 50000, name: 'Offering' },
          { value: 100000, name: 'Building Fund' },
          { value: 35000, name: 'Missions' },
          { value: 20000, name: 'Other' }
        ],
        color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#6b7280']
      }
    ]
  };

  const expensesByCategoryData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ₦{c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      data: ['Utilities', 'Salaries', 'Equipment', 'Maintenance', 'Office Supplies']
    },
    series: [
      {
        name: 'Expenses',
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
          { value: 35000, name: 'Utilities' },
          { value: 250000, name: 'Salaries' },
          { value: 75000, name: 'Equipment' },
          { value: 42575, name: 'Maintenance' },
          { value: 12050, name: 'Office Supplies' }
        ],
        color: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#6b7280']
      }
    ]
  };

  const monthlyComparisonData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Donations', 'Expenses'],
      bottom: 'bottom'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '₦{value}'
        }
      }
    ],
    series: [
      {
        name: 'Donations',
        type: 'bar',
        data: [320000, 280000, 350000, 310000, 360000, 325000],
        color: '#10b981'
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [280000, 250000, 320000, 290000, 310000, 300000],
        color: '#ef4444'
      }
    ]
  };

  const handleAddDonation = (formData) => {
    console.log('New donation data:', formData);
    // Here you would add the donation to your database
    setShowDonationForm(false);
  };

  const handleAddExpense = (formData) => {
    console.log('New expense data:', formData);
    // Here you would add the expense to your database
    setShowExpenseForm(false);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">Manage donations, expenses, and financial reports</p>
        </div>
        <div className="flex space-x-3">
          <Button icon={FiPlus} variant="outline" onClick={() => setShowExpenseForm(true)}>
            Add Expense
          </Button>
          <Button icon={FiPlus} onClick={() => setShowDonationForm(true)}>
            Add Donation
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`${netBalance >= 0 ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' : 'bg-gradient-to-br from-red-500 to-red-700'} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white text-opacity-80 mb-1">Net Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(netBalance)}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={netBalance >= 0 ? FiArrowUp : FiArrowDown} className="mr-1" />
                <span className="text-sm font-medium">{Math.abs(netChangePercentage)}%</span>
                <span className="text-sm ml-1">from last month</span>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiDollarSign} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Income</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalDonations)}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiArrowUp} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+8.5%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiArrowUp} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiArrowUp} className="text-red-500 mr-1" />
                <span className="text-sm text-red-600 font-medium">+5.2%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiArrowDown} className="text-red-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'overview' ? 'text-emerald-600 border-emerald-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'donations' ? 'text-emerald-600 border-emerald-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('donations')}
          >
            Donations
          </button>
          <button
            className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'expenses' ? 'text-emerald-600 border-emerald-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </button>
          <button
            className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'reports' ? 'text-emerald-600 border-emerald-600' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Comparison</h3>
                <SafeIcon icon={FiTrendingUp} className="text-gray-400" />
              </div>
              <ReactEcharts option={monthlyComparisonData} style={{ height: '300px' }} />
            </Card>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Income by Category</h3>
                <SafeIcon icon={FiPieChart} className="text-gray-400" />
              </div>
              <ReactEcharts option={donationsByCategoryData} style={{ height: '300px' }} />
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Button variant="outline" icon={FiDownload} size="sm">Export</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ...donations.map(d => ({ ...d, type: 'income', description: `Donation from ${d.donorName}` })),
                    ...expenses.map(e => ({ ...e, type: 'expense' }))
                  ]
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map((transaction, index) => (
                      <tr
                        key={`${transaction.type}-${transaction.id}`}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCalendar} className="text-gray-400" />
                            <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{transaction.description}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {transaction.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon
                              icon={transaction.type === 'income' ? FiArrowUp : FiArrowDown}
                              className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}
                            />
                            <span className="capitalize">{transaction.type}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-medium">
                          <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
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
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="tithe">Tithe</option>
                    <option value="offering">Offering</option>
                    <option value="building_fund">Building Fund</option>
                    <option value="missions">Missions</option>
                  </select>
                  <div className="relative">
                    <SafeIcon icon={FiCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="text-sm">
                    <SafeIcon icon={FiFilter} className="mr-1" />
                    More Filters
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
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Donor</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Method</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonations.map((donation) => (
                      <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCalendar} className="text-gray-400" />
                            <span>{format(new Date(donation.date), 'MMM d, yyyy')}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-medium text-gray-900">{donation.donorName}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {donation.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCreditCard} className="text-gray-400" />
                            <span className="capitalize">{donation.paymentMethod}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-green-600">
                          {formatCurrency(donation.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {filteredDonations.map((donation) => (
                  <div key={donation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{donation.donorName}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <SafeIcon icon={FiCalendar} className="text-gray-400" />
                          <span>{format(new Date(donation.date), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-green-600">{formatCurrency(donation.amount)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {donation.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <SafeIcon icon={FiCreditCard} className="text-gray-400" />
                        <span className="capitalize">{donation.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination - Inside Card */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Showing <span className="font-medium">{filteredDonations.length}</span> of <span className="font-medium">{donations.length}</span> donations
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
          </Card>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Salaries">Salaries</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
                <div className="relative">
                  <SafeIcon icon={FiCalendar} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
              </div>
            </div>
          </Card>

          {/* Expenses List */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Method</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiCalendar} className="text-gray-400" />
                          <span>{format(new Date(expense.date), 'MMM d, yyyy')}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{expense.description}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiCreditCard} className="text-gray-400" />
                          <span className="capitalize">{expense.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-red-600">
                        -{formatCurrency(expense.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">{filteredExpenses.length}</span> of <span className="font-medium">{expenses.length}</span> expenses
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Financial Reports</h3>
              <Button variant="outline" icon={FiDownload} size="sm">Export All</Button>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Monthly Financial Statement',
                  description: 'Summary of all income and expenses for the current month',
                  date: '2023-06-01'
                },
                {
                  title: 'Quarterly Report',
                  description: 'Financial performance for Q2 2023',
                  date: '2023-04-01'
                },
                {
                  title: 'Annual Budget Comparison',
                  description: 'Actual spending vs. budgeted amounts for 2023',
                  date: '2023-01-01'
                },
                {
                  title: 'Donation Summary by Category',
                  description: 'Breakdown of donations by category for the current year',
                  date: '2023-01-01'
                }
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-500">{report.description}</p>
                    <p className="text-xs text-gray-400 mt-1">Generated: {format(new Date(report.date), 'MMMM d, yyyy')}</p>
                  </div>
                  <Button variant="outline" icon={FiDownload} size="sm">Download</Button>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Custom Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                  <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Income Statement</option>
                    <option>Expense Report</option>
                    <option>Donation Summary</option>
                    <option>Budget Comparison</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button icon={FiPieChart}>Generate Report</Button>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
            <ReactEcharts option={expensesByCategoryData} style={{ height: '300px' }} />
          </Card>
        </div>
      )}

      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm onClose={() => setShowDonationForm(false)} onSubmit={handleAddDonation} />
      )}

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} onSubmit={handleAddExpense} />
      )}
    </div>
  );
};

export default Finance;