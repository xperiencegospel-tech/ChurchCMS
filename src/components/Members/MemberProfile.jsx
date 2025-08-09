import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiEdit3, 
  FiSave, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiClipboard,
  FiFile,
  FiX,
  FiPlus
} = FiIcons;

const MemberProfile = ({ member, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'family', label: 'Family' },
    { id: 'ministry', label: 'Ministry' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'contributions', label: 'Contributions' },
    { id: 'documents', label: 'Documents' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-xl font-semibold">
              {member?.name?.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{member?.name}</h2>
              <p className="text-sm text-gray-500">Member ID: {member?.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant={isEditing ? "secondary" : "outline"}
              icon={isEditing ? FiX : FiEdit3}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            {isEditing && <Button icon={FiSave}>Save Changes</Button>}
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`py-4 px-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiUser} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        {isEditing ? (
                          <input 
                            type="text" 
                            defaultValue={member?.name}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-900">{member?.name}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiMail} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email Address</p>
                        {isEditing ? (
                          <input 
                            type="email" 
                            defaultValue={member?.email}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-900">{member?.email}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiPhone} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone Number</p>
                        {isEditing ? (
                          <input 
                            type="tel" 
                            defaultValue={member?.phone}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-900">{member?.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiMapPin} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Address</p>
                        {isEditing ? (
                          <textarea 
                            defaultValue="123 Church Street, Holy City, HC 12345"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                            rows={3}
                          />
                        ) : (
                          <p className="text-gray-900">123 Church Street, Holy City, HC 12345</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Church Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiCalendar} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Membership Date</p>
                        {isEditing ? (
                          <input 
                            type="date" 
                            defaultValue={member?.joinDate}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-900">{new Date(member?.joinDate).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiClipboard} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Membership Status</p>
                        {isEditing ? (
                          <select 
                            defaultValue={member?.status}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Transferred">Transferred</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            member?.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {member?.status}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiClipboard} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Ministry</p>
                        {isEditing ? (
                          <select 
                            defaultValue={member?.ministry}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                          >
                            <option value="Worship Team">Worship Team</option>
                            <option value="Youth Ministry">Youth Ministry</option>
                            <option value="Children's Ministry">Children's Ministry</option>
                            <option value="Hospitality">Hospitality</option>
                            <option value="Administration">Administration</option>
                          </select>
                        ) : (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                            {member?.ministry}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <SafeIcon icon={FiClipboard} className="text-emerald-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Baptism Date</p>
                        {isEditing ? (
                          <input 
                            type="date"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        ) : (
                          <p className="text-gray-900">Not recorded</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                <div className="space-y-4">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input 
                          type="text" 
                          defaultValue="Jane Smith"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Relationship</label>
                        <input 
                          type="text" 
                          defaultValue="Spouse"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input 
                          type="tel" 
                          defaultValue="+1 (555) 987-6543"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                          type="email" 
                          defaultValue="jane.smith@email.com"
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="text-gray-900">Jane Smith</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Relationship</p>
                        <p className="text-gray-900">Spouse</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Phone</p>
                        <p className="text-gray-900">+1 (555) 987-6543</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-900">jane.smith@email.com</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-4">
                  {isEditing ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        rows={3}
                        placeholder="Add any additional notes about this member..."
                      />
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No additional notes available.</p>
                  )}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
                  {isEditing && (
                    <Button icon={FiPlus} size="sm">Add Document</Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'Baptism Certificate', type: 'PDF', date: '2023-05-12', size: '1.2 MB' },
                    { name: 'Membership Form', type: 'PDF', date: '2023-01-15', size: '0.8 MB' }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-md">
                          <SafeIcon icon={FiFile} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {doc.size} • Uploaded on {new Date(doc.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-emerald-600">
                          <SafeIcon icon={FiEdit3} className="text-sm" />
                        </button>
                        {isEditing && (
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <SafeIcon icon={FiX} className="text-sm" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Attendance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { date: '2023-06-04', service: 'Sunday Morning Service', status: 'Present' },
                        { date: '2023-05-28', service: 'Sunday Morning Service', status: 'Absent' },
                        { date: '2023-05-21', service: 'Sunday Morning Service', status: 'Present' },
                        { date: '2023-05-14', service: 'Sunday Morning Service', status: 'Present' },
                        { date: '2023-05-07', service: 'Sunday Morning Service', status: 'Present' }
                      ].map((record, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(record.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.service}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {record.status}
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
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;