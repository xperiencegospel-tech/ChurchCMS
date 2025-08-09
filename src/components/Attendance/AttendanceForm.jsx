import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiSearch, FiCheck } = FiIcons;

const AttendanceForm = ({ onClose, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceDetails, setServiceDetails] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '',
    type: 'Sunday Morning Service',
    notes: ''
  });
  
  // Mock members data
  const members = [
    { id: 1, name: 'John Smith', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', status: 'Active' },
    { id: 3, name: 'Mike Wilson', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', status: 'Active' },
    { id: 5, name: 'Robert Brown', status: 'Inactive' }
  ];
  
  const [attendance, setAttendance] = useState(
    members.map(member => ({ memberId: member.id, present: false }))
  );

  const handleServiceChange = (e) => {
    const { name, value } = e.target;
    setServiceDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleAttendanceChange = (memberId) => {
    setAttendance(prev => 
      prev.map(record => 
        record.memberId === memberId 
          ? { ...record, present: !record.present } 
          : record
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      service: serviceDetails,
      attendance
    });
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Record Attendance</h2>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Service Details */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <input 
                    type="date" 
                    name="date"
                    value={serviceDetails.date}
                    onChange={handleServiceChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    name="time"
                    value={serviceDetails.time}
                    onChange={handleServiceChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type*</label>
                  <select 
                    name="type"
                    value={serviceDetails.type}
                    onChange={handleServiceChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="Sunday Morning Service">Sunday Morning Service</option>
                    <option value="Sunday Evening Service">Sunday Evening Service</option>
                    <option value="Midweek Service">Midweek Service</option>
                    <option value="Prayer Meeting">Prayer Meeting</option>
                    <option value="Bible Study">Bible Study</option>
                    <option value="Special Event">Special Event</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea 
                    name="notes"
                    value={serviceDetails.notes}
                    onChange={handleServiceChange}
                    rows={2}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Any notes about this service..."
                  />
                </div>
              </div>
            </Card>

            {/* Attendance */}
            <Card>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Mark Attendance</h3>
                <div className="relative w-64">
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
              
              <div className="overflow-y-auto max-h-64">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMembers.map(member => {
                      const attendanceRecord = attendance.find(record => record.memberId === member.id);
                      return (
                        <tr key={member.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              type="button"
                              onClick={() => handleAttendanceChange(member.id)}
                              className={`w-6 h-6 rounded-md flex items-center justify-center ${
                                attendanceRecord?.present
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-gray-200 text-gray-400'
                              }`}
                            >
                              <SafeIcon icon={FiCheck} className="text-sm" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {attendance.filter(record => record.present).length} of {members.length} members marked present
                </div>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    type="button"
                    onClick={() => setAttendance(prev => prev.map(record => ({ ...record, present: true })))}
                  >
                    Mark All Present
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    type="button"
                    onClick={() => setAttendance(prev => prev.map(record => ({ ...record, present: false })))}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Actions */}
          <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <Button 
              variant="secondary" 
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              icon={FiSave}
              type="submit"
            >
              Save Attendance
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;