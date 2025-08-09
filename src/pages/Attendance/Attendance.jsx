import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import AttendanceForm from '../../components/Attendance/AttendanceForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiDownload,
  FiArrowUp,
  FiArrowDown,
  FiTrendingUp
} = FiIcons;

const Attendance = () => {
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterDate, setFilterDate] = useState('');

  // Mock data for attendance records
  const attendanceRecords = [
    {
      id: 1,
      date: '2023-06-04',
      service: 'Sunday Morning Service',
      time: '09:00',
      totalAttendees: 120,
      presentMembers: 85,
      visitors: 35,
      trend: 'up'
    },
    {
      id: 2,
      date: '2023-05-28',
      service: 'Sunday Morning Service',
      time: '09:00',
      totalAttendees: 115,
      presentMembers: 80,
      visitors: 35,
      trend: 'down'
    },
    {
      id: 3,
      date: '2023-05-21',
      service: 'Sunday Morning Service',
      time: '09:00',
      totalAttendees: 118,
      presentMembers: 82,
      visitors: 36,
      trend: 'up'
    },
    {
      id: 4,
      date: '2023-05-24',
      service: 'Midweek Service',
      time: '18:30',
      totalAttendees: 65,
      presentMembers: 62,
      visitors: 3,
      trend: 'up'
    },
    {
      id: 5,
      date: '2023-05-17',
      service: 'Midweek Service',
      time: '18:30',
      totalAttendees: 60,
      presentMembers: 58,
      visitors: 2,
      trend: 'down'
    }
  ];

  const handleSaveAttendance = (data) => {
    console.log('Attendance data:', data);
    // Here you would save the attendance data to your database
    setShowAttendanceForm(false);
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterService === 'all' || record.service === filterService;
    const matchesDate = !filterDate || record.date === filterDate;
    return matchesSearch && matchesService && matchesDate;
  });

  // Calculate stats
  const totalAttendees = attendanceRecords.reduce((sum, record) => sum + record.totalAttendees, 0);
  const averageAttendance = Math.round(totalAttendees / attendanceRecords.length);
  const maxAttendance = Math.max(...attendanceRecords.map(record => record.totalAttendees));
  const totalVisitors = attendanceRecords.reduce((sum, record) => sum + record.visitors, 0);

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-600 mt-1">Track service attendance and member participation</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => setShowAttendanceForm(true)}
        >
          Record Attendance
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-100 mb-1">Total Attendance</p>
              <p className="text-3xl font-bold">{totalAttendees}</p>
              <p className="text-sm mt-2">Last 5 services</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <SafeIcon icon={FiUsers} className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Attendance</p>
              <p className="text-3xl font-bold text-gray-900">{averageAttendance}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiTrendingUp} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+5%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiUsers} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Peak Attendance</p>
              <p className="text-3xl font-bold text-gray-900">{maxAttendance}</p>
              <p className="text-sm text-gray-500 mt-2">Sunday, June 4</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiTrendingUp} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Visitors</p>
              <p className="text-3xl font-bold text-gray-900">{totalVisitors}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiTrendingUp} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiUsers} className="text-orange-500 text-xl" />
            </div>
          </div>
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
                placeholder="Search services..."
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
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="all">All Services</option>
                <option value="Sunday Morning Service">Sunday Morning</option>
                <option value="Midweek Service">Midweek</option>
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

      {/* Attendance Records */}
      <Card>
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Time</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Total</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Members</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Visitors</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="text-emerald-500" />
                        <span>{format(new Date(record.date), 'MMM d, yyyy')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{record.service}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiClock} className="text-gray-400" />
                        <span>{record.time}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">{record.totalAttendees}</td>
                    <td className="py-4 px-4 text-right">{record.presentMembers}</td>
                    <td className="py-4 px-4 text-right">{record.visitors}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        {record.trend === 'up' ? (
                          <SafeIcon icon={FiArrowUp} className="text-green-500" />
                        ) : (
                          <SafeIcon icon={FiArrowDown} className="text-red-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredRecords.map((record) => (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <SafeIcon icon={FiCalendar} className="text-emerald-500" />
                      <span className="font-medium text-gray-900">{format(new Date(record.date), 'MMM d, yyyy')}</span>
                    </div>
                    <p className="text-sm text-gray-600">{record.service}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiClock} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{record.time}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{record.totalAttendees}</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{record.presentMembers}</p>
                    <p className="text-xs text-gray-500">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{record.visitors}</p>
                    <p className="text-xs text-gray-500">Visitors</p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  {record.trend === 'up' ? (
                    <div className="flex items-center text-green-600">
                      <SafeIcon icon={FiArrowUp} className="mr-1" />
                      <span className="text-sm">Trending Up</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <SafeIcon icon={FiArrowDown} className="mr-1" />
                      <span className="text-sm">Trending Down</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination - Inside Card */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Showing <span className="font-medium">{filteredRecords.length}</span> of <span className="font-medium">{attendanceRecords.length}</span> records
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

      {/* Attendance Form Modal */}
      {showAttendanceForm && (
        <AttendanceForm 
          onClose={() => setShowAttendanceForm(false)} 
          onSubmit={handleSaveAttendance} 
        />
      )}
    </div>
  );
};

export default Attendance;