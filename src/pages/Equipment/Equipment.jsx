import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import EquipmentForm from '../../components/Equipment/EquipmentForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiCalendar, 
  FiMapPin,
  FiTool,
  FiAlertTriangle,
  FiDownload,
  FiUser,
  FiTag
} = FiIcons;

const Equipment = () => {
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCondition, setFilterCondition] = useState('all');

  // Mock data for equipment
  const equipmentItems = [
    {
      id: 1,
      name: 'Wireless Microphone',
      category: 'Audio Equipment',
      serialNumber: 'WM-123456',
      purchaseDate: '2022-03-15',
      purchasePrice: 299.99,
      condition: 'Excellent',
      location: 'Sanctuary',
      assignedTo: 'Worship Team',
      maintenanceSchedule: 'Quarterly',
      lastMaintenanceDate: '2023-03-10',
      nextMaintenanceDate: '2023-06-10'
    },
    {
      id: 2,
      name: 'Projector',
      category: 'Video Equipment',
      serialNumber: 'PRJ-789012',
      purchaseDate: '2021-11-05',
      purchasePrice: 899.99,
      condition: 'Good',
      location: 'Sanctuary',
      assignedTo: 'Tech Team',
      maintenanceSchedule: 'Bi-annually',
      lastMaintenanceDate: '2023-01-15',
      nextMaintenanceDate: '2023-07-15'
    },
    {
      id: 3,
      name: 'Keyboard',
      category: 'Musical Instruments',
      serialNumber: 'KB-345678',
      purchaseDate: '2020-06-20',
      purchasePrice: 1299.99,
      condition: 'Fair',
      location: 'Sanctuary',
      assignedTo: 'Music Director',
      maintenanceSchedule: 'Annually',
      lastMaintenanceDate: '2022-06-25',
      nextMaintenanceDate: '2023-06-25'
    },
    {
      id: 4,
      name: 'Office Laptop',
      category: 'Computers & IT',
      serialNumber: 'LT-901234',
      purchaseDate: '2022-01-10',
      purchasePrice: 1099.99,
      condition: 'Excellent',
      location: 'Office',
      assignedTo: 'Church Administrator',
      maintenanceSchedule: 'As Needed',
      lastMaintenanceDate: '2022-12-01',
      nextMaintenanceDate: null
    },
    {
      id: 5,
      name: 'Folding Tables',
      category: 'Furniture',
      serialNumber: 'FT-567890',
      purchaseDate: '2021-04-30',
      purchasePrice: 499.99,
      condition: 'Good',
      location: 'Fellowship Hall',
      assignedTo: 'Hospitality Team',
      maintenanceSchedule: 'As Needed',
      lastMaintenanceDate: null,
      nextMaintenanceDate: null
    },
    {
      id: 6,
      name: 'Industrial Mixer',
      category: 'Kitchen Equipment',
      serialNumber: 'KM-234567',
      purchaseDate: '2022-08-15',
      purchasePrice: 799.99,
      condition: 'Needs Repair',
      location: 'Kitchen',
      assignedTo: 'Kitchen Staff',
      maintenanceSchedule: 'Quarterly',
      lastMaintenanceDate: '2022-11-10',
      nextMaintenanceDate: '2023-02-10'
    }
  ];

  const handleEditEquipment = (equipment) => {
    setSelectedEquipment(equipment);
    setShowEquipmentForm(true);
  };

  const handleAddEquipment = (formData) => {
    console.log('New equipment data:', formData);
    // Here you would add the equipment to your database
    setShowEquipmentForm(false);
  };

  const handleUpdateEquipment = (formData) => {
    console.log('Updated equipment data:', formData);
    // Here you would update the equipment in your database
    setShowEquipmentForm(false);
  };

  const getConditionClass = (condition) => {
    switch (condition) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      case 'Fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'Poor':
        return 'bg-orange-100 text-orange-800';
      case 'Needs Repair':
        return 'bg-red-100 text-red-800';
      case 'Out of Service':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEquipment = equipmentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesCondition = filterCondition === 'all' || item.condition === filterCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  // Calculate stats
  const totalEquipment = equipmentItems.length;
  const needsRepair = equipmentItems.filter(item => item.condition === 'Needs Repair').length;
  const upcomingMaintenance = equipmentItems.filter(item => {
    if (!item.nextMaintenanceDate) return false;
    const nextDate = new Date(item.nextMaintenanceDate);
    const today = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);
    return nextDate >= today && nextDate <= twoWeeksFromNow;
  }).length;
  
  // Get unique categories for filter dropdown
  const categories = [...new Set(equipmentItems.map(item => item.category))];
  const conditions = [...new Set(equipmentItems.map(item => item.condition))];

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Equipment</h1>
          <p className="text-gray-600 mt-1">Manage church equipment and assets</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedEquipment(null);
            setShowEquipmentForm(true);
          }}
        >
          Add Equipment
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Equipment</p>
              <p className="text-3xl font-bold text-gray-900">{totalEquipment}</p>
              <p className="text-sm text-gray-500 mt-2">All assets</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiTag} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Needs Repair</p>
              <p className="text-3xl font-bold text-gray-900">{needsRepair}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiAlertTriangle} className="text-red-500 mr-1" />
                <span className="text-sm text-red-600 font-medium">Requires attention</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiTool} className="text-red-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Upcoming Maintenance</p>
              <p className="text-3xl font-bold text-gray-900">{upcomingMaintenance}</p>
              <p className="text-sm text-gray-500 mt-2">Next 2 weeks</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiCalendar} className="text-blue-500 text-xl" />
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
                placeholder="Search equipment..."
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
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={filterCondition}
                onChange={(e) => setFilterCondition(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="all">All Conditions</option>
                {conditions.map((condition, index) => (
                  <option key={index} value={condition}>{condition}</option>
                ))}
              </select>
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

      {/* Equipment List */}
      <Card>
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Equipment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Assigned To</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Condition</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Next Maintenance</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">SN: {item.serialNumber}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiMapPin} className="text-gray-400" />
                        <span className="text-gray-700">{item.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                        <span className="text-gray-700">{item.assignedTo || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionClass(item.condition)}`}>
                        {item.condition}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {item.nextMaintenanceDate ? (
                        <div className="flex items-center space-x-2">
                          <SafeIcon icon={FiCalendar} className="text-gray-400" />
                          <span className="text-gray-700">{format(new Date(item.nextMaintenanceDate), 'MMM d, yyyy')}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleEditEquipment(item)}
                        >
                          <SafeIcon icon={FiEdit} />
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
            {filteredEquipment.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">SN: {item.serialNumber}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionClass(item.condition)}`}>
                    {item.condition}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiMapPin} className="text-gray-400" />
                    <span className="text-gray-600">{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiUser} className="text-gray-400" />
                    <span className="text-gray-600">{item.assignedTo || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.nextMaintenanceDate ? `Next: ${format(new Date(item.nextMaintenanceDate), 'MMM d, yyyy')}` : 'No maintenance scheduled'}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={() => handleEditEquipment(item)}
                  >
                    <SafeIcon icon={FiEdit} />
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
                Showing <span className="font-medium">{filteredEquipment.length}</span> of <span className="font-medium">{equipmentItems.length}</span> items
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Conditions</option>
              {conditions.map((condition, index) => (
                <option key={index} value={condition}>{condition}</option>
              ))}
            </select>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
          </div>
        </div>
      </Card>

      {/* Equipment List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Equipment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Assigned To</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Condition</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Next Maintenance</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">SN: {item.serialNumber}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiMapPin} className="text-gray-400" />
                      <span className="text-gray-700">{item.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                      <span className="text-gray-700">{item.assignedTo || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConditionClass(item.condition)}`}>
                      {item.condition}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {item.nextMaintenanceDate ? (
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className="text-gray-700">{format(new Date(item.nextMaintenanceDate), 'MMM d, yyyy')}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleEditEquipment(item)}
                      >
                        <SafeIcon icon={FiEdit} />
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
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredEquipment.length}</span> of <span className="font-medium">{equipmentItems.length}</span> items
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

      {/* Add/Edit Equipment Modal */}
      {showEquipmentForm && (
        <EquipmentForm 
          initialData={selectedEquipment} 
          onClose={() => setShowEquipmentForm(false)} 
          onSubmit={selectedEquipment ? handleUpdateEquipment : handleAddEquipment} 
        />
      )}
    </div>
  );
};

export default Equipment;