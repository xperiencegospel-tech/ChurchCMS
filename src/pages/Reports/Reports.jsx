import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import ReactEcharts from 'echarts-for-react';

const { 
  FiDownload,
  FiPrinter,
  FiFileText,
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiDollarSign
} = FiIcons;

const Reports = () => {
  const [activeTab, setActiveTab] = useState('attendance');
  const [period, setPeriod] = useState('month');

  // Attendance chart data
  const attendanceChartData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Adults', 'Youth', 'Children'],
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
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Adults',
        type: 'bar',
        stack: 'total',
        data: [120, 132, 101, 134, 90],
        color: '#10b981'
      },
      {
        name: 'Youth',
        type: 'bar',
        stack: 'total',
        data: [45, 52, 48, 54, 42],
        color: '#3b82f6'
      },
      {
        name: 'Children',
        type: 'bar',
        stack: 'total',
        data: [35, 42, 30, 38, 28],
        color: '#f59e0b'
      }
    ]
  };

  // Membership chart data
  const membershipChartData = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      data: ['Active', 'Inactive', 'New', 'Transferred']
    },
    series: [
      {
        name: 'Membership',
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
          { value: 1048, name: 'Active' },
          { value: 235, name: 'Inactive' },
          { value: 120, name: 'New' },
          { value: 25, name: 'Transferred' }
        ],
        color: ['#10b981', '#6b7280', '#3b82f6', '#8b5cf6']
      }
    ]
  };

  // Finance chart data
  const financeChartData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['Income', 'Expenses', 'Net'],
      bottom: 'bottom'
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Amount',
        min: 0,
        max: 25000,
        interval: 5000,
        axisLabel: {
          formatter: '₦{value}'
        }
      }
    ],
    series: [
      {
        name: 'Income',
        type: 'bar',
        data: [18000, 16500, 19000, 17500, 20000, 18500],
        color: '#10b981'
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: [15000, 14500, 16000, 15500, 17000, 16000],
        color: '#ef4444'
      },
      {
        name: 'Net',
        type: 'line',
        data: [3000, 2000, 3000, 2000, 3000, 2500],
        color: '#3b82f6'
      }
    ]
  };

  // Visitor conversion chart data
  const visitorChartData = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Visitors', 'Converted to Members'],
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
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Visitors',
        type: 'bar',
        data: [45, 52, 38, 54, 42, 56],
        color: '#f59e0b'
      },
      {
        name: 'Converted to Members',
        type: 'bar',
        data: [12, 15, 10, 18, 14, 20],
        color: '#10b981'
      }
    ]
  };

  // Report types
  const reportTypes = [
    { id: 'attendance', label: 'Attendance', icon: FiUsers },
    { id: 'membership', label: 'Membership', icon: FiUsers },
    { id: 'financial', label: 'Financial', icon: FiDollarSign },
    { id: 'visitors', label: 'Visitors', icon: FiUsers }
  ];

  // Period options
  const periodOptions = [
    { value: 'week', label: 'Weekly' },
    { value: 'month', label: 'Monthly' },
    { value: 'quarter', label: 'Quarterly' },
    { value: 'year', label: 'Yearly' }
  ];

  // Get the active chart based on selected tab
  const getActiveChart = () => {
    switch(activeTab) {
      case 'attendance':
        return attendanceChartData;
      case 'membership':
        return membershipChartData;
      case 'financial':
        return financeChartData;
      case 'visitors':
        return visitorChartData;
      default:
        return attendanceChartData;
    }
  };

  // Get the report title based on selected tab and period
  const getReportTitle = () => {
    const periodText = period === 'week' ? 'Weekly' : period === 'month' ? 'Monthly' : period === 'quarter' ? 'Quarterly' : 'Yearly';
    switch(activeTab) {
      case 'attendance':
        return `${periodText} Attendance Report`;
      case 'membership':
        return `${periodText} Membership Report`;
      case 'financial':
        return `${periodText} Financial Report`;
      case 'visitors':
        return `${periodText} Visitor Report`;
      default:
        return `${periodText} Report`;
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and view various church reports</p>
      </div>
      
      {/* Report Type Selector */}
      <Card className="p-0 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200">
          {reportTypes.map(type => (
            <button
              key={type.id}
              className={`py-4 px-6 flex items-center space-x-2 whitespace-nowrap border-b-2 ${
                activeTab === type.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(type.id)}
            >
              <SafeIcon icon={type.icon} />
              <span className="font-medium">{type.label}</span>
            </button>
          ))}
        </div>
        
        {/* Report Controls */}
        <div className="flex flex-wrap justify-between items-center p-4 bg-gray-50">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">{getReportTitle()}</h2>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {periodOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" icon={FiDownload} size="sm">Export</Button>
            <Button variant="outline" icon={FiPrinter} size="sm">Print</Button>
          </div>
        </div>
      </Card>
      
      {/* Chart */}
      <Card>
        <ReactEcharts option={getActiveChart()} style={{ height: '400px' }} />
      </Card>
      
      {/* Report Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === 'attendance' ? 'Attendance Summary' :
               activeTab === 'membership' ? 'Membership Summary' :
               activeTab === 'financial' ? 'Financial Summary' : 'Visitor Summary'}
            </h3>
            <SafeIcon icon={FiFileText} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {activeTab === 'attendance' && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Attendance (Average)</span>
                  <span className="font-medium text-gray-900">200</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Adults (Average)</span>
                  <span className="font-medium text-gray-900">120</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Youth (Average)</span>
                  <span className="font-medium text-gray-900">45</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Children (Average)</span>
                  <span className="font-medium text-gray-900">35</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-medium text-green-600">+5.2%</span>
                </div>
              </>
            )}
            
            {activeTab === 'membership' && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-medium text-gray-900">1,428</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Active Members</span>
                  <span className="font-medium text-gray-900">1,048</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Inactive Members</span>
                  <span className="font-medium text-gray-900">235</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">New Members (This Period)</span>
                  <span className="font-medium text-gray-900">120</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Transferred Members</span>
                  <span className="font-medium text-gray-900">25</span>
                </div>
              </>
            )}
            
            {activeTab === 'financial' && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Income</span>
                  <span className="font-medium text-gray-900">₦109,500.00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Expenses</span>
                  <span className="font-medium text-gray-900">₦94,000.00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Net Balance</span>
                  <span className="font-medium text-green-600">₦15,500.00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tithe Income</span>
                  <span className="font-medium text-gray-900">₦65,700.00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Special Offerings</span>
                  <span className="font-medium text-gray-900">₦43,800.00</span>
                </div>
              </>
            )}
            
            {activeTab === 'visitors' && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Visitors</span>
                  <span className="font-medium text-gray-900">287</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">First-time Visitors</span>
                  <span className="font-medium text-gray-900">185</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Return Visitors</span>
                  <span className="font-medium text-gray-900">102</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-medium text-green-600">31.2%</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Visitors Converted to Members</span>
                  <span className="font-medium text-gray-900">89</span>
                </div>
              </>
            )}
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
            <SafeIcon icon={FiBarChart2} className="text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Monthly Attendance Report', date: '2023-06-01', icon: FiUsers },
              { title: 'Quarterly Financial Statement', date: '2023-04-01', icon: FiDollarSign },
              { title: 'Annual Membership Report', date: '2023-01-15', icon: FiUsers },
              { title: 'Visitor Conversion Analysis', date: '2023-05-15', icon: FiTrendingUp },
              { title: 'Ministry Participation Report', date: '2023-03-10', icon: FiPieChart }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-md">
                    <SafeIcon icon={report.icon} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.title}</p>
                    <p className="text-xs text-gray-500">Generated on {new Date(report.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button variant="outline" icon={FiDownload} size="sm">Download</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      {/* Custom Report Builder */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Custom Report Builder</h3>
          <SafeIcon icon={FiFileText} className="text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option>Attendance Report</option>
              <option>Financial Report</option>
              <option>Membership Report</option>
              <option>Visitor Report</option>
              <option>Ministry Report</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiCalendar} className="text-gray-400" />
              </div>
              <input 
                type="date" 
                className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SafeIcon icon={FiCalendar} className="text-gray-400" />
              </div>
              <input 
                type="date" 
                className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex items-center">
            <input
              id="include_charts"
              name="include_charts"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
            />
            <label htmlFor="include_charts" className="ml-2 block text-sm text-gray-700">
              Include Charts
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="include_summary"
              name="include_summary"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
            />
            <label htmlFor="include_summary" className="ml-2 block text-sm text-gray-700">
              Include Summary
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              id="include_raw_data"
              name="include_raw_data"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
            />
            <label htmlFor="include_raw_data" className="ml-2 block text-sm text-gray-700">
              Include Raw Data
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button icon={FiFileText}>Generate Custom Report</Button>
        </div>
      </Card>
    </div>
  );
};

export default Reports;