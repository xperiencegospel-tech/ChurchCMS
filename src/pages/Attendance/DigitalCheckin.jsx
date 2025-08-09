import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiQrCode, 
  FiSmartphone, 
  FiUsers, 
  FiCalendar, 
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiDownload,
  FiSettings,
  FiWifi,
  FiMonitor
} = FiIcons;

const DigitalCheckin = () => {
  const [activeService, setActiveService] = useState('sunday-morning');
  const [qrCodeActive, setQrCodeActive] = useState(true);
  const [checkinStats, setCheckinStats] = useState({
    totalCheckins: 145,
    mobileCheckins: 89,
    qrCheckins: 56,
    averageTime: '2.3 min'
  });

  // Mock data for services
  const services = [
    { id: 'sunday-morning', name: 'Sunday Morning Service', time: '10:00 AM', active: true },
    { id: 'sunday-evening', name: 'Sunday Evening Service', time: '6:00 PM', active: false },
    { id: 'midweek', name: 'Midweek Service', time: '7:00 PM', active: false },
    { id: 'youth', name: 'Youth Service', time: '5:00 PM', active: false }
  ];

  // Mock data for recent check-ins
  const recentCheckins = [
    { id: 1, name: 'John Smith', time: '09:45 AM', method: 'QR Code', status: 'success' },
    { id: 2, name: 'Sarah Johnson', time: '09:47 AM', method: 'Mobile App', status: 'success' },
    { id: 3, name: 'Mike Wilson', time: '09:50 AM', method: 'QR Code', status: 'success' },
    { id: 4, name: 'Emily Davis', time: '09:52 AM', method: 'Mobile App', status: 'success' },
    { id: 5, name: 'Robert Brown', time: '09:55 AM', method: 'QR Code', status: 'failed' }
  ];

  const generateQRCode = () => {
    console.log('Generating new QR code for service:', activeService);
    // In a real app, this would generate a new QR code
  };

  const toggleQRCode = () => {
    setQrCodeActive(!qrCodeActive);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Digital Check-in</h1>
          <p className="text-gray-600 mt-1">QR code and mobile-based attendance tracking</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={FiSettings}>
            Check-in Settings
          </Button>
          <Button icon={FiRefreshCw} onClick={generateQRCode}>
            Generate New QR
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.totalCheckins}</p>
              <p className="text-sm text-gray-500 mt-2">Today</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiUsers} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Mobile Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.mobileCheckins}</p>
              <p className="text-sm text-gray-500 mt-2">{Math.round((checkinStats.mobileCheckins / checkinStats.totalCheckins) * 100)}% of total</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiSmartphone} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">QR Check-ins</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.qrCheckins}</p>
              <p className="text-sm text-gray-500 mt-2">{Math.round((checkinStats.qrCheckins / checkinStats.totalCheckins) * 100)}% of total</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiQrCode} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg Check-in Time</p>
              <p className="text-3xl font-bold text-gray-900">{checkinStats.averageTime}</p>
              <p className="text-sm text-gray-500 mt-2">Per person</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiClock} className="text-orange-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Display */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">QR Code Check-in</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                qrCodeActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {qrCodeActive ? 'Active' : 'Inactive'}
              </span>
              <button
                onClick={toggleQRCode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  qrCodeActive ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    qrCodeActive ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
          
          <div className="text-center">
            {/* Service Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Active Service</label>
              <select
                value={activeService}
                onChange={(e) => setActiveService(e.target.value)}
                className="mx-auto block border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.time}
                  </option>
                ))}
              </select>
            </div>

            {/* QR Code */}
            <div className="bg-white border-4 border-emerald-600 rounded-xl p-8 mb-6 inline-block">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                {qrCodeActive ? (
                  <div className="text-center">
                    <SafeIcon icon={FiQrCode} className="text-6xl text-emerald-600 mb-4" />
                    <p className="text-sm text-gray-600">QR Code for</p>
                    <p className="font-semibold text-emerald-700">
                      {services.find(s => s.id === activeService)?.name}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <SafeIcon icon={FiQrCode} className="text-6xl mb-4" />
                    <p className="text-sm">QR Code Disabled</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Members can scan this QR code to check in to the service
              </p>
              <div className="flex justify-center space-x-3">
                <Button variant="outline" size="sm" icon={FiDownload}>
                  Download QR
                </Button>
                <Button variant="outline" size="sm" icon={FiMonitor}>
                  Display Mode
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Check-ins */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Live Check-ins</h3>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiWifi} className="text-green-500" />
              <span className="text-sm text-green-600 font-medium">Live</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentCheckins.map(checkin => (
              <div key={checkin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                    {checkin.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{checkin.name}</p>
                    <p className="text-sm text-gray-500">{checkin.method}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{checkin.time}</span>
                  <SafeIcon 
                    icon={checkin.status === 'success' ? FiCheckCircle : FiXCircle} 
                    className={checkin.status === 'success' ? 'text-green-500' : 'text-red-500'} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Mobile Check-in Options */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Mobile Check-in Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiQrCode} className="text-4xl text-emerald-600 mb-4 mx-auto" />
            <h4 className="font-semibold text-gray-900 mb-2">QR Code Scanning</h4>
            <p className="text-sm text-gray-600 mb-4">Members scan QR codes displayed at entrances</p>
            <Button variant="outline" size="sm">Configure QR</Button>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiSmartphone} className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h4 className="font-semibold text-gray-900 mb-2">Mobile App Check-in</h4>
            <p className="text-sm text-gray-600 mb-4">Direct check-in through church mobile app</p>
            <Button variant="outline" size="sm">App Settings</Button>
          </div>
          
          <div className="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <SafeIcon icon={FiWifi} className="text-4xl text-purple-600 mb-4 mx-auto" />
            <h4 className="font-semibold text-gray-900 mb-2">WiFi-based Check-in</h4>
            <p className="text-sm text-gray-600 mb-4">Automatic check-in when connected to church WiFi</p>
            <Button variant="outline" size="sm">WiFi Setup</Button>
          </div>
        </div>
      </Card>

      {/* Service Management */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Service Management</h3>
          <Button icon={FiCalendar} size="sm">Add Service</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-ins</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <SafeIcon icon={FiCalendar} className="text-emerald-500" />
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="text-gray-400" />
                      <span className="text-gray-900">{service.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900">
                      {service.active ? checkinStats.totalCheckins : '0'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      service.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        {service.active ? 'Stop' : 'Start'}
                      </Button>
                      <Button variant="outline" size="sm" icon={FiDownload}>
                        Export
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Attendance History */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Check-ins</h3>
          <Button variant="outline" icon={FiDownload} size="sm">Export History</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Member</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Check-in Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentCheckins.map(checkin => (
                <tr key={checkin.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {checkin.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{checkin.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiClock} className="text-gray-400" />
                      <span className="text-gray-900">{checkin.time}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      checkin.method === 'QR Code' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {checkin.method}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <SafeIcon 
                      icon={checkin.status === 'success' ? FiCheckCircle : FiXCircle} 
                      className={checkin.status === 'success' ? 'text-green-500' : 'text-red-500'} 
                    />
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

export default DigitalCheckin;