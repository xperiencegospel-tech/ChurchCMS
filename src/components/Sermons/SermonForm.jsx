import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUser, FiBook, FiCalendar, FiLink, FiVideo, FiHeadphones, FiTag } = FiIcons;

const SermonForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    speaker: initialData?.speaker || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    series: initialData?.series || '',
    scripture: initialData?.scripture || '',
    videoUrl: initialData?.videoUrl || '',
    audioUrl: initialData?.audioUrl || '',
    notes: initialData?.notes || '',
    tags: initialData?.tags?.join(', ') || '',
    status: initialData?.status || 'Draft',
    duration: initialData?.duration || '',
    outline: initialData?.outline || ''
  });

  const speakers = [
    'Pastor John',
    'Elder Sarah',
    'Deacon Michael',
    'Youth Pastor Mark',
    'Guest Speaker',
    'Other'
  ];

  const seriesList = [
    'Faith Journey',
    'Spiritual Disciplines',
    'Greatest Commandments',
    'Hope Series',
    'Parables of Jesus',
    'Book of Romans',
    'Psalms Study',
    'Christmas Series',
    'Easter Series',
    'Summer Series'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process tags
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    onSubmit(processedData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Sermon' : 'Add New Sermon'}
          </h2>
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <SafeIcon icon={FiX} className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sermon Title*</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter sermon title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Speaker*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiUser} className="text-gray-400" />
                    </div>
                    <select 
                      name="speaker"
                      value={formData.speaker}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select speaker</option>
                      {speakers.map((speaker, index) => (
                        <option key={index} value={speaker}>{speaker}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiCalendar} className="text-gray-400" />
                    </div>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Series</label>
                  <select 
                    name="series"
                    value={formData.series}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select or create series</option>
                    {seriesList.map((series, index) => (
                      <option key={index} value={series}>{series}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scripture Reference*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiBook} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="scripture"
                      value={formData.scripture}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., John 3:16, Romans 8:28-30"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Media URLs */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiVideo} className="text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo, or direct video link</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Audio URL</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiHeadphones} className="text-gray-400" />
                    </div>
                    <input 
                      type="url" 
                      name="audioUrl"
                      value={formData.audioUrl}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="https://example.com/audio/sermon.mp3"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Direct link to audio file (MP3, WAV, etc.)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input 
                      type="text" 
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="e.g., 35:42"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sermon Content */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sermon Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sermon Notes/Summary</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Brief summary or key points of the sermon..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sermon Outline</label>
                  <textarea 
                    name="outline"
                    value={formData.outline}
                    onChange={handleChange}
                    rows={6}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="I. Introduction&#10;II. Main Point 1&#10;III. Main Point 2&#10;IV. Conclusion"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiTag} className="text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="faith, prayer, hope, love (comma separated)"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3">
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
                {initialData ? 'Update Sermon' : 'Save Sermon'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SermonForm;