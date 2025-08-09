import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
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
  FiUser,
  FiPieChart,
  FiBarChart2
} = FiIcons;

const Tithe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterMember, setFilterMember] = useState('all');

  // Mock data for tithes
  const tithes = [
    {
      id: 1,
      memberName: 'John Smith',
      memberId: 'M001',
      amount: 50000.00,
      date: '2023-06-04',
      paymentMethod: 'Bank Transfer',
      reference: 'TXN123456789',
      notes: 'Monthly tithe',
      status: 'Verified'
    },
    {
      id: 2,
      memberName: 'Sarah Johnson',
      memberId: 'M002',
      amount: 35000.00,
      date: '2023-06-04',
      paymentMethod: 'Cash',
      reference: 'CASH-001',
      notes: '',
      status: 'Verified'
    },
    {
      id: 3,
      memberName: 'Mike Wilson',
      memberId: 'M003',
      amount: 25000.00,
      date: '2023-06-03',
      paymentMethod: 'POS',
      reference: 'POS789012',
      notes: 'Weekly tithe',
      status: 'Verified'
    },
    {
      id: 4,
      memberName: 'Emily Davis',
      memberId: 'M004',
      amount: 40000.00,
      date: '2023-06-01',
      paymentMethod: 'Mobile Money',
      reference: 'MM345678',
      notes: 'Bi-weekly tithe',
      status: 'Pending'
    },
    {
      id: 5,
      memberName: 'Robert Brown',
      memberId: 'M005',
      amount: 30000.00,
      date: '2023-05-28',
      paymentMethod: 'Bank Transfer',
      reference: 'TXN987654321',
      notes: 'Monthly tithe',
      status: 'Verified'
    }
  ];

  // Calculate stats
  const totalTithes = tithes.reduce((sum, tithe) => sum + tithe.amount, 0);
  const averageTithe = totalTithes / tithes.length;
  const verifiedTithes = tithes.filter(t => t.status === 'Verified').length;
  const pendingTithes = tithes.filter(t => t.status === 'Pending').length;

  // Chart data for payment methods
  const paymentMethodsData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: ₦{c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      data: ['Bank Transfer', 'Cash', 'POS', 'Mobile Money']
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
          { value: 80000, name: 'Bank Transfer' },
          { value: 35000, name: 'Cash' },
          { value: 25000, name: 'POS' },
          { value: 40000, name: 'Mobile Money' }
        ],
        color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
      }
    ]
  };

  // Monthly trend data
  const monthlyTrendData = {
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
          formatter: '₦{value}'
        }
      }
    ],
    series: [
      {
        name: 'Monthly Tithes',
        type: 'line',
        data: [450000, 520000, 480000, 580000, 620000, 680000],
        color: '#10b981',
        smooth: true,
        areaStyle: {
          opacity: 0.3
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

  const filteredTithes = tithes.filter(tithe => {
    const matchesSearch = tithe.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tithe.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || tithe.date === filterDate;
    const matchesMember = filterMember === 'all' || tithe.memberId === filterMember;
    return matchesSearch && matchesDate && matchesMember;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tithe Management</h1>
          <p className="text-gray-600 mt-1">Track and manage member tithes and contributions</p>
        </div>
        <Button icon={FiPlus}>
          Record Tithe
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100 mb-1">Total Tithes</p>
              <p className="text-3xl font-bold">{formatCurrency(totalTithes)}</p>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Average Tithe</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(averageTithe)}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiTrendingUp} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+8%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiBarChart2} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Verified</p>
              <p className="text-3xl font-bold text-gray-900">{verifiedTithes}</p>
              <p className="text-sm text-gray-500 mt-2">Confirmed payments</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiUser} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{pendingTithes}</p>
              <p className="text-sm text-gray-500 mt-2">Awaiting verification</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiCalendar} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trend</h3>
            <SafeIcon icon={FiBarChart2} className="text-gray-400" />
          </div>
          <ReactEcharts option={monthlyTrendData} style={{ height: '300px' }} />
        </Card>
        
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            <SafeIcon icon={FiPieChart} className="text-gray-400" />
          </div>
          <ReactEcharts option={paymentMethodsData} style={{ height: '300px' }} />
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="w-full">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tithes..."
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
                value={filterMember}
                onChange={(e) => setFilterMember(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="all">All Members</option>
                <option value="M001">John Smith</option>
                <option value="M002">Sarah Johnson</option>
                <option value="M003">Mike Wilson</option>
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

      {/* Tithes List */}
      <Card>
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Reference</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTithes.map((tithe) => (
                  <tr key={tithe.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {tithe.memberName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tithe.memberName}</p>
                          <p className="text-sm text-gray-500">{tithe.memberId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="text-blue-500" />
                        <span>{format(new Date(tithe.date), 'MMM d, yyyy')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-blue-600">
                      {formatCurrency(tithe.amount)}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {tithe.paymentMethod}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-sm text-gray-600">
                      {tithe.reference}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        tithe.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {tithe.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <SafeIcon icon={FiDownload} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            {filteredTithes.map((tithe) => (
              <div key={tithe.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                      {tithe.memberName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tithe.memberName}</p>
                      <p className="text-sm text-gray-500">{tithe.memberId}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{formatCurrency(tithe.amount)}</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiCalendar} className="text-blue-500" />
                    <span className="text-gray-600">{format(new Date(tithe.date), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {tithe.paymentMethod}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tithe.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {tithe.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">Ref: {tithe.reference}</p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiEdit} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <SafeIcon icon={FiDownload} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                Showing <span className="font-medium">{filteredTithes.length}</span> of <span className="font-medium">{tithes.length}</span> tithes
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
            <select
              value={filterMember}
              onChange={(e) => setFilterMember(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Members</option>
              <option value="M001">John Smith</option>
              <option value="M002">Sarah Johnson</option>
              <option value="M003">Mike Wilson</option>
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

      {/* Tithes List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Reference</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTithes.map((tithe) => (
                <tr key={tithe.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {tithe.memberName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tithe.memberName}</p>
                        <p className="text-sm text-gray-500">{tithe.memberId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-blue-500" />
                      <span>{format(new Date(tithe.date), 'MMM d, yyyy')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-blue-600">
                    {formatCurrency(tithe.amount)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {tithe.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-sm text-gray-600">
                    {tithe.reference}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tithe.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {tithe.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiDownload} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <SafeIcon icon={FiTrash2} />
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
  );
};

export default Tithe;