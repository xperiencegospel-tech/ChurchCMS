import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import PrayerRequestForm from '../../components/PrayerRequests/PrayerRequestForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiHeart,
  FiUser,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
  FiGlobe
} = FiIcons;

const PrayerRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPrivacy, setFilterPrivacy] = useState('all');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data for prayer requests
  const prayerRequests = [
    {
      id: 1,
      title: 'Healing for My Mother',
      requester: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      category: 'Health',
      priority: 'High',
      privacy: 'Private',
      status: 'Active',
      dateSubmitted: '2023-06-04',
      dateUpdated: '2023-06-04',
      description: 'Please pray for my mother who is undergoing surgery next week. We are trusting God for complete healing and recovery.',
      updates: [
        { date: '2023-06-04', note: 'Surgery scheduled for June 10th' }
      ],
      assignedTo: 'Pastor John'
    },
    {
      id: 2,
      title: 'Job Search Guidance',
      requester: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+1 (555) 456-7890',
      category: 'Career',
      priority: 'Medium',
      privacy: 'Public',
      status: 'Active',
      dateSubmitted: '2023-06-03',
      dateUpdated: '2023-06-03',
      description: 'I have been unemployed for 3 months. Please pray for wisdom and guidance as I search for a new job opportunity.',
      updates: [],
      assignedTo: 'Elder Sarah'
    },
    {
      id: 3,
      title: 'Family Reconciliation',
      requester: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '+1 (555) 234-5678',
      category: 'Family',
      priority: 'High',
      privacy: 'Confidential',
      status: 'Active',
      dateSubmitted: '2023-06-01',
      dateUpdated: '2023-06-02',
      description: 'Please pray for restoration in my family relationships. There has been conflict and we need God\'s peace and healing.',
      updates: [
        { date: '2023-06-02', note: 'Had a conversation with family member - some progress' }
      ],
      assignedTo: 'Pastor John'
    },
    {
      id: 4,
      title: 'Financial Breakthrough',
      requester: 'Robert Brown',
      email: 'robert.b@email.com',
      phone: '+1 (555) 876-5432',
      category: 'Financial',
      priority: 'Medium',
      privacy: 'Public',
      status: 'Answered',
      dateSubmitted: '2023-05-20',
      dateUpdated: '2023-05-30',
      description: 'Struggling with debt and financial difficulties. Praying for God\'s provision and wisdom in managing finances.',
      updates: [
        { date: '2023-05-25', note: 'Received unexpected financial help from family' },
        { date: '2023-05-30', note: 'Praise God! Got a new job with better pay' }
      ],
      assignedTo: 'Deacon Michael'
    },
    {
      id: 5,
      title: 'Salvation for Husband',
      requester: 'Lisa Thompson',
      email: 'lisa.t@email.com',
      phone: '+1 (555) 345-6789',
      category: 'Salvation',
      priority: 'High',
      privacy: 'Private',
      status: 'Active',
      dateSubmitted: '2023-05-15',
      dateUpdated: '2023-05-15',
      description: 'Please pray for my husband\'s salvation. He is not yet a believer and I am praying for his heart to be open to the Gospel.',
      updates: [],
      assignedTo: 'Pastor John'
    }
  ];

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    // Open request details view
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestForm(true);
  };

  const handleAddRequest = (formData) => {
    console.log('New prayer request data:', formData);
    setShowRequestForm(false);
    setSelectedRequest(null);
  };

  const handleUpdateRequest = (formData) => {
    console.log('Updated prayer request data:', formData);
    setShowRequestForm(false);
    setSelectedRequest(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Answered':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrivacyIcon = (privacy) => {
    switch (privacy) {
      case 'Public':
        return FiGlobe;
      case 'Private':
        return FiLock;
      case 'Confidential':
        return FiLock;
      default:
        return FiGlobe;
    }
  };

  const filteredRequests = prayerRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesPrivacy = filterPrivacy === 'all' || request.privacy === filterPrivacy;
    return matchesSearch && matchesStatus && matchesPrivacy;
  });

  // Calculate stats
  const totalRequests = prayerRequests.length;
  const activeRequests = prayerRequests.filter(r => r.status === 'Active').length;
  const answeredRequests = prayerRequests.filter(r => r.status === 'Answered').length;
  const highPriorityRequests = prayerRequests.filter(r => r.priority === 'High').length;

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prayer Requests</h1>
          <p className="text-gray-600 mt-1">Manage and track prayer requests from the congregation</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedRequest(null);
            setShowRequestForm(true);
          }}
        >
          Add Prayer Request
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{totalRequests}</p>
              <p className="text-sm text-gray-500 mt-2">All time</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiHeart} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-gray-900">{activeRequests}</p>
              <p className="text-sm text-gray-500 mt-2">Currently praying</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiClock} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Answered</p>
              <p className="text-3xl font-bold text-gray-900">{answeredRequests}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiCheckCircle} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">Praise reports</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiCheckCircle} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">High Priority</p>
              <p className="text-3xl font-bold text-gray-900">{highPriorityRequests}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiAlertCircle} className="text-red-500 mr-1" />
                <span className="text-sm text-red-600 font-medium">Urgent prayers</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiAlertCircle} className="text-red-500 text-xl" />
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
                placeholder="Search prayer requests..."
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Answered">Answered</option>
                <option value="Closed">Closed</option>
              </select>
              <select
                value={filterPrivacy}
                onChange={(e) => setFilterPrivacy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="all">All Privacy</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Confidential">Confidential</option>
              </select>
              <Button variant="outline" size="sm" className="text-sm">
                <SafeIcon icon={FiFilter} className="mr-1" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Prayer Requests List */}
      <Card>
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Request</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Requester</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-start space-x-3">
                        <SafeIcon 
                          icon={getPrivacyIcon(request.privacy)} 
                          className={`mt-1 ${
                            request.privacy === 'Public' ? 'text-green-500' : 'text-orange-500'
                          }`} 
                        />
                        <div>
                          <p className="font-medium text-gray-900">{request.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{request.description}</p>
                          {request.updates.length > 0 && (
                            <p className="text-xs text-blue-600 mt-1">
                              {request.updates.length} update{request.updates.length > 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                        <div>
                          <p className="text-gray-900">{request.requester}</p>
                          <p className="text-sm text-gray-500">{request.assignedTo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        {request.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className="text-gray-900">{format(new Date(request.dateSubmitted), 'MMM d, yyyy')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleViewRequest(request)}
                          title="View Details"
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => handleEditRequest(request)}
                          title="Edit Request"
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Request"
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
            {filteredRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <SafeIcon 
                      icon={getPrivacyIcon(request.privacy)} 
                      className={`mt-1 ${
                        request.privacy === 'Public' ? 'text-green-500' : 'text-orange-500'
                      }`} 
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{request.title}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{request.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(request.status)} ml-2`}>
                    {request.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiUser} className="text-gray-400" />
                    <span className="text-gray-600">{request.requester}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    <span className="text-gray-600">{format(new Date(request.dateSubmitted), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {request.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(request.priority)}`}>
                      {request.priority}
                    </span>
                  </div>
                  {request.assignedTo && (
                    <p className="text-sm text-gray-500">Assigned: {request.assignedTo}</p>
                  )}
                  {request.updates.length > 0 && (
                    <p className="text-xs text-blue-600">
                      {request.updates.length} update{request.updates.length > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={() => handleViewRequest(request)}
                  >
                    <SafeIcon icon={FiEye} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => handleEditRequest(request)}
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
                Showing <span className="font-medium">{filteredRequests.length}</span> of <span className="font-medium">{prayerRequests.length}</span> requests
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Answered">Answered</option>
              <option value="Closed">Closed</option>
            </select>
            <select
              value={filterPrivacy}
              onChange={(e) => setFilterPrivacy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Privacy</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Confidential">Confidential</option>
            </select>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
          </div>
        </div>
      </Card>

      {/* Prayer Requests List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Request</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Requester</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-start space-x-3">
                      <SafeIcon 
                        icon={getPrivacyIcon(request.privacy)} 
                        className={`mt-1 ${
                          request.privacy === 'Public' ? 'text-green-500' : 'text-orange-500'
                        }`} 
                      />
                      <div>
                        <p className="font-medium text-gray-900">{request.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{request.description}</p>
                        {request.updates.length > 0 && (
                          <p className="text-xs text-blue-600 mt-1">
                            {request.updates.length} update{request.updates.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                      <div>
                        <p className="text-gray-900">{request.requester}</p>
                        <p className="text-sm text-gray-500">{request.assignedTo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {request.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      <span className="text-gray-900">{format(new Date(request.dateSubmitted), 'MMM d, yyyy')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleViewRequest(request)}
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditRequest(request)}
                        title="Edit Request"
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Request"
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
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredRequests.length}</span> of <span className="font-medium">{prayerRequests.length}</span> requests
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

      {/* Prayer Request Form Modal */}
      {showRequestForm && (
        <PrayerRequestForm 
          initialData={selectedRequest} 
          onClose={() => {
            setShowRequestForm(false);
            setSelectedRequest(null);
          }} 
          onSubmit={selectedRequest ? handleUpdateRequest : handleAddRequest} 
        />
      )}
    </div>
  );
};

export default PrayerRequests;