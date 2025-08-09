import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import SermonForm from '../../components/Sermons/SermonForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiPlay,
  FiDownload,
  FiCalendar,
  FiUser,
  FiBook,
  FiClock,
  FiLink,
  FiVideo,
  FiHeadphones
} = FiIcons;

const Sermons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeries, setFilterSeries] = useState('all');
  const [showSermonForm, setShowSermonForm] = useState(false);
  const [selectedSermon, setSelectedSermon] = useState(null);

  // Mock data for sermons
  const sermons = [
    {
      id: 1,
      title: 'Walking in Faith',
      speaker: 'Pastor John',
      date: '2023-06-04',
      series: 'Faith Journey',
      scripture: 'Hebrews 11:1-6',
      duration: '35:42',
      videoUrl: 'https://youtube.com/watch?v=example1',
      audioUrl: 'https://example.com/audio/sermon1.mp3',
      notes: 'A powerful message about trusting God in uncertain times.',
      tags: ['faith', 'trust', 'uncertainty'],
      status: 'Published'
    },
    {
      id: 2,
      title: 'The Power of Prayer',
      speaker: 'Elder Sarah',
      date: '2023-05-28',
      series: 'Spiritual Disciplines',
      scripture: 'Matthew 6:5-15',
      duration: '42:18',
      videoUrl: 'https://youtube.com/watch?v=example2',
      audioUrl: 'https://example.com/audio/sermon2.mp3',
      notes: 'Understanding the importance and impact of prayer in our daily lives.',
      tags: ['prayer', 'spiritual discipline', 'communication'],
      status: 'Published'
    },
    {
      id: 3,
      title: 'Love Your Neighbor',
      speaker: 'Pastor John',
      date: '2023-05-21',
      series: 'Greatest Commandments',
      scripture: 'Mark 12:28-34',
      duration: '38:15',
      videoUrl: 'https://youtube.com/watch?v=example3',
      audioUrl: null,
      notes: 'Exploring what it means to love our neighbors as ourselves.',
      tags: ['love', 'community', 'service'],
      status: 'Published'
    },
    {
      id: 4,
      title: 'Hope in Difficult Times',
      speaker: 'Guest Speaker Mike',
      date: '2023-05-14',
      series: 'Hope Series',
      scripture: 'Romans 8:18-28',
      duration: '44:32',
      videoUrl: null,
      audioUrl: 'https://example.com/audio/sermon4.mp3',
      notes: 'Finding hope and strength when facing life\'s challenges.',
      tags: ['hope', 'perseverance', 'trials'],
      status: 'Published'
    },
    {
      id: 5,
      title: 'The Good Shepherd',
      speaker: 'Pastor John',
      date: '2023-06-11',
      series: 'Parables of Jesus',
      scripture: 'John 10:1-18',
      duration: null,
      videoUrl: 'https://youtube.com/watch?v=example5',
      audioUrl: null,
      notes: 'Understanding Jesus as our Good Shepherd who cares for His flock.',
      tags: ['shepherd', 'care', 'guidance'],
      status: 'Draft'
    }
  ];

  const handleViewSermon = (sermon) => {
    setSelectedSermon(sermon);
    // Open sermon details or player
  };

  const handleEditSermon = (sermon) => {
    setSelectedSermon(sermon);
    setShowSermonForm(true);
  };

  const handleAddSermon = (formData) => {
    console.log('New sermon data:', formData);
    setShowSermonForm(false);
    setSelectedSermon(null);
  };

  const handleUpdateSermon = (formData) => {
    console.log('Updated sermon data:', formData);
    setShowSermonForm(false);
    setSelectedSermon(null);
  };

  const handlePlaySermon = (sermon) => {
    if (sermon.videoUrl) {
      window.open(sermon.videoUrl, '_blank');
    } else if (sermon.audioUrl) {
      // Open audio player
      console.log('Playing audio:', sermon.audioUrl);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sermon.scripture.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSeries === 'all' || sermon.series === filterSeries;
    return matchesSearch && matchesFilter;
  });

  // Get unique series for filter
  const seriesList = [...new Set(sermons.map(sermon => sermon.series))];

  // Calculate stats
  const totalSermons = sermons.length;
  const publishedSermons = sermons.filter(s => s.status === 'Published').length;
  const draftSermons = sermons.filter(s => s.status === 'Draft').length;
  const withVideo = sermons.filter(s => s.videoUrl).length;

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sermons</h1>
          <p className="text-gray-600 mt-1">Manage sermon recordings, notes, and media</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedSermon(null);
            setShowSermonForm(true);
          }}
        >
          Add New Sermon
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Sermons</p>
              <p className="text-3xl font-bold text-gray-900">{totalSermons}</p>
              <p className="text-sm text-gray-500 mt-2">All time</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiBook} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Published</p>
              <p className="text-3xl font-bold text-gray-900">{publishedSermons}</p>
              <p className="text-sm text-gray-500 mt-2">Available online</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiPlay} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">With Video</p>
              <p className="text-3xl font-bold text-gray-900">{withVideo}</p>
              <p className="text-sm text-gray-500 mt-2">Video recordings</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiVideo} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Drafts</p>
              <p className="text-3xl font-bold text-gray-900">{draftSermons}</p>
              <p className="text-sm text-gray-500 mt-2">Pending publication</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiEdit} className="text-orange-500 text-xl" />
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
                placeholder="Search sermons..."
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
                value={filterSeries}
                onChange={(e) => setFilterSeries(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
              >
                <option value="all">All Series</option>
                {seriesList.map((series, index) => (
                  <option key={index} value={series}>{series}</option>
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

      {/* Sermons List */}
      <Card>
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Sermon</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Speaker</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Series</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Media</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSermons.map((sermon) => (
                  <tr key={sermon.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{sermon.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <SafeIcon icon={FiBook} className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-500">{sermon.scripture}</span>
                        </div>
                        {sermon.duration && (
                          <div className="flex items-center space-x-2 mt-1">
                            <SafeIcon icon={FiClock} className="text-gray-400 text-sm" />
                            <span className="text-sm text-gray-500">{sermon.duration}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                        <span className="text-gray-900">{sermon.speaker}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className="text-gray-900">{format(new Date(sermon.date), 'MMM d, yyyy')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                        {sermon.series}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {sermon.videoUrl && (
                          <div className="flex items-center space-x-1 text-blue-600">
                            <SafeIcon icon={FiVideo} className="text-sm" />
                            <span className="text-xs">Video</span>
                          </div>
                        )}
                        {sermon.audioUrl && (
                          <div className="flex items-center space-x-1 text-purple-600">
                            <SafeIcon icon={FiHeadphones} className="text-sm" />
                            <span className="text-xs">Audio</span>
                          </div>
                        )}
                        {!sermon.videoUrl && !sermon.audioUrl && (
                          <span className="text-gray-400 text-xs">No media</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(sermon.status)}`}>
                        {sermon.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        {(sermon.videoUrl || sermon.audioUrl) && (
                          <button 
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            onClick={() => handlePlaySermon(sermon)}
                            title="Play Sermon"
                          >
                            <SafeIcon icon={FiPlay} />
                          </button>
                        )}
                        <button 
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleViewSermon(sermon)}
                          title="View Details"
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => handleEditSermon(sermon)}
                          title="Edit Sermon"
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <SafeIcon icon={FiDownload} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Sermon"
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
            {filteredSermons.map((sermon) => (
              <div key={sermon.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{sermon.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <SafeIcon icon={FiBook} className="text-gray-400" />
                      <span>{sermon.scripture}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(sermon.status)} ml-2`}>
                    {sermon.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiUser} className="text-gray-400" />
                    <span className="text-gray-600">{sermon.speaker}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    <span className="text-gray-600">{format(new Date(sermon.date), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {sermon.series}
                    </span>
                    <div className="flex items-center space-x-2">
                      {sermon.videoUrl && (
                        <div className="flex items-center space-x-1 text-blue-600">
                          <SafeIcon icon={FiVideo} className="text-sm" />
                          <span className="text-xs">Video</span>
                        </div>
                      )}
                      {sermon.audioUrl && (
                        <div className="flex items-center space-x-1 text-purple-600">
                          <SafeIcon icon={FiHeadphones} className="text-sm" />
                          <span className="text-xs">Audio</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {sermon.duration && (
                    <div className="flex items-center space-x-2 text-sm">
                      <SafeIcon icon={FiClock} className="text-gray-400" />
                      <span className="text-gray-500">{sermon.duration}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  {(sermon.videoUrl || sermon.audioUrl) && (
                    <button 
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      onClick={() => handlePlaySermon(sermon)}
                    >
                      <SafeIcon icon={FiPlay} />
                    </button>
                  )}
                  <button 
                    className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={() => handleViewSermon(sermon)}
                  >
                    <SafeIcon icon={FiEye} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => handleEditSermon(sermon)}
                  >
                    <SafeIcon icon={FiEdit} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
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
                Showing <span className="font-medium">{filteredSermons.length}</span> of <span className="font-medium">{sermons.length}</span> sermons
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
              value={filterSeries}
              onChange={(e) => setFilterSeries(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Series</option>
              {seriesList.map((series, index) => (
                <option key={index} value={series}>{series}</option>
              ))}
            </select>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
            <Button variant="outline" icon={FiDownload} size="sm">Export</Button>
          </div>
        </div>
      </Card>

      {/* Sermons List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Sermon</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Speaker</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Series</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Media</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSermons.map((sermon) => (
                <tr key={sermon.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{sermon.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <SafeIcon icon={FiBook} className="text-gray-400 text-sm" />
                        <span className="text-sm text-gray-500">{sermon.scripture}</span>
                      </div>
                      {sermon.duration && (
                        <div className="flex items-center space-x-2 mt-1">
                          <SafeIcon icon={FiClock} className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-500">{sermon.duration}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                      <span className="text-gray-900">{sermon.speaker}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                      <span className="text-gray-900">{format(new Date(sermon.date), 'MMM d, yyyy')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {sermon.series}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {sermon.videoUrl && (
                        <div className="flex items-center space-x-1 text-blue-600">
                          <SafeIcon icon={FiVideo} className="text-sm" />
                          <span className="text-xs">Video</span>
                        </div>
                      )}
                      {sermon.audioUrl && (
                        <div className="flex items-center space-x-1 text-purple-600">
                          <SafeIcon icon={FiHeadphones} className="text-sm" />
                          <span className="text-xs">Audio</span>
                        </div>
                      )}
                      {!sermon.videoUrl && !sermon.audioUrl && (
                        <span className="text-gray-400 text-xs">No media</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(sermon.status)}`}>
                      {sermon.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      {(sermon.videoUrl || sermon.audioUrl) && (
                        <button 
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          onClick={() => handlePlaySermon(sermon)}
                          title="Play Sermon"
                        >
                          <SafeIcon icon={FiPlay} />
                        </button>
                      )}
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        onClick={() => handleViewSermon(sermon)}
                        title="View Details"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditSermon(sermon)}
                        title="Edit Sermon"
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <SafeIcon icon={FiDownload} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Sermon"
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
            Showing <span className="font-medium">{filteredSermons.length}</span> of <span className="font-medium">{sermons.length}</span> sermons
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

      {/* Sermon Form Modal */}
      {showSermonForm && (
        <SermonForm 
          initialData={selectedSermon} 
          onClose={() => {
            setShowSermonForm(false);
            setSelectedSermon(null);
          }} 
          onSubmit={selectedSermon ? handleUpdateSermon : handleAddSermon} 
        />
      )}
    </div>
  );
};

export default Sermons;