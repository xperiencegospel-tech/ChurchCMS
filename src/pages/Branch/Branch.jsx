import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import BranchForm from '../../components/Branch/BranchForm';
import RemittanceForm from '../../components/Branch/RemittanceForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';
import ReactEcharts from 'echarts-for-react';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiSend,
  FiDownload,
  FiCalendar,
  FiTrendingUp,
  FiBuilding,
  FiPhone,
  FiMail,
  FiUser
} = FiIcons;

const Branch = () => {
  const [activeTab, setActiveTab] = useState('branches');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [showRemittanceForm, setShowRemittanceForm] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedRemittance, setSelectedRemittance] = useState(null);

  // Mock data for branches
  const branches = [
    {
      id: 1,
      name: 'Grace Community Church - Downtown',
      code: 'GCC-DT',
      address: '123 Main Street, Downtown, City 12345',
      pastor: 'Pastor Michael Johnson',
      phone: '+1 (555) 123-4567',
      email: 'downtown@gracechurch.org',
      members: 450,
      status: 'Active',
      established: '2018-03-15',
      lastRemittance: '2023-06-01',
      totalRemittances: 2450000.00
    },
    {
      id: 2,
      name: 'Grace Community Church - Westside',
      code: 'GCC-WS',
      address: '456 Oak Avenue, Westside, City 12346',
      pastor: 'Pastor Sarah Williams',
      phone: '+1 (555) 987-6543',
      email: 'westside@gracechurch.org',
      members: 320,
      status: 'Active',
      established: '2019-08-20',
      lastRemittance: '2023-06-01',
      totalRemittances: 1850000.00
    },
    {
      id: 3,
      name: 'Grace Community Church - Northgate',
      code: 'GCC-NG',
      address: '789 Pine Road, Northgate, City 12347',
      pastor: 'Pastor David Brown',
      phone: '+1 (555) 456-7890',
      email: 'northgate@gracechurch.org',
      members: 280,
      status: 'Active',
      established: '2020-11-10',
      lastRemittance: '2023-05-28',
      totalRemittances: 1620000.00
    },
    {
      id: 4,
      name: 'Grace Community Church - Eastpark',
      code: 'GCC-EP',
      address: '321 Elm Street, Eastpark, City 12348',
      pastor: 'Pastor Jennifer Davis',
      phone: '+1 (555) 234-5678',
      email: 'eastpark@gracechurch.org',
      members: 180,
      status: 'Planning',
      established: '2023-01-15',
      lastRemittance: null,
      totalRemittances: 0.00
    }
  ];

  // Mock data for remittances
  const remittances = [
    {
      id: 1,
      branchId: 1,
      branchName: 'Downtown',
      amount: 125000.00,
      date: '2023-06-01',
      period: 'May 2023',
      type: 'Monthly',
      status: 'Received',
      receivedBy: 'Finance Team',
      notes: 'Regular monthly remittance'
    },
    {
      id: 2,
      branchId: 2,
      branchName: 'Westside',
      amount: 98000.00,
      date: '2023-06-01',
      period: 'May 2023',
      type: 'Monthly',
      status: 'Received',
      receivedBy: 'Finance Team',
      notes: 'Includes special offering'
    },
    {
      id: 3,
      branchId: 3,
      branchName: 'Northgate',
      amount: 85000.00,
      date: '2023-05-28',
      period: 'May 2023',
      type: 'Monthly',
      status: 'Pending',
      receivedBy: null,
      notes: 'Delayed due to bank issues'
    },
    {
      id: 4,
      branchId: 1,
      branchName: 'Downtown',
      amount: 135000.00,
      date: '2023-05-01',
      period: 'April 2023',
      type: 'Monthly',
      status: 'Received',
      receivedBy: 'Finance Team',
      notes: 'Higher than usual due to Easter offerings'
    }
  ];

  // Chart data for branch performance
  const branchPerformanceData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Members', 'Remittances (₦000s)'],
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
        data: ['Downtown', 'Westside', 'Northgate', 'Eastpark']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Members',
        position: 'left'
      },
      {
        type: 'value',
        name: 'Remittances (₦000s)',
        position: 'right'
      }
    ],
    series: [
      {
        name: 'Members',
        type: 'bar',
        data: [450, 320, 280, 180],
        color: '#10b981'
      },
      {
        name: 'Remittances (₦000s)',
        type: 'line',
        yAxisIndex: 1,
        data: [2450, 1850, 1620, 0],
        color: '#3b82f6'
      }
    ]
  };

  // Monthly remittance trend
  const remittanceTrendData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
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
          formatter: '₦{value}k'
        }
      }
    ],
    series: [
      {
        name: 'Total Remittances',
        type: 'bar',
        data: [280, 295, 310, 350, 308, 0],
        color: '#10b981',
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setShowBranchForm(true);
  };

  const handleEditRemittance = (remittance) => {
    setSelectedRemittance(remittance);
    setShowRemittanceForm(true);
  };

  const handleAddBranch = (formData) => {
    console.log('New branch data:', formData);
    setShowBranchForm(false);
    setSelectedBranch(null);
  };

  const handleUpdateBranch = (formData) => {
    console.log('Updated branch data:', formData);
    setShowBranchForm(false);
    setSelectedBranch(null);
  };

  const handleAddRemittance = (formData) => {
    console.log('New remittance data:', formData);
    setShowRemittanceForm(false);
    setSelectedRemittance(null);
  };

  const handleUpdateRemittance = (formData) => {
    console.log('Updated remittance data:', formData);
    setShowRemittanceForm(false);
    setSelectedRemittance(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Planning':
        return 'bg-blue-100 text-blue-800';
      case 'Received':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const totalBranches = branches.length;
  const activeBranches = branches.filter(b => b.status === 'Active').length;
  const totalMembers = branches.reduce((sum, branch) => sum + branch.members, 0);
  const totalRemittanceAmount = remittances
    .filter(r => r.status === 'Received')
    .reduce((sum, remittance) => sum + remittance.amount, 0);
  const pendingRemittances = remittances.filter(r => r.status === 'Pending').length;

  const filteredBranches = branches.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.pastor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRemittances = remittances.filter(remittance =>
    remittance.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    remittance.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branch & Remittance</h1>
          <p className="text-gray-600 mt-1">Manage church branches and track remittances</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            icon={FiPlus}
            onClick={() => {
              setSelectedRemittance(null);
              setShowRemittanceForm(true);
            }}
          >
            Record Remittance
          </Button>
          <Button 
            icon={FiPlus}
            onClick={() => {
              setSelectedBranch(null);
              setShowBranchForm(true);
            }}
          >
            Add Branch
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Branches</p>
              <p className="text-3xl font-bold text-gray-900">{totalBranches}</p>
              <p className="text-sm text-gray-500 mt-2">{activeBranches} active</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiBuilding} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Members</p>
              <p className="text-3xl font-bold text-gray-900">{totalMembers.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">Across all branches</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiUsers} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-100 mb-1">Total Remittances</p>
              <p className="text-3xl font-bold">{formatCurrency(totalRemittanceAmount)}</p>
              <p className="text-sm mt-2">This month</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiDollarSign} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{pendingRemittances}</p>
              <p className="text-sm text-gray-500 mt-2">Awaiting receipt</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiCalendar} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {[
            { id: 'branches', label: 'Branches' },
            { id: 'remittances', label: 'Remittances' },
            { id: 'analytics', label: 'Analytics' }
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
      {activeTab === 'branches' && (
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
                    placeholder="Search branches..."
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

          {/* Branches List */}
          <Card>
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Branch</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Pastor</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Members</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Remittance</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBranches.map((branch) => (
                      <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                              {branch.code}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{branch.name}</p>
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <SafeIcon icon={FiMapPin} className="text-xs" />
                                <span>{branch.address}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{branch.pastor}</p>
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <SafeIcon icon={FiPhone} className="text-xs" />
                              <span>{branch.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiUsers} className="text-gray-400" />
                            <span className="font-medium text-gray-900">{branch.members}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {branch.lastRemittance ? (
                            <div className="flex items-center space-x-2">
                              <SafeIcon icon={FiCalendar} className="text-gray-400" />
                              <span className="text-gray-900">{format(new Date(branch.lastRemittance), 'MMM d, yyyy')}</span>
                            </div>
                          ) : (
                            <span className="text-gray-500">No remittances</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(branch.status)}`}>
                            {branch.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button 
                              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <SafeIcon icon={FiEye} />
                            </button>
                            <button 
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => handleEditBranch(branch)}
                              title="Edit Branch"
                            >
                              <SafeIcon icon={FiEdit} />
                            </button>
                            <button 
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Branch"
                            >
                              <SafeIcon icon={FiTrash2} />
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
                {filteredBranches.map((branch) => (
                  <div key={branch.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {branch.code}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{branch.name}</p>
                          <p className="text-sm text-gray-500">{branch.pastor}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(branch.status)}`}>
                        {branch.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiMapPin} className="text-gray-400" />
                        <span className="text-gray-600">{branch.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiPhone} className="text-gray-400" />
                        <span className="text-gray-600">{branch.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiUsers} className="text-gray-400" />
                          <span className="font-medium text-gray-900">{branch.members} members</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {branch.lastRemittance ? `Last: ${format(new Date(branch.lastRemittance), 'MMM d')}` : 'No remittances'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditBranch(branch)}
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination - Inside Card */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Showing <span className="font-medium">{filteredBranches.length}</span> of <span className="font-medium">{branches.length}</span> branches
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

      {activeTab === 'remittances' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search remittances..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
                <Button variant="outline" icon={FiDownload} size="sm">Export</Button>
              </div>
            </div>
          </Card>

          {/* Remittances List */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Branch</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Period</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Received By</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRemittances.map((remittance) => (
                    <tr key={remittance.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiBuilding} className="text-emerald-500" />
                          <span className="font-medium text-gray-900">{remittance.branchName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{remittance.period}</td>
                      <td className="py-4 px-4 font-semibold text-green-600">
                        {formatCurrency(remittance.amount)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiCalendar} className="text-gray-400" />
                          <span>{format(new Date(remittance.date), 'MMM d, yyyy')}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(remittance.status)}`}>
                          {remittance.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {remittance.receivedBy ? (
                          <span className="text-gray-900">{remittance.receivedBy}</span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <SafeIcon icon={FiEye} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => handleEditRemittance(remittance)}
                            title="Edit Remittance"
                          >
                            <SafeIcon icon={FiEdit} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download Receipt"
                          >
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

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Branch Performance</h3>
                <SafeIcon icon={FiTrendingUp} className="text-gray-400" />
              </div>
              <ReactEcharts option={branchPerformanceData} style={{ height: '300px' }} />
            </Card>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Remittance Trend</h3>
                <SafeIcon icon={FiDollarSign} className="text-gray-400" />
              </div>
              <ReactEcharts option={remittanceTrendData} style={{ height: '300px' }} />
            </Card>
          </div>

          {/* Branch Performance Summary */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Branch Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {branches.filter(b => b.status === 'Active').map(branch => (
                <div key={branch.id} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{branch.name.split(' - ')[1]}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Members:</span>
                      <span className="font-medium">{branch.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Remitted:</span>
                      <span className="font-medium text-green-600">{formatCurrency(branch.totalRemittances)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg per Member:</span>
                      <span className="font-medium">{formatCurrency(branch.totalRemittances / branch.members)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Branch Form Modal */}
      {showBranchForm && (
        <BranchForm 
          initialData={selectedBranch} 
          onClose={() => {
            setShowBranchForm(false);
            setSelectedBranch(null);
          }} 
          onSubmit={selectedBranch ? handleUpdateBranch : handleAddBranch} 
        />
      )}

      {/* Remittance Form Modal */}
      {showRemittanceForm && (
        <RemittanceForm 
          initialData={selectedRemittance}
          branches={branches}
          onClose={() => {
            setShowRemittanceForm(false);
            setSelectedRemittance(null);
          }} 
          onSubmit={selectedRemittance ? handleUpdateRemittance : handleAddRemittance} 
        />
      )}
    </div>
  );
};

export default Branch;