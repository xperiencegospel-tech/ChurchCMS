import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSave, FiX, FiUpload, FiFile, FiTag, FiFolder } = FiIcons;

const MediaUploadForm = ({ onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    tags: initialData?.tags?.join(', ') || '',
    description: initialData?.description || '',
    url: initialData?.url || '',
    type: initialData?.type || 'image'
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const categories = [
    'Services',
    'Music',
    'Photos',
    'Youth',
    'Sermons',
    'Events',
    'Ceremonies',
    'Education',
    'Outreach',
    'Training',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setUploadedFile(file);
    
    // Auto-detect file type
    if (file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, type: 'image' }));
    } else if (file.type.startsWith('video/')) {
      setFormData(prev => ({ ...prev, type: 'video' }));
    } else if (file.type.startsWith('audio/')) {
      setFormData(prev => ({ ...prev, type: 'audio' }));
    } else {
      setFormData(prev => ({ ...prev, type: 'document' }));
    }
    
    // Auto-fill name if empty
    if (!formData.name) {
      setFormData(prev => ({ ...prev, name: file.name.replace(/\.[^/.]+$/, "") }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      file: uploadedFile
    };
    
    onSubmit(processedData);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Edit Media File' : 'Upload New Media'}
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
            {/* File Upload Area */}
            {!initialData && (
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload File</h3>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-300 hover:border-emerald-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="file-upload"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileInput}
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  />
                  
                  {uploadedFile ? (
                    <div className="space-y-2">
                      <SafeIcon icon={FiFile} className="mx-auto h-12 w-12 text-emerald-500" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <SafeIcon icon={FiUpload} className="mx-auto h-12 w-12 text-gray-400" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          Drop files here or click to upload
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports images, videos, audio files, and documents
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Media Information */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Name*</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter a descriptive name for the file"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SafeIcon icon={FiFolder} className="text-gray-400" />
                    </div>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                <div className="md:col-span-2">
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
                      placeholder="worship, music, sunday, service (comma separated)"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </Card>

            {/* External URL (Alternative to file upload) */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">External URL (Optional)</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Media URL</label>
                <input 
                  type="url" 
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="https://example.com/media-file.mp4"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use this if the media is hosted externally (YouTube, Vimeo, etc.)
                </p>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Add a description for this media file..."
              />
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
                {initialData ? 'Update Media' : 'Upload Media'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MediaUploadForm;