import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import MemberProfile from '../../components/Members/MemberProfile';
import MemberForm from '../../components/Members/MemberForm';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiMail, FiPhone, FiDownload, FiUpload, FiEye } = FiIcons;

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      joinDate: '2023-01-15',
      ministry: 'Worship Team',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      status: 'Active',
      joinDate: '2023-03-22',
      ministry: 'Youth Ministry',
      avatar: null
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+1 (555) 456-7890',
      status: 'Inactive',
      joinDate: '2022-11-08',
      ministry: 'Children\'s Ministry',
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '+1 (555) 234-5678',
      status: 'Active',
      joinDate: '2023-02-10',
      ministry: 'Hospitality',
      avatar: null
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert.b@email.com',
      phone: '+1 (555) 876-5432',
      status: 'Inactive',
      joinDate: '2022-09-05',
      ministry: 'Administration',
      avatar: null
    }
  ]);


  const handleViewMember = (member) => {
    setSelectedMember(member);
    setShowProfile(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowAddMember(true);
  };

  const handleAddMember = (formData) => {
    console.log('New member data:', formData);
    
    // Create a new member object with a unique ID
    const newMember = {
      id: Math.max(...members.map(m => m.id)) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: formData.status || 'Active',
      joinDate: formData.joinDate,
      ministry: formData.ministry || 'Not Assigned',
      avatar: formData.avatar || null
    };
    
    // Add the new member to the members state
    setMembers(prev => [...prev, newMember]);
    
    // Show success message
    alert(`Member "${formData.name}" has been added successfully!`);
    
    setShowAddMember(false);
    setSelectedMember(null);
  };

  const handleUpdateMember = (formData) => {
    console.log('Updated member data:', formData);
    
    // Update the member in the members state
    setMembers(prev => prev.map(member => 
      member.id === selectedMember.id 
        ? { ...member, ...formData, avatar: formData.avatar || member.avatar }
        : member
    ));
    
    alert(`Member "${formData.name}" has been updated successfully!`);
    
    setShowAddMember(false);
    setSelectedMember(null);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-1">Manage your church members and their information</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedMember(null);
            setShowAddMember(true);
          }}
        >
          Add New Member
        </Button>
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
                placeholder="Search members..."
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline" size="sm" className="text-sm">
                <SafeIcon icon={FiFilter} className="mr-1" />
                More Filters
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-sm">
                <SafeIcon icon={FiUpload} className="mr-1" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="text-sm">
                <SafeIcon icon={FiDownload} className="mr-1" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Members List */}
      <Card>
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Ministry</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Join Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-semibold overflow-hidden">
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            member.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">ID: {member.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <SafeIcon icon={FiMail} className="text-gray-400" />
                          <span className="text-gray-600">{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <SafeIcon icon={FiPhone} className="text-gray-400" />
                          <span className="text-gray-600">{member.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        {member.ministry}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleViewMember(member)}
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleEditMember(member)}
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
            {filteredMembers.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden">
                      {member.avatar ? (
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        member.name.split(' ').map(n => n[0]).join('')
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">ID: {member.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    member.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiMail} className="text-gray-400" />
                    <span className="text-gray-600">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiPhone} className="text-gray-400" />
                    <span className="text-gray-600">{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {member.ministry}
                    </span>
                    <span className="text-sm text-gray-500">
                      Joined: {new Date(member.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={() => handleViewMember(member)}
                  >
                    <SafeIcon icon={FiEye} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={() => handleEditMember(member)}
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
                Showing <span className="font-medium">{filteredMembers.length}</span> of <span className="font-medium">{members.length}</span> members
              </p>
              <div className="flex items-center justify-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Member Profile Modal */}
      {showProfile && selectedMember && (
        <MemberProfile 
          member={selectedMember} 
          onClose={() => setShowProfile(false)} 
        />
      )}

      {/* Add/Edit Member Modal */}
      {showAddMember && (
        <MemberForm 
          initialData={selectedMember} 
          onClose={() => {
            setShowAddMember(false);
            setSelectedMember(null);
          }} 
          onSubmit={selectedMember ? handleUpdateMember : handleAddMember} 
        />
      )}
    </div>
  );
};

export default Members;