import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import CertificateForm from '../../components/Certificates/CertificateForm';
import CertificatePreview from '../../components/Certificates/CertificatePreview';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiPrinter,
  FiDownload,
  FiAward,
  FiCalendar,
  FiUser,
  FiBook
} = FiIcons;

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Mock data for certificates
  const certificates = [
    {
      id: 1,
      recipientName: 'John Smith',
      certificateType: 'Bible School Completion',
      courseName: 'Foundations of Faith',
      dateIssued: '2023-06-15',
      dateCompleted: '2023-06-10',
      instructor: 'Pastor John',
      grade: 'A',
      status: 'Issued'
    },
    {
      id: 2,
      recipientName: 'Sarah Johnson',
      certificateType: 'Baptism',
      courseName: null,
      dateIssued: '2023-05-20',
      dateCompleted: '2023-05-20',
      instructor: 'Pastor John',
      grade: null,
      status: 'Issued'
    },
    {
      id: 3,
      recipientName: 'Mike Wilson',
      certificateType: 'Ministry Training',
      courseName: 'Leadership Development',
      dateIssued: '2023-04-30',
      dateCompleted: '2023-04-25',
      instructor: 'Elder Sarah',
      grade: 'B+',
      status: 'Issued'
    },
    {
      id: 4,
      recipientName: 'Emily Davis',
      certificateType: 'Bible School Completion',
      courseName: 'New Testament Studies',
      dateIssued: null,
      dateCompleted: '2023-06-01',
      instructor: 'Pastor John',
      grade: 'A-',
      status: 'Pending'
    },
    {
      id: 5,
      recipientName: 'Robert Brown',
      certificateType: 'Volunteer Recognition',
      courseName: null,
      dateIssued: '2023-03-15',
      dateCompleted: '2023-03-15',
      instructor: 'Church Administrator',
      grade: null,
      status: 'Issued'
    }
  ];

  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowPreview(true);
  };

  const handleEditCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateForm(true);
  };

  const handleAddCertificate = (formData) => {
    console.log('New certificate data:', formData);
    setShowCertificateForm(false);
    setSelectedCertificate(null);
  };

  const handleUpdateCertificate = (formData) => {
    console.log('Updated certificate data:', formData);
    setShowCertificateForm(false);
    setSelectedCertificate(null);
  };

  const handlePrintCertificate = (certificate) => {
    console.log('Printing certificate:', certificate.id);
    // Implement print functionality
  };

  const handleExportCertificate = (certificate) => {
    console.log('Exporting certificate:', certificate.id);
    // Implement export functionality
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Issued':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.certificateType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (cert.courseName && cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || cert.certificateType === filterType;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalCertificates = certificates.length;
  const issuedCertificates = certificates.filter(c => c.status === 'Issued').length;
  const pendingCertificates = certificates.filter(c => c.status === 'Pending').length;
  const bibleSchoolCertificates = certificates.filter(c => c.certificateType === 'Bible School Completion').length;

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600 mt-1">Manage and issue certificates for various church programs</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedCertificate(null);
            setShowCertificateForm(true);
          }}
        >
          Create Certificate
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Certificates</p>
              <p className="text-3xl font-bold text-gray-900">{totalCertificates}</p>
              <p className="text-sm text-gray-500 mt-2">All time</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiAward} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Issued</p>
              <p className="text-3xl font-bold text-gray-900">{issuedCertificates}</p>
              <p className="text-sm text-gray-500 mt-2">Ready for distribution</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiAward} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-gray-900">{pendingCertificates}</p>
              <p className="text-sm text-gray-500 mt-2">Awaiting approval</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiCalendar} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Bible School</p>
              <p className="text-3xl font-bold text-gray-900">{bibleSchoolCertificates}</p>
              <p className="text-sm text-gray-500 mt-2">Course completions</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiBook} className="text-blue-500 text-xl" />
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
                placeholder="Search certificates..."
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
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="all">All Types</option>
                <option value="Bible School Completion">Bible School</option>
                <option value="Baptism">Baptism</option>
                <option value="Ministry Training">Ministry Training</option>
                <option value="Volunteer Recognition">Volunteer Recognition</option>
              </select>
              <Button variant="outline" size="sm" className="text-sm">
                <SafeIcon icon={FiFilter} className="mr-1" />
                More Filters
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-sm">
                <SafeIcon icon={FiDownload} className="mr-1" />
                Export All
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Certificates List */}
      <Card>
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Recipient</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Course/Program</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Instructor</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date Issued</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((certificate) => (
                  <tr key={certificate.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {certificate.recipientName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{certificate.recipientName}</p>
                          {certificate.grade && (
                            <p className="text-sm text-gray-500">Grade: {certificate.grade}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        {certificate.certificateType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {certificate.courseName ? (
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiBook} className="text-gray-400" />
                          <span className="text-gray-900">{certificate.courseName}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                        <span className="text-gray-900">{certificate.instructor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {certificate.dateIssued ? (
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiCalendar} className="text-gray-400" />
                          <span className="text-gray-900">{format(new Date(certificate.dateIssued), 'MMM d, yyyy')}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Not issued</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(certificate.status)}`}>
                        {certificate.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleViewCertificate(certificate)}
                          title="View Certificate"
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => handleEditCertificate(certificate)}
                          title="Edit Certificate"
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          onClick={() => handlePrintCertificate(certificate)}
                          title="Print Certificate"
                        >
                          <SafeIcon icon={FiPrinter} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => handleExportCertificate(certificate)}
                          title="Export Certificate"
                        >
                          <SafeIcon icon={FiDownload} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Certificate"
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
            {filteredCertificates.map((certificate) => (
              <div key={certificate.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                      {certificate.recipientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{certificate.recipientName}</p>
                      {certificate.grade && (
                        <p className="text-sm text-gray-500">Grade: {certificate.grade}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(certificate.status)}`}>
                    {certificate.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiUser} className="text-gray-400" />
                    <span className="text-gray-600">{certificate.instructor}</span>
                  </div>
                  {certificate.dateIssued && (
                    <div className="flex items-center space-x-2 text-sm">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      <span className="text-gray-600">{format(new Date(certificate.dateIssued), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {certificate.certificateType}
                    </span>
                    {certificate.courseName && (
                      <span className="text-sm text-gray-500">{certificate.courseName}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={() => handleViewCertificate(certificate)}
                  >
                    <SafeIcon icon={FiEye} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => handleEditCertificate(certificate)}
                  >
                    <SafeIcon icon={FiEdit} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => handlePrintCertificate(certificate)}
                  >
                    <SafeIcon icon={FiPrinter} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    onClick={() => handleExportCertificate(certificate)}
                  >
                    <SafeIcon icon={FiDownload} />
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
                Showing <span className="font-medium">{filteredCertificates.length}</span> of <span className="font-medium">{certificates.length}</span> certificates
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Bible School Completion">Bible School</option>
              <option value="Baptism">Baptism</option>
              <option value="Ministry Training">Ministry Training</option>
              <option value="Volunteer Recognition">Volunteer Recognition</option>
            </select>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
            <Button variant="outline" icon={FiDownload} size="sm">Export All</Button>
          </div>
        </div>
      </Card>

      {/* Certificates List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Recipient</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Course/Program</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Instructor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date Issued</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCertificates.map((certificate) => (
                <tr key={certificate.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                        {certificate.recipientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{certificate.recipientName}</p>
                        {certificate.grade && (
                          <p className="text-sm text-gray-500">Grade: {certificate.grade}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {certificate.certificateType}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {certificate.courseName ? (
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiBook} className="text-gray-400" />
                        <span className="text-gray-900">{certificate.courseName}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                      <span className="text-gray-900">{certificate.instructor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {certificate.dateIssued ? (
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className="text-gray-900">{format(new Date(certificate.dateIssued), 'MMM d, yyyy')}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Not issued</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(certificate.status)}`}>
                      {certificate.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleViewCertificate(certificate)}
                        title="View Certificate"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditCertificate(certificate)}
                        title="Edit Certificate"
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        onClick={() => handlePrintCertificate(certificate)}
                        title="Print Certificate"
                      >
                        <SafeIcon icon={FiPrinter} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={() => handleExportCertificate(certificate)}
                        title="Export Certificate"
                      >
                        <SafeIcon icon={FiDownload} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Certificate"
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
            Showing <span className="font-medium">{filteredCertificates.length}</span> of <span className="font-medium">{certificates.length}</span> certificates
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

      {/* Certificate Form Modal */}
      {showCertificateForm && (
        <CertificateForm 
          initialData={selectedCertificate} 
          onClose={() => {
            setShowCertificateForm(false);
            setSelectedCertificate(null);
          }} 
          onSubmit={selectedCertificate ? handleUpdateCertificate : handleAddCertificate} 
        />
      )}

      {/* Certificate Preview Modal */}
      {showPreview && selectedCertificate && (
        <CertificatePreview 
          certificate={selectedCertificate} 
          onClose={() => {
            setShowPreview(false);
            setSelectedCertificate(null);
          }} 
        />
      )}
    </div>
  );
};

export default Certificates;