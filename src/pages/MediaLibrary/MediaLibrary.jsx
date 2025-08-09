import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import MediaUploadForm from '../../components/MediaLibrary/MediaUploadForm';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit, 
  FiTrash2, 
  FiEye,
  FiDownload,
  FiImage,
  FiVideo,
  FiMusic,
  FiFile,
  FiFolder,
  FiGrid,
  FiList,
  FiUpload
} = FiIcons;

const MediaLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Mock data for media files
  const mediaFiles = [
    {
      id: 1,
      name: 'Sunday Service - June 4, 2023',
      type: 'video',
      size: '1.2 GB',
      duration: '1:45:30',
      uploadDate: '2023-06-04',
      category: 'Services',
      tags: ['sunday', 'service', 'worship'],
      thumbnail: 'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/videos/sunday-service-june-4.mp4'
    },
    {
      id: 2,
      name: 'Worship Team Practice',
      type: 'audio',
      size: '45 MB',
      duration: '32:15',
      uploadDate: '2023-06-03',
      category: 'Music',
      tags: ['worship', 'practice', 'music'],
      thumbnail: null,
      url: 'https://example.com/audio/worship-practice.mp3'
    },
    {
      id: 3,
      name: 'Church Building Photos',
      type: 'image',
      size: '15 MB',
      duration: null,
      uploadDate: '2023-06-02',
      category: 'Photos',
      tags: ['building', 'architecture', 'church'],
      thumbnail: 'https://images.pexels.com/photos/208271/pexels-photo-208271.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/images/church-building.jpg'
    },
    {
      id: 4,
      name: 'Youth Event Highlights',
      type: 'video',
      size: '800 MB',
      duration: '25:42',
      uploadDate: '2023-05-30',
      category: 'Youth',
      tags: ['youth', 'event', 'highlights'],
      thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/videos/youth-highlights.mp4'
    },
    {
      id: 5,
      name: 'Sermon Notes - Walking in Faith',
      type: 'document',
      size: '2 MB',
      duration: null,
      uploadDate: '2023-05-28',
      category: 'Sermons',
      tags: ['sermon', 'notes', 'faith'],
      thumbnail: null,
      url: 'https://example.com/documents/sermon-notes.pdf'
    },
    {
      id: 6,
      name: 'Christmas Concert Recording',
      type: 'audio',
      size: '120 MB',
      duration: '1:15:20',
      uploadDate: '2023-12-25',
      category: 'Events',
      tags: ['christmas', 'concert', 'music'],
      thumbnail: null,
      url: 'https://example.com/audio/christmas-concert.mp3'
    },
    {
      id: 7,
      name: 'Baptism Ceremony Photos',
      type: 'image',
      size: '25 MB',
      duration: null,
      uploadDate: '2023-05-21',
      category: 'Ceremonies',
      tags: ['baptism', 'ceremony', 'photos'],
      thumbnail: 'https://images.pexels.com/photos/8468463/pexels-photo-8468463.jpeg?auto=compress&cs=tinysrgb&w=300',
      url: 'https://example.com/images/baptism-photos.jpg'
    },
    {
      id: 8,
      name: 'Bible Study Materials',
      type: 'document',
      size: '5 MB',
      duration: null,
      uploadDate: '2023-05-20',
      category: 'Education',
      tags: ['bible', 'study', 'materials'],
      thumbnail: null,
      url: 'https://example.com/documents/bible-study.pdf'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return FiVideo;
      case 'audio':
        return FiMusic;
      case 'image':
        return FiImage;
      case 'document':
        return FiFile;
      default:
        return FiFile;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-blue-500';
      case 'audio':
        return 'text-purple-500';
      case 'image':
        return 'text-green-500';
      case 'document':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleViewMedia = (media) => {
    setSelectedMedia(media);
    // Open media viewer/player
  };

  const handleEditMedia = (media) => {
    setSelectedMedia(media);
    setShowUploadForm(true);
  };

  const handleUploadMedia = (formData) => {
    console.log('New media data:', formData);
    setShowUploadForm(false);
    setSelectedMedia(null);
  };

  const handleUpdateMedia = (formData) => {
    console.log('Updated media data:', formData);
    setShowUploadForm(false);
    setSelectedMedia(null);
  };

  const filteredMedia = mediaFiles.filter(media => {
    const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          media.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          media.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === 'all' || media.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalFiles = mediaFiles.length;
  const videoFiles = mediaFiles.filter(m => m.type === 'video').length;
  const audioFiles = mediaFiles.filter(m => m.type === 'audio').length;
  const imageFiles = mediaFiles.filter(m => m.type === 'image').length;
  const documentFiles = mediaFiles.filter(m => m.type === 'document').length;

  // Calculate total storage
  const totalStorage = mediaFiles.reduce((total, media) => {
    const size = parseFloat(media.size);
    const unit = media.size.split(' ')[1];
    const sizeInMB = unit === 'GB' ? size * 1024 : size;
    return total + sizeInMB;
  }, 0);

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-1">Manage photos, videos, audio files, and documents</p>
        </div>
        <Button 
          icon={FiPlus} 
          onClick={() => {
            setSelectedMedia(null);
            setShowUploadForm(true);
          }}
        >
          Upload Media
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiFolder} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Videos</p>
              <p className="text-2xl font-bold text-gray-900">{videoFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiVideo} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Audio</p>
              <p className="text-2xl font-bold text-gray-900">{audioFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <SafeIcon icon={FiMusic} className="text-purple-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Images</p>
              <p className="text-2xl font-bold text-gray-900">{imageFiles}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiImage} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Storage</p>
              <p className="text-2xl font-bold text-gray-900">{(totalStorage / 1024).toFixed(1)}GB</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <SafeIcon icon={FiUpload} className="text-orange-500 text-xl" />
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
                placeholder="Search media files..."
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
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="image">Images</option>
                <option value="document">Documents</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  className={`p-2 text-sm ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <SafeIcon icon={FiGrid} />
                </button>
                <button
                  className={`p-2 text-sm ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setViewMode('list')}
                >
                  <SafeIcon icon={FiList} />
                </button>
              </div>
              <Button variant="outline" size="sm" className="text-sm">
                <SafeIcon icon={FiFilter} className="mr-1" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Media Grid/List */}
      <Card>
        <div className="space-y-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMedia.map((media) => (
                <div key={media.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {/* Media Thumbnail */}
                  <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                    {media.thumbnail ? (
                      <img 
                        src={media.thumbnail} 
                        alt={media.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <SafeIcon 
                        icon={getTypeIcon(media.type)} 
                        className={`text-4xl ${getTypeColor(media.type)}`} 
                      />
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        media.type === 'video' ? 'bg-blue-100 text-blue-800' :
                        media.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                        media.type === 'image' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {media.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Media Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate mb-2">{media.name}</h3>
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>Category: {media.category}</p>
                      <p>Size: {media.size}</p>
                      {media.duration && <p>Duration: {media.duration}</p>}
                      <p>Uploaded: {format(new Date(media.uploadDate), 'MMM d, yyyy')}</p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex space-x-2">
                        <button 
                          className="p-1 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                          onClick={() => handleViewMedia(media)}
                          title="View"
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          onClick={() => handleEditMedia(media)}
                          title="Edit"
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                          title="Download"
                        >
                          <SafeIcon icon={FiDownload} />
                        </button>
                        <button 
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <SafeIcon icon={FiTrash2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Upload Date</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedia.map((media) => (
                    <tr key={media.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <SafeIcon 
                            icon={getTypeIcon(media.type)} 
                            className={`text-lg ${getTypeColor(media.type)}`} 
                          />
                          <div>
                            <p className="font-medium text-gray-900">{media.name}</p>
                            {media.duration && (
                              <p className="text-sm text-gray-500">Duration: {media.duration}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          media.type === 'video' ? 'bg-blue-100 text-blue-800' :
                          media.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                          media.type === 'image' ? 'bg-green-100 text-green-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {media.type}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{media.category}</td>
                      <td className="py-4 px-4 text-gray-900">{media.size}</td>
                      <td className="py-4 px-4 text-gray-900">{format(new Date(media.uploadDate), 'MMM d, yyyy')}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            onClick={() => handleViewMedia(media)}
                            title="View"
                          >
                            <SafeIcon icon={FiEye} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => handleEditMedia(media)}
                            title="Edit"
                          >
                            <SafeIcon icon={FiEdit} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <SafeIcon icon={FiDownload} />
                          </button>
                          <button 
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
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
          )}
          
          {/* Pagination - Inside Card */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Showing <span className="font-medium">{filteredMedia.length}</span> of <span className="font-medium">{mediaFiles.length}</span> files
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
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
            </select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <SafeIcon icon={FiGrid} />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <SafeIcon icon={FiList} />
              </button>
            </div>
            <Button variant="outline" icon={FiFilter} size="sm">More Filters</Button>
          </div>
        </div>
      </Card>

      {/* Media Grid/List */}
      <Card>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedia.map((media) => (
              <div key={media.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {/* Media Thumbnail */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  {media.thumbnail ? (
                    <img 
                      src={media.thumbnail} 
                      alt={media.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <SafeIcon 
                      icon={getTypeIcon(media.type)} 
                      className={`text-4xl ${getTypeColor(media.type)}`} 
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      media.type === 'video' ? 'bg-blue-100 text-blue-800' :
                      media.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                      media.type === 'image' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {media.type}
                    </span>
                  </div>
                </div>
                
                {/* Media Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate mb-2">{media.name}</h3>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>Category: {media.category}</p>
                    <p>Size: {media.size}</p>
                    {media.duration && <p>Duration: {media.duration}</p>}
                    <p>Uploaded: {format(new Date(media.uploadDate), 'MMM d, yyyy')}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <button 
                        className="p-1 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                        onClick={() => handleViewMedia(media)}
                        title="View"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        onClick={() => handleEditMedia(media)}
                        title="Edit"
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Download"
                      >
                        <SafeIcon icon={FiDownload} />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <SafeIcon icon={FiTrash2} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Size</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Upload Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.map((media) => (
                  <tr key={media.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <SafeIcon 
                          icon={getTypeIcon(media.type)} 
                          className={`text-lg ${getTypeColor(media.type)}`} 
                        />
                        <div>
                          <p className="font-medium text-gray-900">{media.name}</p>
                          {media.duration && (
                            <p className="text-sm text-gray-500">Duration: {media.duration}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        media.type === 'video' ? 'bg-blue-100 text-blue-800' :
                        media.type === 'audio' ? 'bg-purple-100 text-purple-800' :
                        media.type === 'image' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {media.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{media.category}</td>
                    <td className="py-4 px-4 text-gray-900">{media.size}</td>
                    <td className="py-4 px-4 text-gray-900">{format(new Date(media.uploadDate), 'MMM d, yyyy')}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          onClick={() => handleViewMedia(media)}
                          title="View"
                        >
                          <SafeIcon icon={FiEye} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => handleEditMedia(media)}
                          title="Edit"
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download"
                        >
                          <SafeIcon icon={FiDownload} />
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
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
        )}
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredMedia.length}</span> of <span className="font-medium">{mediaFiles.length}</span> files
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

      {/* Upload Form Modal */}
      {showUploadForm && (
        <MediaUploadForm 
          initialData={selectedMedia} 
          onClose={() => {
            setShowUploadForm(false);
            setSelectedMedia(null);
          }} 
          onSubmit={selectedMedia ? handleUpdateMedia : handleUploadMedia} 
        />
      )}
    </div>
  );
};

export default MediaLibrary;