import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import SafeIcon from '../../common/SafeIcon';
import WorkflowForm from '../../components/Workflow/WorkflowForm';
import TaskForm from '../../components/Workflow/TaskForm';
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
  FiPause,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiUser,
  FiCalendar,
  FiFlag,
  FiArrowRight,
  FiSettings,
  FiDownload,
  FiRefreshCw
} = FiIcons;

const Workflow = () => {
  const [activeTab, setActiveTab] = useState('workflows');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock data for workflows
  const workflows = [
    {
      id: 1,
      name: 'New Member Onboarding',
      description: 'Complete process for welcoming new members',
      status: 'Active',
      createdBy: 'Admin User',
      createdDate: '2023-05-15',
      totalSteps: 8,
      completedInstances: 25,
      averageCompletionTime: '7 days',
      category: 'Membership'
    },
    {
      id: 2,
      name: 'Event Planning Process',
      description: 'Standard workflow for organizing church events',
      status: 'Active',
      createdBy: 'Event Coordinator',
      createdDate: '2023-04-20',
      totalSteps: 12,
      completedInstances: 8,
      averageCompletionTime: '21 days',
      category: 'Events'
    },
    {
      id: 3,
      name: 'Visitor Follow-up',
      description: 'Systematic approach to following up with visitors',
      status: 'Active',
      createdBy: 'Pastor John',
      createdDate: '2023-03-10',
      totalSteps: 5,
      completedInstances: 42,
      averageCompletionTime: '14 days',
      category: 'Outreach'
    },
    {
      id: 4,
      name: 'Financial Approval Process',
      description: 'Approval workflow for expenses over $500',
      status: 'Draft',
      createdBy: 'Finance Manager',
      createdDate: '2023-06-01',
      totalSteps: 6,
      completedInstances: 0,
      averageCompletionTime: null,
      category: 'Finance'
    }
  ];

  // Mock data for active tasks
  const activeTasks = [
    {
      id: 1,
      workflowId: 1,
      workflowName: 'New Member Onboarding',
      title: 'Send Welcome Email',
      assignedTo: 'Sarah Johnson',
      dueDate: '2023-06-06',
      priority: 'High',
      status: 'In Progress',
      memberName: 'John Smith',
      progress: 60
    },
    {
      id: 2,
      workflowId: 1,
      workflowName: 'New Member Onboarding',
      title: 'Schedule Pastoral Visit',
      assignedTo: 'Pastor John',
      dueDate: '2023-06-08',
      priority: 'Medium',
      status: 'Pending',
      memberName: 'Emily Davis',
      progress: 0
    },
    {
      id: 3,
      workflowId: 2,
      workflowName: 'Event Planning Process',
      title: 'Book Venue',
      assignedTo: 'Event Team',
      dueDate: '2023-06-10',
      priority: 'High',
      status: 'Overdue',
      memberName: null,
      progress: 0
    },
    {
      id: 4,
      workflowId: 3,
      workflowName: 'Visitor Follow-up',
      title: 'Make Follow-up Call',
      assignedTo: 'Deacon Michael',
      dueDate: '2023-06-05',
      priority: 'Medium',
      status: 'Completed',
      memberName: 'Alex Thompson',
      progress: 100
    }
  ];

  const handleEditWorkflow = (workflow) => {
    setSelectedWorkflow(workflow);
    setShowWorkflowForm(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleAddWorkflow = (formData) => {
    console.log('New workflow data:', formData);
    setShowWorkflowForm(false);
    setSelectedWorkflow(null);
  };

  const handleUpdateWorkflow = (formData) => {
    console.log('Updated workflow data:', formData);
    setShowWorkflowForm(false);
    setSelectedWorkflow(null);
  };

  const handleAddTask = (formData) => {
    console.log('New task data:', formData);
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = (formData) => {
    console.log('Updated task data:', formData);
    setShowTaskForm(false);
    setSelectedTask(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Paused':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return FiCheckCircle;
      case 'In Progress':
        return FiClock;
      case 'Pending':
        return FiClock;
      case 'Overdue':
        return FiAlertTriangle;
      default:
        return FiClock;
    }
  };

  // Calculate stats
  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter(w => w.status === 'Active').length;
  const totalTasks = activeTasks.length;
  const overdueTasks = activeTasks.filter(t => t.status === 'Overdue').length;
  const completedTasks = activeTasks.filter(t => t.status === 'Completed').length;

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTasks = activeTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Management</h1>
          <p className="text-gray-600 mt-1">Automate and track church processes and tasks</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            icon={FiPlus}
            onClick={() => {
              setSelectedTask(null);
              setShowTaskForm(true);
            }}
          >
            Add Task
          </Button>
          <Button 
            icon={FiPlus}
            onClick={() => {
              setSelectedWorkflow(null);
              setShowWorkflowForm(true);
            }}
          >
            Create Workflow
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Workflows</p>
              <p className="text-3xl font-bold text-gray-900">{totalWorkflows}</p>
              <p className="text-sm text-gray-500 mt-2">{activeWorkflows} active</p>
            </div>
            <div className="p-3 rounded-full bg-emerald-100">
              <SafeIcon icon={FiSettings} className="text-emerald-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Tasks</p>
              <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
              <p className="text-sm text-gray-500 mt-2">Currently running</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <SafeIcon icon={FiClock} className="text-blue-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold text-gray-900">{completedTasks}</p>
              <p className="text-sm text-gray-500 mt-2">This week</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <SafeIcon icon={FiCheckCircle} className="text-green-500 text-xl" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Overdue</p>
              <p className="text-3xl font-bold text-gray-900">{overdueTasks}</p>
              <div className="flex items-center mt-2">
                <SafeIcon icon={FiAlertTriangle} className="text-red-500 mr-1" />
                <span className="text-sm text-red-600 font-medium">Requires attention</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <SafeIcon icon={FiAlertTriangle} className="text-red-500 text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {[
            { id: 'workflows', label: 'Workflows' },
            { id: 'tasks', label: 'Active Tasks' },
            { id: 'templates', label: 'Templates' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`py-4 px-6 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'text-emerald-600 border-emerald-600'
                  : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="w-full">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Filter and Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
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

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(workflow.status)}`}>
                    {workflow.status}
                  </span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                    {workflow.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{workflow.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Steps:</span>
                    <span className="font-medium">{workflow.totalSteps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium">{workflow.completedInstances}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Time:</span>
                    <span className="font-medium">{workflow.averageCompletionTime || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{format(new Date(workflow.createdDate), 'MMM d, yyyy')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="View Workflow"
                    >
                      <SafeIcon icon={FiEye} />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => handleEditWorkflow(workflow)}
                      title="Edit Workflow"
                    >
                      <SafeIcon icon={FiEdit} />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Start Instance"
                    >
                      <SafeIcon icon={FiPlay} />
                    </button>
                  </div>
                  <Button variant="outline" size="sm">
                    {workflow.status === 'Active' ? 'Pause' : 'Activate'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="w-full">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
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
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                  <Button variant="outline" size="sm" className="text-sm">
                    <SafeIcon icon={FiRefreshCw} className="mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Tasks List */}
          <Card>
            <div className="space-y-4">
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Task</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Workflow</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Assigned To</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Due Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <SafeIcon 
                              icon={getStatusIcon(task.status)} 
                              className={`${
                                task.status === 'Completed' ? 'text-green-500' :
                                task.status === 'Overdue' ? 'text-red-500' :
                                'text-blue-500'
                              }`} 
                            />
                            <div>
                              <p className="font-medium text-gray-900">{task.title}</p>
                              {task.memberName && (
                                <p className="text-sm text-gray-500">For: {task.memberName}</p>
                              )}
                              {task.progress > 0 && task.status !== 'Completed' && (
                                <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div 
                                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${task.progress}%` }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {task.workflowName}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiUser} className="text-gray-400" />
                            <span className="text-gray-900">{task.assignedTo}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <SafeIcon icon={FiCalendar} className="text-gray-400" />
                            <span className={`${
                              new Date(task.dueDate) < new Date() && task.status !== 'Completed' 
                                ? 'text-red-600 font-medium' 
                                : 'text-gray-900'
                            }`}>
                              {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(task.priority)}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(task.status)}`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end space-x-2">
                            <button 
                              className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="View Task"
                            >
                              <SafeIcon icon={FiEye} />
                            </button>
                            <button 
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              onClick={() => handleEditTask(task)}
                              title="Edit Task"
                            >
                              <SafeIcon icon={FiEdit} />
                            </button>
                            {task.status !== 'Completed' && (
                              <button 
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Mark Complete"
                              >
                                <SafeIcon icon={FiCheckCircle} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <SafeIcon 
                          icon={getStatusIcon(task.status)} 
                          className={`mt-1 ${
                            task.status === 'Completed' ? 'text-green-500' :
                            task.status === 'Overdue' ? 'text-red-500' :
                            'text-blue-500'
                          }`} 
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">{task.title}</p>
                          {task.memberName && (
                            <p className="text-sm text-gray-500">For: {task.memberName}</p>
                          )}
                          {task.progress > 0 && task.status !== 'Completed' && (
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(task.status)} ml-2`}>
                        {task.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiUser} className="text-gray-400" />
                        <span className="text-gray-600">{task.assignedTo}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <SafeIcon icon={FiCalendar} className="text-gray-400" />
                        <span className={`${
                          new Date(task.dueDate) < new Date() && task.status !== 'Completed' 
                            ? 'text-red-600 font-medium' 
                            : 'text-gray-600'
                        }`}>
                          {format(new Date(task.dueDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {task.workflowName}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <SafeIcon icon={FiEye} />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => handleEditTask(task)}
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                      {task.status !== 'Completed' && (
                        <button 
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <SafeIcon icon={FiCheckCircle} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination - Inside Card */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    Showing <span className="font-medium">{filteredTasks.length}</span> of <span className="font-medium">{activeTasks.length}</span> tasks
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
          </Card>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: 'New Member Onboarding',
                  description: 'Complete process for welcoming new members',
                  steps: 8,
                  category: 'Membership'
                },
                {
                  name: 'Event Planning',
                  description: 'Standard workflow for organizing events',
                  steps: 12,
                  category: 'Events'
                },
                {
                  name: 'Visitor Follow-up',
                  description: 'Systematic visitor engagement process',
                  steps: 5,
                  category: 'Outreach'
                },
                {
                  name: 'Financial Approval',
                  description: 'Expense approval workflow',
                  steps: 6,
                  category: 'Finance'
                },
                {
                  name: 'Ministry Leader Onboarding',
                  description: 'Process for new ministry leaders',
                  steps: 10,
                  category: 'Leadership'
                },
                {
                  name: 'Equipment Maintenance',
                  description: 'Regular equipment maintenance workflow',
                  steps: 7,
                  category: 'Operations'
                }
              ].map((template, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{template.steps} steps</span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Workflow Form Modal */}
      {showWorkflowForm && (
        <WorkflowForm 
          initialData={selectedWorkflow} 
          onClose={() => {
            setShowWorkflowForm(false);
            setSelectedWorkflow(null);
          }} 
          onSubmit={selectedWorkflow ? handleUpdateWorkflow : handleAddWorkflow} 
        />
      )}

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm 
          initialData={selectedTask}
          workflows={workflows}
          onClose={() => {
            setShowTaskForm(false);
            setSelectedTask(null);
          }} 
          onSubmit={selectedTask ? handleUpdateTask : handleAddTask} 
        />
      )}
    </div>
  );
};

export default Workflow;