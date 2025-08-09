import React from 'react';
import Button from '../UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const { FiX, FiPrinter, FiDownload, FiEdit } = FiIcons;

const CertificatePreview = ({ certificate, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    console.log('Downloading certificate as PDF');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Certificate Preview</h2>
          <div className="flex items-center space-x-3">
            <Button variant="outline" icon={FiEdit} size="sm">Edit</Button>
            <Button variant="outline" icon={FiPrinter} size="sm" onClick={handlePrint}>Print</Button>
            <Button variant="outline" icon={FiDownload} size="sm" onClick={handleDownload}>Download PDF</Button>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {/* Landscape Bible School Certificate */}
            <div className="bg-white shadow-lg" style={{ aspectRatio: '11/8.5', minHeight: '600px' }}>
              {/* Certificate Border */}
              <div className="h-full border-8 border-double border-emerald-600 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full bg-gradient-to-br from-emerald-100 to-emerald-50"></div>
                </div>
                
                {/* Certificate Content */}
                <div className="relative h-full flex flex-col justify-between p-12">
                  {/* Header */}
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-20 h-20 mx-auto mb-4 bg-emerald-600 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h1 className="text-4xl font-bold text-emerald-800 mb-2">Grace Community Church</h1>
                      <h2 className="text-2xl font-semibold text-emerald-700">Bible School</h2>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-4">Certificate of Completion</h3>
                      <div className="w-32 h-1 bg-emerald-600 mx-auto"></div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <p className="text-lg text-gray-700 mb-4">This is to certify that</p>
                    
                    <div className="mb-6">
                      <h2 className="text-4xl font-bold text-gray-900 mb-2 border-b-2 border-emerald-600 inline-block pb-2">
                        {certificate.recipientName}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-2">has successfully completed the course</p>
                    
                    <h3 className="text-2xl font-semibold text-emerald-800 mb-6">
                      {certificate.courseName || certificate.certificateType}
                    </h3>
                    
                    {certificate.grade && (
                      <p className="text-lg text-gray-700 mb-4">
                        with a grade of <span className="font-bold text-emerald-700">{certificate.grade}</span>
                      </p>
                    )}
                    
                    <p className="text-lg text-gray-700">
                      on this <span className="font-semibold">{format(new Date(certificate.dateCompleted), 'do')}</span> day of{' '}
                      <span className="font-semibold">{format(new Date(certificate.dateCompleted), 'MMMM, yyyy')}</span>
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end">
                    <div className="text-center">
                      <div className="w-48 border-b-2 border-gray-400 mb-2"></div>
                      <p className="text-sm font-semibold text-gray-700">{certificate.instructor}</p>
                      <p className="text-xs text-gray-600">Instructor</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                        <svg className="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">Church Seal</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-48 border-b-2 border-gray-400 mb-2"></div>
                      <p className="text-sm font-semibold text-gray-700">Pastor John Smith</p>
                      <p className="text-xs text-gray-600">Senior Pastor</p>
                    </div>
                  </div>
                  
                  {/* Certificate ID */}
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    Certificate ID: CERT-{certificate.id.toString().padStart(4, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;