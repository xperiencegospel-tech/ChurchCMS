import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { format } from 'date-fns';

const {
  FiPlus,
  FiSearch,
  FiFilter,
  FiMail,
  FiCalendar,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiPauseCircle,
  FiDownload,
  FiUsers,
  FiEdit,
  FiTrash2,
  FiPaperclip
} = FiIcons;

const Mail = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [showComposeForm, setShowComposeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);

  // Mock data for emails
  const emails = [
    {
      id: 1,
      subject: 'Sunday Service Announcement',
      sender: 'Pastor John',
      email: 'pastor@church.com',
      date: '2023-06-05',
      time: '09:30',
      status: 'read',
      content: 'Dear Church Family,\n\nThis Sunday, we will be having a special guest speaker. Please make sure to arrive early to welcome them.\n\nBlessings,\nPastor John'
    },
    {
      id: 2,
      subject: 'Prayer Meeting Reminder',
      sender: 'Prayer Team',
      email: 'prayer@church.com',
      date: '2023-06-04',
      time: '14:15',
      status: 'unread',
      content: 'Dear Prayer Warriors,\n\nDon\'t forget our prayer meeting tomorrow evening at 7 PM. We will be focusing on praying for our community outreach efforts.\n\nIn Christ,\nThe Prayer Team'
    },
    {
      id: 3,
      subject: 'Youth Camp Registration',
      sender: 'Youth Ministry',
      email: 'youth@church.com',
      date: '2023-06-03',
      time: '11:45',
      status: 'read',
      content: 'Parents and Youth,\n\nRegistration for the summer youth camp is now open! Please register by June 15th to secure your spot. The camp will be from July 10-15.\n\nYouth Ministry Team'
    },
    {
      id: 4,
      subject: 'Volunteer Opportunity',
      sender: 'Outreach Coordinator',
      email: 'outreach@church.com',
      date: '2023-06-01',
      time: '16:20',
      status: 'unread',
      content: 'Hello Volunteers,\n\nWe have an upcoming community service event on June 10th. We need volunteers for various roles. Please let us know if you can help.\n\nThank you,\nOutreach Team'
    },
    {
      id: 5,
      sender: 'Finance Committee',
      email: 'finance@church.com',
      subject: 'Financial Report - May 2023',
      date: '2023-05-31',
      time: '10:05',
      status: 'read',
      content: 'Dear Church Leaders,\n\nAttached is the financial report for May 2023. We are pleased to report that we are on track with our budget for the year.\n\nRegards,\nFinance Committee',
      attachment: 'financial-report-may-2023.pdf'
    }
  ];

  const sentEmails = [
    {
      id: 101,
      subject: 'Weekly Bulletin',
      recipient: 'All Members',
      recipients: 'members@church.com',
      date: '2023-06-04',
      time: '08:00',
      status: 'sent',
      content: 'Dear Church Family,\n\nPlease find attached our weekly bulletin with announcements and upcoming events.\n\nBlessings,\nChurch Admin'
    },
    {
      id: 102,
      subject: 'Choir Practice Schedule',
      recipient: 'Worship Team',
      recipients: 'worship@church.com',
      date: '2023-06-02',
      time: '15:30',
      status: 'sent',
      content: 'Dear Worship Team,\n\nHere is the schedule for choir practice for the next month. Please note the change in time for the June 15th practice.\n\nThank you,\nWorship Director'
    },
    {
      id: 103,
      subject: 'Board Meeting Minutes',
      recipient: 'Church Board',
      recipients: 'board@church.com',
      date: '2023-05-30',
      time: '14:20',
      status: 'sent',
      content: 'Dear Board Members,\n\nAttached are the minutes from our last board meeting. Please review and let me know if you have any corrections.\n\nBest regards,\nChurch Secretary',
      attachment: 'board-minutes-may-2023.pdf'
    }
  ];

  const draftEmails = [
    {
      id: 201,
      subject: 'Upcoming Events - June 2023',
      recipient: '',
      recipients: '',
      date: '2023-06-03',
      time: '11:15',
      status: 'draft',
      content: 'Dear Church Family,\n\nHere are the upcoming events for June 2023:\n\n1. Father\'s Day Service - June 18\n2. Vacation Bible School - June 20-24\n3. Community Outreach - June 30\n\n[Draft - More details to be added]'
    }
  ];

  // Function to filter emails based on search term
  const filterEmails = (emails) => {
    return emails.filter(email => 
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      email.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipient?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get the appropriate emails based on active tab
  const getActiveEmails = () => {
    switch(activeTab) {
      case 'inbox':
        return filterEmails(emails);
      case 'sent':
        return filterEmails(sentEmails);
      case 'drafts':
        return filterEmails(draftEmails);
      default:
        return [];
    }
  };

  const activeEmails = getActiveEmails();

  // Email counts
  const unreadCount = emails.filter(email => email.status === 'unread').length;
  const totalInbox = emails.length;
  const totalSent = sentEmails.length;
  const totalDrafts = draftEmails.length;

  // Toggle email selection
  const toggleEmailSelection = (emailId) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  // Check if all emails are selected
  const allSelected = activeEmails.length > 0 && selectedEmails.length === activeEmails.length;

  // Toggle select all
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(activeEmails.map(email => email.id));
    }
  };

  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  // Compose Email Form
  const ComposeForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
      to: '',
      subject: '',
      message: '',
      attachment: null
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Email data:', formData);
      onClose();
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Compose Email</h2>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To*</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="recipient@example.com or select from contacts"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject*</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={12}
                  className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Write your message here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" icon={FiPaperclip}>
                    Add Attachment
                  </Button>
                  <span className="text-sm text-gray-500">
                    {formData.attachment ? formData.attachment.name : 'No file selected'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="secondary" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="outline" type="button">
                Save as Draft
              </Button>
              <Button icon={FiSend} type="submit">
                Send Email
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Email Detail View
  const EmailDetail = ({ email, onBack }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <button
            className="text-emerald-600 hover:text-emerald-800 flex items-center space-x-1"
            onClick={onBack}
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to {activeTab}</span>
          </button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" icon={FiReply}>
              Reply
            </Button>
            <Button variant="outline" size="sm" icon={FiTrash2}>
              Delete
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">{email.subject}</h2>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-gray-600">
                From: <span className="font-medium">{email.sender || email.recipient}</span> &lt;{email.email || email.recipients}&gt;
              </p>
              <p className="text-gray-500 text-sm">
                {format(new Date(`${email.date} ${email.time}`), 'MMM d, yyyy h:mm a')}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="prose max-w-none">
            {email.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>

        {email.attachment && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <SafeIcon icon={FiPaperclip} className="text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{email.attachment}</p>
                <p className="text-xs text-gray-500">PDF Document</p>
              </div>
              <Button variant="outline" size="sm" icon={FiDownload}>
                Download
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FiArrowLeft = (props) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );

  const FiReply = (props) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <polyline points="9 10 4 15 9 20"></polyline>
      <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
    </svg>
  );

  const FiX = (props) => (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mail System</h1>
          <p className="text-gray-600 mt-1">Send and manage email communications</p>
        </div>
        <Button icon={FiPlus} onClick={() => setShowComposeForm(true)}>
          Compose Email
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mail Folders */}
        <div className="lg:col-span-1">
          <Card>
            <div className="space-y-1">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'inbox' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTab('inbox')}
              >
                <div className="flex items-center">
                  <SafeIcon icon={FiMail} className={`mr-3 ${activeTab === 'inbox' ? 'text-emerald-500' : 'text-gray-400'}`} />
                  <span className="font-medium">Inbox</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${unreadCount > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
                  {totalInbox}
                </span>
              </button>

              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'sent' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTab('sent')}
              >
                <div className="flex items-center">
                  <SafeIcon icon={FiSend} className={`mr-3 ${activeTab === 'sent' ? 'text-emerald-500' : 'text-gray-400'}`} />
                  <span className="font-medium">Sent</span>
                </div>
                <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  {totalSent}
                </span>
              </button>

              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${activeTab === 'drafts' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50'}`}
                onClick={() => setActiveTab('drafts')}
              >
                <div className="flex items-center">
                  <SafeIcon icon={FiPauseCircle} className={`mr-3 ${activeTab === 'drafts' ? 'text-emerald-500' : 'text-gray-400'}`} />
                  <span className="font-medium">Drafts</span>
                </div>
                <span className="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  {totalDrafts}
                </span>
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
                Email Templates
              </h3>
              <div className="space-y-1">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Welcome Email
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Weekly Newsletter
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Event Invitation
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                  Thank You Note
                </button>
              </div>
              <div className="mt-4 px-4">
                <Button variant="outline" size="sm" className="w-full">
                  <div className="flex items-center justify-center">
                    <SafeIcon icon={FiPlus} className="mr-1" />
                    <span>New Template</span>
                  </div>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Email List */}
        <div className="lg:col-span-3">
          {selectedEmail ? (
            <EmailDetail email={selectedEmail} onBack={() => setSelectedEmail(null)} />
          ) : (
            <>
              {/* Search and Actions */}
              <Card className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder={`Search in ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  {selectedEmails.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {selectedEmails.length} selected
                      </span>
                      <Button variant="outline" size="sm" icon={FiTrash2}>
                        Delete
                      </Button>
                      {activeTab === 'inbox' && (
                        <Button variant="outline" size="sm" icon={FiMail}>
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>

              {/* Email List */}
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="w-10 text-left py-3 px-4">
                          <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={toggleSelectAll}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">
                          {activeTab === 'inbox' ? 'Sender' : activeTab === 'sent' ? 'Recipient' : 'Draft'}
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-900">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeEmails.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-8 text-gray-500">
                            No emails found in {activeTab}
                          </td>
                        </tr>
                      ) : (
                        activeEmails.map((email) => (
                          <tr 
                            key={email.id} 
                            className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${email.status === 'unread' && activeTab === 'inbox' ? 'bg-emerald-50' : ''}`}
                            onClick={() => handleEmailClick(email)}
                          >
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={selectedEmails.includes(email.id)}
                                onChange={() => toggleEmailSelection(email.id)}
                                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold">
                                  {(email.sender || email.recipient || "Draft").split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className={`font-medium ${email.status === 'unread' && activeTab === 'inbox' ? 'text-gray-900' : 'text-gray-700'}`}>
                                    {email.sender || email.recipient || "Draft Email"}
                                  </p>
                                  <p className="text-sm text-gray-500">{email.email || email.recipients || ""}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <p className={`${email.status === 'unread' && activeTab === 'inbox' ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                                {email.subject}
                              </p>
                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                {email.content.substring(0, 60)}...
                              </p>
                              {email.attachment && (
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <SafeIcon icon={FiPaperclip} className="mr-1" />
                                  <span>{email.attachment}</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <p className="text-sm text-gray-500">{format(new Date(email.date), 'MMM d')}</p>
                              <p className="text-xs text-gray-400">{email.time}</p>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-medium">{activeEmails.length}</span> emails
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
            </>
          )}
        </div>
      </div>

      {/* Compose Email Modal */}
      {showComposeForm && (
        <ComposeForm onClose={() => setShowComposeForm(false)} />
      )}
    </div>
  );
};

export default Mail;