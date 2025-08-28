import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useResponsive from '../hooks/useResponsive';

const ProjectDetailModal = ({ project, onClose, onSave, onUnsave, onStartProject, onViewProfile, isSaved = false, isMobile = false, isTablet = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { theme } = useTheme();
  const { isMobile: responsiveIsMobile } = useResponsive();
  
  const actualIsMobile = isMobile || responsiveIsMobile;

  if (!project) return null;

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30 border-green-200 dark:border-green-700/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700/30';
      case 'Hard': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700/30';
      case 'Expert': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30 border-red-200 dark:border-red-700/30';
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700/30';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-gradient-to-r from-emerald-400 to-emerald-600';
      case 'Active': return 'bg-gradient-to-r from-blue-500 to-purple-600';
      case 'Planning': return 'bg-gradient-to-r from-amber-400 to-orange-500';
      case 'In Progress': return 'bg-gradient-to-r from-purple-500 to-pink-600';
      case 'Completed': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'progress', label: 'Progress', icon: '📊' },
    { id: 'resources', label: 'Resources', icon: '🔗' }
  ];

  const mockTeamMembers = [
    {
      id: 1,
      ...project.creator,
      role: 'Project Creator',
      contribution: 'Project Architecture & Backend Development',
      joinedDate: '2024-01-05',
      status: 'active',
      githubProfile: 'https://github.com/creator-username'
    },
    ...(project.participants || []).map((participant, index) => ({
      id: index + 2,
      ...participant,
      role: index === 0 ? 'Lead Developer' : 'Developer',
      contribution: index === 0 ? 'Frontend Development' : 'Testing & Documentation',
      joinedDate: `2024-01-${10 + index}`,
      status: 'active',
      githubProfile: `https://github.com/${participant.name.toLowerCase().replace(' ', '-')}`
    }))
  ];

  const mockProgress = {
    overallProgress: 65,
    milestones: [
      { id: 1, title: 'Project Setup', completed: true, date: '2024-01-05', assignee: 'Alice Smith' },
      { id: 2, title: 'UI/UX Design', completed: true, date: '2024-01-12', assignee: 'John Doe' },
      { id: 3, title: 'Backend API', completed: true, date: '2024-01-20', assignee: 'Alice Smith' },
      { id: 4, title: 'Frontend Development', completed: false, date: '2024-01-28', assignee: 'John Doe' },
      { id: 5, title: 'Testing & Deployment', completed: false, date: '2024-02-05', assignee: 'Team' }
    ],
    recentActivity: [
      { id: 1, user: 'Alice Smith', action: 'completed milestone', target: 'Backend API', time: '2 hours ago' },
      { id: 2, user: 'John Doe', action: 'updated', target: 'Frontend components', time: '1 day ago' },
      { id: 3, user: 'Alice Smith', action: 'committed to', target: 'GitHub repository', time: '2 days ago' }
    ]
  };

  const mockResources = {
    githubRepo: 'https://github.com/project-hub/ai-recipe-generator',
    documentation: 'https://docs.project-hub.com/ai-recipe-generator',
    designFiles: 'https://figma.com/ai-recipe-generator',
    apiDocs: 'https://api.project-hub.com/docs',
    techStack: ['React', 'Node.js', 'TensorFlow', 'MongoDB', 'Express', 'Docker']
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
            ? 'w-full max-w-5xl max-h-[95vh] rounded-2xl'
            : 'max-w-6xl w-full max-h-[90vh] rounded-3xl'
        }
        overflow-hidden flex flex-col
      `}>
        {/* Header */}
        <div className={`
          relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 
          dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 
          border-b border-slate-200/60 dark:border-slate-700/50 flex-shrink-0
          ${actualIsMobile ? 'p-4 pt-6' : 'p-6 sm:p-8'}
        `}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white ${getStatusColor(project.status)} shadow-lg`}>
                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  {project.status}
                </div>
                <div className={`px-3 py-1 rounded-xl text-sm font-bold border ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </div>
                <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">{project.estimatedTime}</span>
                </div>
              </div>
              
              <h2 className={`
                font-black text-slate-900 dark:text-slate-100 mb-3 leading-tight
                ${actualIsMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}
              `}>
                {project.title}
              </h2>
              
              <p className={`text-slate-600 dark:text-slate-400 leading-relaxed ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                {project.overview}
              </p>
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

          {/* Tabs */}
          <div className="flex space-x-1 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300
                  ${actualIsMobile ? 'text-xs' : 'text-sm'}
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/50'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span className={actualIsMobile ? 'hidden xs:inline' : ''}>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              {/* Creator Section */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Project Creator
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={project.creator.avatar} 
                      alt={project.creator.name}
                      className={`rounded-2xl border-2 border-white dark:border-slate-700 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200 ${actualIsMobile ? 'w-12 h-12' : 'w-16 h-16'}`}
                      onClick={() => onViewProfile(project.creator)}
                    />
                    <div className={`
                      absolute -bottom-1 -right-1 bg-gradient-to-br from-blue-500 to-purple-600 
                      text-white rounded-full flex items-center justify-center font-bold shadow-lg
                      ${actualIsMobile ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}
                    `}>
                      {project.creator.level}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 
                      className={`font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${actualIsMobile ? 'text-base' : 'text-lg'}`}
                      onClick={() => onViewProfile(project.creator)}
                    >
                      {project.creator.name}
                    </h4>
                    <p className={`text-slate-600 dark:text-slate-400 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      {project.creator.reputation} reputation points
                    </p>
                    <div className={`flex items-center space-x-4 mt-2 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      <span className="text-slate-500 dark:text-slate-400">Level {project.creator.level}</span>
                      <span className="text-slate-500 dark:text-slate-400">•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Project Creator</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Project Description
                </h3>
                <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Technologies & Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`
                        bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 
                        text-blue-700 dark:text-blue-300 rounded-xl font-semibold border border-blue-200/50 
                        dark:border-blue-700/50 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/40 
                        dark:hover:to-indigo-800/40 transition-colors duration-300
                        ${actualIsMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
                      `}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Team Members ({mockTeamMembers.length})
                </h3>
                <div className="space-y-4">
                  {mockTeamMembers.map((member) => (
                    <div key={member.id} className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-600/30">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className={`rounded-xl border-2 border-white dark:border-slate-700 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200 ${actualIsMobile ? 'w-10 h-10' : 'w-12 h-12'}`}
                          onClick={() => onViewProfile(member)}
                        />
                        <div className={`
                          absolute -bottom-1 -right-1 bg-gradient-to-br from-emerald-400 to-emerald-600 
                          text-white rounded-full flex items-center justify-center font-bold shadow-lg
                          ${actualIsMobile ? 'w-5 h-5 text-xs' : 'w-6 h-6 text-xs'}
                        `}>
                          {member.level}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 
                            className={`font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}
                            onClick={() => onViewProfile(member)}
                          >
                            {member.name}
                          </h4>
                          <span className={`px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold`}>
                            {member.role}
                          </span>
                        </div>
                        <p className={`text-slate-600 dark:text-slate-400 mb-2 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          {member.contribution}
                        </p>
                        <div className={`flex items-center space-x-4 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          <span className="text-slate-500 dark:text-slate-400">Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                          <a 
                            href={member.githubProfile} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                            <span>GitHub</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              {/* Overall Progress */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Overall Progress
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-slate-700 dark:text-slate-300 font-semibold ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                    Project Completion
                  </span>
                  <span className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                    {mockProgress.overallProgress}%
                  </span>
                </div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg transition-all duration-1000 ease-out relative"
                    style={{width: `${mockProgress.overallProgress}%`}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Project Milestones
                </h3>
                <div className="space-y-4">
                  {mockProgress.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center space-x-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-600/30">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                        ${milestone.completed 
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' 
                          : 'bg-slate-200 dark:bg-slate-600'
                        }
                      `}>
                        {milestone.completed && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-slate-800 dark:text-slate-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                          {milestone.title}
                        </h4>
                        <div className={`flex items-center space-x-4 mt-1 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          <span className="text-slate-500 dark:text-slate-400">
                            {milestone.completed ? 'Completed' : 'Due'} {new Date(milestone.date).toLocaleDateString()}
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">•</span>
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {milestone.assignee}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {mockProgress.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className={`text-slate-700 dark:text-slate-300 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className={`text-slate-500 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              {/* GitHub Repository */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  GitHub Repository
                </h3>
                <a 
                  href={mockResources.githubRepo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className={`font-bold ${actualIsMobile ? 'text-base' : 'text-lg'}`}>View Source Code</h4>
                    <p className={`text-gray-300 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      {mockResources.githubRepo.split('/').slice(-1)[0]}
                    </p>
                  </div>
                  <svg className="w-5 h-5 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Tech Stack */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Technology Stack
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mockResources.techStack.map((tech, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl border border-blue-200/50 dark:border-blue-700/30"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className={`font-semibold text-blue-700 dark:text-blue-300 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Resources */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Additional Resources
                </h3>
                <div className="space-y-3">
                  <a 
                    href={mockResources.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-slate-800 dark:text-slate-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        Documentation
                      </h4>
                      <p className={`text-slate-600 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                        Project documentation and guides
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  <a 
                    href={mockResources.designFiles}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl hover:bg-white/70 dark:hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4.586a1 1 0 00.707-.293l8.5-8.5a1 1 0 00-1.414-1.414L11 15.172V11.414a1 1 0 00-.293-.707L7 7.707V17z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-slate-800 dark:text-slate-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        Design Files
                      </h4>
                      <p className={`text-slate-600 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                        UI/UX designs and prototypes
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`
          bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-700/80 
          backdrop-blur-xl border-t border-slate-200/60 dark:border-slate-700/50 flex-shrink-0
          ${actualIsMobile ? 'p-4' : 'p-6'}
        `}>
          <div className={`flex gap-3 ${actualIsMobile ? 'flex-col' : ''}`}>
            {isSaved ? (
              <>
                <button
                  onClick={() => onStartProject(project)}
                  className={`
                    flex-1 bg-gradient-to-r from-blue-600 to-purple-600 
                    hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl 
                    transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                    focus-visible:focus group
                    ${actualIsMobile ? 'py-3 px-4' : 'py-4 px-6'}
                  `}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Start Project</span>
                  </span>
                </button>
                <button
                  onClick={() => onUnsave(project)}
                  className={`
                    border-2 border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 
                    font-semibold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 
                    hover:border-red-400 dark:hover:border-red-500 transition-all duration-300 
                    focus-visible:focus group
                    ${actualIsMobile ? 'py-3 px-4' : 'py-4 px-6'}
                  `}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>Unsave</span>
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onStartProject(project)}
                  className={`
                    flex-1 bg-gradient-to-r from-blue-600 to-purple-600 
                    hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl 
                    transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                    focus-visible:focus group
                    ${actualIsMobile ? 'py-3 px-4' : 'py-4 px-6'}
                  `}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Start Building</span>
                  </span>
                </button>
                <button
                  onClick={() => onSave(project)}
                  className={`
                    border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 
                    font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 
                    hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 
                    focus-visible:focus group
                    ${actualIsMobile ? 'py-3 px-4' : 'py-4 px-6'}
                  `}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>Save</span>
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

export default ProjectDetailModal;
