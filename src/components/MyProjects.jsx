import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useResponsive from '../hooks/useResponsive';

// Mock data for user's projects
const mockUserProjects = [
  {
    id: 1,
    title: "AI-Powered Recipe Generator",
    description: "Building an intelligent recipe suggestion system using machine learning algorithms to create personalized meal plans based on dietary preferences and available ingredients.",
    status: "In Progress",
    progress: 75,
    category: "AI/ML",
    tags: ["React", "Python", "TensorFlow", "API"],
    startDate: "2024-01-10",
    estimatedCompletion: "2024-02-15",
    contributors: [
      { name: "Alice Smith", avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Bob Johnson", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    milestones: [
      { title: "Project Setup", completed: true },
      { title: "Data Collection", completed: true },
      { title: "ML Model Training", completed: true },
      { title: "API Development", completed: false },
      { title: "Frontend Integration", completed: false }
    ],
    lastActivity: "2024-01-25"
  },
  {
    id: 2,
    title: "Sustainable Energy Tracker",
    description: "Developing a comprehensive energy monitoring dashboard that tracks consumption, integrates renewable sources, and provides actionable insights for reducing carbon footprint.",
    status: "Planning",
    progress: 25,
    category: "Sustainability",
    tags: ["Vue.js", "Node.js", "IoT", "Charts"],
    startDate: "2024-01-15",
    estimatedCompletion: "2024-03-01",
    contributors: [
      { name: "Carol Davis", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    milestones: [
      { title: "Requirements Analysis", completed: true },
      { title: "System Design", completed: false },
      { title: "Hardware Integration", completed: false },
      { title: "Dashboard Development", completed: false },
      { title: "Testing & Deployment", completed: false }
    ],
    lastActivity: "2024-01-24"
  },
  {
    id: 3,
    title: "Mental Health Companion App",
    description: "Creating a supportive mobile application with AI-powered chat, mood tracking, and mental wellness resources to help users maintain better mental health.",
    status: "Completed",
    progress: 100,
    category: "Health Tech",
    tags: ["React Native", "Firebase", "NLP", "Health"],
    startDate: "2023-12-01",
    estimatedCompletion: "2024-01-20",
    contributors: [
      { name: "David Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Emma Thompson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Michael Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    milestones: [
      { title: "App Architecture", completed: true },
      { title: "Core Features", completed: true },
      { title: "AI Integration", completed: true },
      { title: "User Testing", completed: true },
      { title: "App Store Release", completed: true }
    ],
    lastActivity: "2024-01-20",
    achievements: ["Most Innovative Health App", "User Choice Award"]
  },
  {
    id: 4,
    title: "Smart Home Security System",
    description: "Designing an integrated IoT-based security system with facial recognition, smart alerts, and mobile app control for comprehensive home protection.",
    status: "On Hold",
    progress: 40,
    category: "IoT",
    tags: ["IoT", "Computer Vision", "Mobile", "Security"],
    startDate: "2023-11-15",
    estimatedCompletion: "2024-02-28",
    contributors: [
      { name: "Sarah Garcia", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    milestones: [
      { title: "Hardware Selection", completed: true },
      { title: "Prototype Development", completed: true },
      { title: "Facial Recognition", completed: false },
      { title: "Mobile App", completed: false },
      { title: "System Integration", completed: false }
    ],
    lastActivity: "2024-01-10"
  },
  {
    id: 5,
    title: "Blockchain Voting Platform",
    description: "Building a secure, transparent voting system using blockchain technology to ensure election integrity and provide real-time, verifiable results.",
    status: "In Progress",
    progress: 60,
    category: "Blockchain",
    tags: ["Solidity", "Web3", "React", "Ethereum"],
    startDate: "2024-01-05",
    estimatedCompletion: "2024-03-15",
    contributors: [
      { name: "James Miller", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Lisa Anderson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    milestones: [
      { title: "Smart Contract Design", completed: true },
      { title: "Contract Development", completed: true },
      { title: "Security Audit", completed: true },
      { title: "Frontend Development", completed: false },
      { title: "Testing & Deployment", completed: false }
    ],
    lastActivity: "2024-01-26"
  }
];

const MyProjects = ({ onClose, onViewProject, onViewProfile, savedProjects = [], onUnsaveProject, onStartProject, isMobile = false, isTablet = false }) => {
  const [activeCategory, setActiveCategory] = useState('inProgress');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const { theme } = useTheme();
  const { isMobile: responsiveIsMobile } = useResponsive();
  
  const actualIsMobile = isMobile || responsiveIsMobile;

  const categories = [
    { 
      id: 'inProgress', 
      label: 'In Progress', 
      count: mockUserProjects.filter(p => p.status === 'In Progress').length,
      icon: '🚀',
      color: 'from-blue-500 to-purple-600'
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      count: mockUserProjects.filter(p => p.status === 'Completed').length,
      icon: '✅',
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      id: 'saved', 
      label: 'Saved', 
      count: savedProjects.length,
      icon: '💾',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const statusOptions = ['all', 'In Progress', 'Planning', 'Completed', 'On Hold'];
  const sortOptions = [
    { value: 'recent', label: 'Recent Activity' },
    { value: 'progress', label: 'By Progress' },
    { value: 'name', label: 'By Name' },
    { value: 'status', label: 'By Status' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'bg-gradient-to-r from-blue-500 to-purple-600';
      case 'Planning': return 'bg-gradient-to-r from-amber-400 to-orange-500';
      case 'Completed': return 'bg-gradient-to-r from-emerald-400 to-emerald-600';
      case 'On Hold': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      default: return 'bg-gradient-to-r from-slate-400 to-slate-600';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'from-emerald-500 to-emerald-600';
    if (progress >= 60) return 'from-blue-500 to-blue-600';
    if (progress >= 40) return 'from-yellow-500 to-yellow-600';
    if (progress >= 20) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getCurrentProjects = () => {
    switch(activeCategory) {
      case 'saved':
        return savedProjects;
      case 'completed':
        return mockUserProjects.filter(p => p.status === 'Completed');
      case 'inProgress':
      default:
        return mockUserProjects.filter(p => p.status === 'In Progress' || p.status === 'Planning' || p.status === 'On Hold');
    }
  };

  const filteredAndSortedProjects = getCurrentProjects()
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'progress':
          return (b.progress || 0) - (a.progress || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        case 'recent':
        default:
          return new Date(b.lastActivity || b.createdDate || Date.now()) - new Date(a.lastActivity || a.createdDate || Date.now());
      }
    });

  const handleCompleteProject = (projectId) => {
    // Handle project completion logic
    console.log('Completing project:', projectId);
  };

  const handleCancelProject = (projectId) => {
    // Handle project cancellation logic
    console.log('Cancelling project:', projectId);
  };

  const ProjectCard = ({ project }) => {
    const isFromSaved = activeCategory === 'saved';
    
    return (
      <div className="group relative animate-fade-in-up">
        {/* Card glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-lg group-hover:blur-xl group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
        
        <div 
          className={`
            relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 
            dark:from-slate-800/90 dark:via-slate-800/70 dark:to-slate-800/50 
            backdrop-blur-xl rounded-3xl border border-white/40 dark:border-slate-700/40 
            shadow-elegant hover:shadow-ethereal transition-all duration-500 
            transform hover:scale-[1.02] overflow-hidden cursor-pointer
            ${actualIsMobile ? 'p-4' : 'p-6'}
          `}
          onClick={() => isFromSaved ? onViewProject?.(project, true) : onViewProject?.(project, false)}
        >
          
          {/* Status indicator */}
          <div className="absolute top-0 right-0 overflow-hidden">
            <div className={`
              ${isFromSaved ? 'bg-gradient-to-r from-orange-500 to-orange-600' : getStatusColor(project.status)} 
              text-white text-xs font-black px-6 py-2 transform rotate-45 translate-x-4 -translate-y-1
              shadow-lg
            `}>
              {isFromSaved ? 'SAVED' : (project.status || 'ACTIVE').toUpperCase()}
            </div>
          </div>

          {/* Header */}
          <div className="mb-4">
            <h3 className={`
              font-black text-slate-900 dark:text-slate-100 mb-2 leading-tight 
              group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 
              group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 
              line-clamp-2
              ${actualIsMobile ? 'text-lg' : 'text-xl'}
            `}>
              {project.title}
            </h3>

            <p className={`
              text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3
              ${actualIsMobile ? 'text-sm' : 'text-base'}
            `}>
              {project.description || project.overview}
            </p>
          </div>

          {/* Progress bar (only for non-saved projects) */}
          {!isFromSaved && project.progress !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-slate-700 dark:text-slate-300 font-semibold ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                  Progress
                </span>
                <span className={`font-bold bg-gradient-to-r ${getProgressColor(project.progress)} bg-clip-text text-transparent ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                  {project.progress}%
                </span>
              </div>
              <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full bg-gradient-to-r ${getProgressColor(project.progress)} rounded-full shadow-lg transition-all duration-1000 ease-out relative`}
                  style={{width: `${project.progress}%`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                  <div className="absolute right-0 top-0 w-1 h-full bg-white/40 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Creator info (for saved projects) */}
          {isFromSaved && project.creator && (
            <div className="mb-4">
              <h4 className={`font-bold text-slate-800 dark:text-slate-200 mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                Created by
              </h4>
              <div className="flex items-center space-x-3">
                <img 
                  src={project.creator.avatar} 
                  alt={project.creator.name}
                  className={`rounded-xl border-2 border-white dark:border-slate-700 shadow-md ${actualIsMobile ? 'w-8 h-8' : 'w-10 h-10'}`}
                />
                <div>
                  <p className={`font-semibold text-slate-800 dark:text-slate-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                    {project.creator.name}
                  </p>
                  <p className={`text-slate-600 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                    Level {project.creator.level} • {project.creator.reputation} points
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {(project.tags || []).slice(0, actualIsMobile ? 3 : 4).map((tag, index) => (
                <span 
                  key={index} 
                  className={`
                    bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 
                    text-slate-700 dark:text-slate-300 rounded-lg font-bold border border-slate-200/50 
                    dark:border-slate-600/50 hover:scale-105 transition-transform duration-200
                    ${actualIsMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'}
                  `}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer with actions */}
          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            {/* Action buttons */}
            <div className={`flex gap-3 ${actualIsMobile ? 'flex-col' : ''}`}>
              {isFromSaved ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartProject?.(project);
                    }}
                    className={`
                      flex-1 bg-gradient-to-r from-blue-600 to-purple-600 
                      hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl 
                      transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                      focus-visible:focus group
                      ${actualIsMobile ? 'py-3 px-4' : 'py-3 px-6'}
                    `}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className={actualIsMobile ? 'text-sm' : 'text-base'}>Start Project</span>
                    </span>
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnsaveProject?.(project);
                    }}
                    className={`
                      border-2 border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 
                      font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 
                      hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 
                      focus-visible:focus group
                      ${actualIsMobile ? 'py-3 px-4' : 'py-3 px-6'}
                    `}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span className={actualIsMobile ? 'text-sm' : 'text-base'}>Unsave</span>
                    </span>
                  </button>
                </>
              ) : (
                <>
                  {project.status !== 'Completed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompleteProject(project.id);
                      }}
                      className={`
                        flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 
                        hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-xl 
                        transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                        focus-visible:focus group
                        ${actualIsMobile ? 'py-3 px-4' : 'py-3 px-6'}
                      `}
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={actualIsMobile ? 'text-sm' : 'text-base'}>Mark Complete</span>
                      </span>
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelProject(project.id);
                    }}
                    className={`
                      border-2 border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 
                      font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 
                      hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 
                      focus-visible:focus group
                      ${actualIsMobile ? 'py-3 px-4' : 'py-3 px-6'}
                      ${project.status === 'Completed' ? 'flex-1' : ''}
                    `}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className={actualIsMobile ? 'text-sm' : 'text-base'}>
                        {project.status === 'Completed' ? 'Archive' : 'Cancel'}
                      </span>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in-up safe-area-inset"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`
        glass border border-white/20 dark:border-slate-700/50 shadow-premium
        ${actualIsMobile 
          ? 'w-full h-full max-h-screen rounded-none' 
          : isTablet 
            ? 'w-full max-w-6xl max-h-[95vh] rounded-2xl'
            : 'max-w-7xl w-full max-h-[90vh] rounded-3xl'
        }
        overflow-hidden
      `}>
        {/* Header */}
        <div className={`
          relative bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 
          dark:from-emerald-900/30 dark:via-blue-900/30 dark:to-purple-900/30 
          border-b border-slate-200/60 dark:border-slate-700/50
          ${actualIsMobile ? 'p-4 pt-6' : 'p-6 sm:p-8'}
        `}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h2 className={`
                    font-black bg-gradient-to-r from-slate-900 to-slate-700 
                    dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent
                    ${actualIsMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'}
                  `}>
                    My Projects
                  </h2>
                  <p className={`text-slate-600 dark:text-slate-400 mt-1 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                    Track your progress and manage your development journey
                  </p>
                </div>
              </div>

              {/* Stats summary */}
              <div className={`grid gap-4 mb-6 ${actualIsMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                {[
                  { label: 'Total', count: mockUserProjects.length, color: 'from-blue-500 to-blue-600' },
                  { label: 'In Progress', count: mockUserProjects.filter(p => p.status === 'In Progress' || p.status === 'Planning' || p.status === 'On Hold').length, color: 'from-purple-500 to-purple-600' },
                  { label: 'Completed', count: mockUserProjects.filter(p => p.status === 'Completed').length, color: 'from-emerald-500 to-emerald-600' },
                  { label: 'Saved', count: savedProjects.length, color: 'from-orange-500 to-orange-600' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-white/30 dark:border-slate-600/30">
                    <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.count}
                    </div>
                    <div className={`text-slate-600 dark:text-slate-400 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Tabs */}
              <div className="flex space-x-1 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-1 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300
                      ${actualIsMobile ? 'text-sm' : 'text-base'}
                      ${activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/50'
                      }
                    `}
                  >
                    <span>{category.icon}</span>
                    <span className={actualIsMobile ? 'hidden sm:inline' : ''}>{category.label}</span>
                    <span className={`
                      px-2 py-1 rounded-lg text-xs font-black
                      ${activeCategory === category.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                      }
                    `}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Filters and Search */}
              <div className="space-y-4">
                {/* Search bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`
                      block w-full pl-12 pr-4 border-2 border-slate-200/60 dark:border-slate-700/60 
                      rounded-2xl leading-5 glass placeholder-slate-500 dark:placeholder-slate-400 
                      focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 
                      focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 
                      text-slate-900 dark:text-slate-100 font-medium
                      ${actualIsMobile ? 'py-3 text-base' : 'py-4 text-lg'}
                    `}
                    placeholder={`Search ${categories.find(c => c.id === activeCategory)?.label.toLowerCase()} projects...`}
                  />
                </div>

                {/* Sort dropdown */}
                <div className="flex justify-end">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`
                      bg-white/60 dark:bg-slate-800/60 border-2 border-slate-200/60 dark:border-slate-700/60 
                      rounded-xl font-semibold text-slate-700 dark:text-slate-300 
                      focus:outline-none focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 
                      focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300
                      ${actualIsMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2 text-base'}
                    `}
                  >
                    {[
                      { value: 'recent', label: 'Recent Activity' },
                      { value: 'progress', label: 'By Progress' },
                      { value: 'name', label: 'By Name' },
                      { value: 'status', label: 'By Status' }
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/50 rounded-full transition-all duration-200 focus-visible:focus ml-4 flex-shrink-0"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className={`overflow-y-auto ${actualIsMobile ? 'p-4 flex-1' : 'p-6 sm:p-8 max-h-[70vh]'}`}>
          {filteredAndSortedProjects.length > 0 ? (
            <div className={`grid gap-6 ${actualIsMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}>
              {filteredAndSortedProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-4">No projects found</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Try adjusting your search criteria or create a new project
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
