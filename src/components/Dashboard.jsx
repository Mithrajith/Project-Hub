import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useResponsive from '../hooks/useResponsive';
import FullLeaderboard from './FullLeaderboard';
import ProjectIdeaCards from './ProjectIdeaCards_Simple';
import MyProjects from './MyProjects';
import ProjectDetailModal from './ProjectDetailModal';
import UserProfileModal from './UserProfileModal';
import ProfileEditModal from './ProfileEditModal';

// Mock data for demonstration
const mockUser = {
  name: "John Doe",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  points: 215,
  badges: ["💡 Idea Master", "⚙️ Project Pro"],
  rank: "Innovator",
  level: 12,
  progress: 75
};

const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Recipe Generator",
    owner: { name: "Alice Smith", avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    tags: ["ML", "Web", "API"],
    status: "New",
    statusColor: "bg-gradient-to-r from-emerald-400 to-emerald-600",
    likes: 42,
    difficulty: "Medium",
    description: "Create an AI system that generates personalized recipes based on dietary preferences, available ingredients, and cooking time constraints.",
    estimatedTime: "3-4 weeks"
  },
  {
    id: 2,
    title: "Smart Home IoT Dashboard",
    owner: { name: "Bob Johnson", avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    tags: ["IoT", "Full Stack", "Mobile"],
    status: "Popular",
    statusColor: "bg-gradient-to-r from-blue-500 to-purple-600",
    likes: 128,
    difficulty: "Hard",
    description: "Build a comprehensive dashboard to monitor and control all smart home devices with real-time analytics and automation rules.",
    estimatedTime: "6-8 weeks"
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    owner: { name: "Carol Davis", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    tags: ["Blockchain", "Security", "Web3"],
    status: "In Progress",
    statusColor: "bg-gradient-to-r from-amber-400 to-orange-500",
    likes: 89,
    difficulty: "Expert",
    description: "Develop a secure, transparent voting system using blockchain technology to ensure election integrity and voter privacy.",
    estimatedTime: "8-12 weeks"
  },
  {
    id: 4,
    title: "Mental Health Chatbot",
    owner: { name: "David Wilson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    tags: ["AI", "Health", "NLP"],
    status: "Completed",
    statusColor: "bg-gradient-to-r from-gray-400 to-gray-600",
    likes: 76,
    difficulty: "Medium",
    description: "AI-powered chatbot that provides mental health support, mood tracking, and connects users with professional resources.",
    estimatedTime: "4-6 weeks"
  }
];

const mockLeaderboard = [
  { name: "Alice Smith", points: 450, avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 1, badge: "🏆" },
  { name: "John Doe", points: 215, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w256&h=256&q=80", rank: 2, badge: "🥈" },
  { name: "Bob Johnson", points: 180, avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 3, badge: "🥉" },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showProjectIdeas, setShowProjectIdeas] = useState(false);
  const [showMyProjects, setShowMyProjects] = useState(false);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [savedProjects, setSavedProjects] = useState([]);
  const [isProjectSaved, setIsProjectSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { isMobile, isTablet, isSmallScreen } = useResponsive();

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && isMobile) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen, isMobile]);

  // Handle escape key for modals
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        if (showModal) {
          setShowModal(false);
          setSelectedProject(null);
        }
        if (showPostModal) setShowPostModal(false);
        if (showLeaderboard) setShowLeaderboard(false);
        if (showProjectIdeas) setShowProjectIdeas(false);
        if (showMyProjects) setShowMyProjects(false);
        if (showProjectDetail) setShowProjectDetail(false);
        if (showUserProfile) setShowUserProfile(false);
        if (showProfileEdit) setShowProfileEdit(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showModal, showPostModal, showLeaderboard, showProjectIdeas, showMyProjects, showProjectDetail, showUserProfile, showProfileEdit]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Hard': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/30';
      case 'Expert': return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800/30';
    }
  };

  const ProjectCard = ({ project, onClick, isMobile = false, isTablet = false, isRecommended = false }) => (
    <div 
      className={`group relative overflow-hidden glass-card rounded-2xl shadow-card dark:shadow-dark-card hover:shadow-premium dark:hover:shadow-premium transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${
        !isMobile ? 'hover:rotate-1' : ''
      } ${
        isRecommended ? 'ring-2 ring-yellow-400/50 dark:ring-yellow-400/30 bg-gradient-to-br from-yellow-50/50 to-orange-50/30 dark:from-yellow-900/20 dark:to-orange-900/20' : ''
      } animate-fade-in-up border border-white/20 dark:border-slate-700/50`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
    >
      {isRecommended && (
        <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-lg shadow-lg animate-pulse">
          ✨ Recommended
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
              {project.title}
            </h3>
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white ${project.statusColor} shadow-lg`}>
              <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span>
              {project.status}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <img 
              src={project.owner.avatar} 
              alt={project.owner.name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full ring-2 ring-white dark:ring-slate-700 shadow-md flex-shrink-0"
              loading="lazy"
            />
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 truncate">{project.owner.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{project.estimatedTime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{project.likes}</span>
            </div>
            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
              {project.difficulty}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.slice(0, isMobile ? 2 : 3).map((tag, index) => (
            <span key={index} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-700 dark:text-blue-300 rounded-lg sm:rounded-xl text-xs font-semibold border border-blue-200/50 dark:border-blue-700/50 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 transition-colors duration-300">
              #{tag}
            </span>
          ))}
          {project.tags.length > (isMobile ? 2 : 3) && (
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-medium">
              +{project.tags.length - (isMobile ? 2 : 3)}
            </span>
          )}
        </div>
      </div>
      
      {/* Hover effect border - disabled on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/20 dark:ring-blue-400/20 ring-offset-2 ring-offset-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );

  const ProjectModal = ({ project, onClose, isMobile = false, isTablet = false }) => {
    if (!project) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in-up safe-area-inset"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className={`
          glass border border-white/20 dark:border-slate-700/50 shadow-premium
          ${isMobile 
            ? 'w-full h-full max-h-screen rounded-none' 
            : isTablet 
              ? 'w-full max-w-2xl max-h-[90vh] rounded-2xl'
              : 'max-w-3xl w-full max-h-[85vh] rounded-3xl'
          }
          overflow-hidden
        `}>
          {/* Header with gradient */}
          <div className={`
            relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800/50 dark:via-blue-900/30 dark:to-purple-900/30 
            border-b border-slate-200/60 dark:border-slate-700/50
            ${isMobile ? 'p-4 pt-6' : 'p-6 sm:p-8'}
          `}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h2 className={`
                  font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-3
                  ${isMobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}
                `}>
                  {project.title}
                </h2>
                
                <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center space-x-4'} mb-4`}>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={project.owner.avatar} 
                      alt={project.owner.name}
                      className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full ring-2 ring-white dark:ring-slate-600 shadow-lg`}
                    />
                    <div>
                      <p className={`font-semibold text-slate-800 dark:text-slate-200 ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {project.owner.name}
                      </p>
                      <p className={`text-slate-600 dark:text-slate-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        Project Creator
                      </p>
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center rounded-full text-white font-bold shadow-lg ${project.statusColor}
                    ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
                  `}>
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    {project.status}
                  </div>
                </div>
                
                <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center space-x-4'} text-sm`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{project.likes} likes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-slate-600 dark:text-slate-400">{project.estimatedTime}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/50 rounded-full transition-all duration-200 focus-visible:focus ml-2 flex-shrink-0"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className={`overflow-y-auto ${isMobile ? 'p-4' : 'p-6 sm:p-8'} ${isMobile ? 'flex-1' : 'max-h-[60vh]'}`}>
            <div className="mb-6">
              <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-3 ${isMobile ? 'text-base' : 'text-lg'}`}>
                Project Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className={`
                      bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 
                      text-blue-700 dark:text-blue-300 rounded-xl font-semibold 
                      border border-blue-200/50 dark:border-blue-700/50 
                      hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 
                      transition-colors duration-300
                      ${isMobile ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}
                    `}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-3 ${isMobile ? 'text-base' : 'text-lg'}`}>
                Description
              </h3>
              <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${isMobile ? 'text-sm' : 'text-base sm:text-lg'}`}>
                {project.description}
              </p>
            </div>
            
            <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'gap-4'}`}>
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus-visible:focus py-3 sm:py-4 px-4 sm:px-6">
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className={isMobile ? 'text-sm' : 'text-base'}>Start Building</span>
                </span>
              </button>
              <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 focus-visible:focus py-3 sm:py-4 px-4 sm:px-6">
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span className={isMobile ? 'text-sm' : 'text-base'}>Save</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PostIdeaModal = ({ onClose, isMobile = false, isTablet = false }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [difficulty, setDifficulty] = useState('Medium');
    
    const availableTags = ['ML', 'Web', 'Mobile', 'IoT', 'Blockchain', 'AI', 'Full Stack', 'Data Science', 'Security', 'API', 'DevOps', 'Cloud'];
    
    return (
      <div 
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 animate-fade-in-up safe-area-inset"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className={`
          glass border border-white/20 dark:border-slate-700/50 shadow-premium
          ${isMobile 
            ? 'w-full h-full max-h-screen rounded-none' 
            : isTablet 
              ? 'w-full max-w-2xl max-h-[95vh] rounded-2xl'
              : 'max-w-3xl w-full max-h-[90vh] rounded-3xl'
          }
          overflow-hidden
        `}>
          {/* Header */}
          <div className={`
            relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 
            border-b border-slate-200/60 dark:border-slate-700/50
            ${isMobile ? 'p-4 pt-6' : 'p-6 sm:p-8'}
          `}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h2 className={`
                  font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent
                  ${isMobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}
                `}>
                  Post New Idea
                </h2>
                <p className={`text-slate-600 dark:text-slate-400 mt-1 ${isMobile ? 'text-sm' : 'text-base'}`}>
                  Share your innovative project idea with the community
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/50 rounded-full transition-all duration-200 focus-visible:focus ml-2 flex-shrink-0"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className={`overflow-y-auto space-y-4 sm:space-y-6 ${isMobile ? 'p-4 flex-1' : 'p-6 sm:p-8 max-h-[70vh]'}`}>
            <div>
              <label className={`block font-bold text-slate-800 dark:text-slate-200 mb-3 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                Project Title *
              </label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`
                  w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl 
                  focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 
                  focus:border-blue-500 dark:focus:border-blue-400 
                  transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500
                  glass text-slate-900 dark:text-slate-100
                  ${isMobile ? 'px-4 py-3 text-base' : 'px-4 py-4 text-lg'}
                `}
                placeholder="Enter an exciting project title..."
              />
            </div>
            
            <div>
              <label className={`block font-bold text-slate-800 dark:text-slate-200 mb-3 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                Description *
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={isMobile ? 4 : 5}
                className={`
                  w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl 
                  focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 
                  focus:border-blue-500 dark:focus:border-blue-400 
                  transition-all duration-200 placeholder-slate-400 dark:placeholder-slate-500 
                  resize-none glass text-slate-900 dark:text-slate-100
                  ${isMobile ? 'px-4 py-3 text-base' : 'px-4 py-4 text-lg'}
                `}
                placeholder="Describe your project idea in detail. What problem does it solve? What technologies would be used?"
              />
            </div>

            <div>
              <label className={`block font-bold text-slate-800 dark:text-slate-200 mb-3 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                Difficulty Level
              </label>
              <div className={`grid gap-2 sm:gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                {['Easy', 'Medium', 'Hard', 'Expert'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`
                      rounded-xl font-semibold transition-all duration-300 focus-visible:focus
                      ${isMobile ? 'p-2.5 text-sm' : 'p-3 text-base'}
                      ${difficulty === level 
                        ? getDifficultyColor(level) + ' ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-current'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className={`block font-bold text-slate-800 dark:text-slate-200 mb-3 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                Tags (Select up to 5)
              </label>
              <div className={`grid gap-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-3 sm:grid-cols-4'}`}>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : prev.length < 5 ? [...prev, tag] : prev
                      );
                    }}
                    disabled={selectedTags.length >= 5 && !selectedTags.includes(tag)}
                    className={`
                      rounded-xl font-semibold transition-all duration-300 focus-visible:focus
                      ${isMobile ? 'p-2.5 text-xs' : 'p-3 text-sm'}
                      ${selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white shadow-lg'
                        : selectedTags.length >= 5
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-700 dark:hover:text-blue-300'
                      }
                    `}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              <p className={`text-slate-500 dark:text-slate-400 mt-2 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                {selectedTags.length}/5 tags selected
              </p>
            </div>
            
            <div className={`flex gap-3 sm:gap-4 pt-4 ${isMobile ? 'flex-col-reverse' : ''}`}>
              <button 
                onClick={() => {
                  // Handle form submission here
                  onClose();
                }}
                disabled={!title.trim() || !description.trim() || selectedTags.length === 0}
                className={`
                  bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 
                  hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 
                  text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl 
                  transform hover:-translate-y-1 focus-visible:focus
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  ${isMobile ? 'flex-1 py-3 px-4' : 'flex-1 py-4 px-6'}
                `}
              >
                <span className="flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className={isMobile ? 'text-sm' : 'text-base'}>Post Idea</span>
                </span>
              </button>
              <button 
                onClick={onClose}
                className={`
                  border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 
                  font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 
                  hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 focus-visible:focus
                  ${isMobile ? 'py-3 px-4' : 'px-6 py-4'}
                `}
              >
                <span className={isMobile ? 'text-sm' : 'text-base'}>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handler functions for new modals
  const handleViewProject = (project, isSaved = false) => {
    setCurrentProject(project);
    setIsProjectSaved(isSaved);
    setShowProjectDetail(true);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleEditProfile = () => {
    setShowUserProfile(false);
    setShowProfileEdit(true);
  };

  const handleSaveProject = (project) => {
    setSavedProjects(prev => [...prev, project]);
    setShowProjectDetail(false);
  };

  const handleUnsaveProject = (project) => {
    setSavedProjects(prev => prev.filter(p => p.id !== project.id));
    if (showProjectDetail) {
      setShowProjectDetail(false);
    }
  };

  const handleStartProject = (project) => {
    // Move project from saved to in progress
    setSavedProjects(prev => prev.filter(p => p.id !== project.id));
    setShowProjectDetail(false);
    // You would typically add this to the user's active projects here
    console.log('Starting project:', project.title);
  };

  const handleSaveProfile = (updatedUser) => {
    // Update user profile logic here
    setSelectedUser(updatedUser);
    setShowProfileEdit(false);
    setShowUserProfile(true);
  };

  const filteredProjects = mockProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 glass backdrop-blur-2xl border-b border-white/20 dark:border-slate-700/50 shadow-sm safe-area-inset">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo and Menu Button */}
            <div className="flex items-center space-x-3">
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 focus-visible:focus rounded-lg"
                  aria-label="Toggle sidebar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
              
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 dark:from-slate-200 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Project Hub
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 hidden lg:block">Where ideas meet makers</p>
              </div>
            </div>
            
            {/* Search Bar - Hidden on small mobile, shown on larger screens */}
            <div className={`flex-1 max-w-2xl mx-4 sm:mx-8 ${isMobile ? 'hidden' : 'block'}`}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-slate-200/60 dark:border-slate-700/60 rounded-2xl leading-5 glass placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-slate-400 dark:focus:placeholder-slate-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 text-slate-900 dark:text-slate-100 font-medium"
                  placeholder="Search for amazing project ideas..."
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 focus-visible:focus"
                    aria-label="Clear search"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Right side buttons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Search Button */}
              {isMobile && (
                <button 
                  className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 focus-visible:focus rounded-lg"
                  aria-label="Search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 focus-visible:focus rounded-lg transition-colors duration-200"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
              
              {/* Post Idea Button */}
              <button 
                onClick={() => setShowPostModal(true)}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-bold px-4 py-2 sm:px-8 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus-visible:focus disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
                aria-label="Post new project idea"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="hidden sm:inline">Post Idea</span>
                  <span className="sm:hidden">Post</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Expandable */}
      {isMobile && (
        <div className="sticky top-16 z-40 glass backdrop-blur-2xl border-b border-white/20 dark:border-slate-700/50 px-4 pb-4 sm:hidden">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 border-2 border-slate-200/60 dark:border-slate-700/60 rounded-2xl leading-5 glass placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:placeholder-slate-400 dark:focus:placeholder-slate-500 focus:ring-4 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 text-slate-900 dark:text-slate-100 font-medium text-base"
              placeholder="Search projects..."
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 focus-visible:focus"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Ultra-Elegant Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-80 backdrop-blur-3xl bg-white/10 dark:bg-slate-900/20 
        border-r border-gradient-to-b from-white/30 via-white/10 to-transparent dark:from-slate-700/50 dark:via-slate-800/30 dark:to-transparent 
        z-40 transform transition-all duration-500 ease-out shadow-2xl
        ${sidebarOpen || !isMobile ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        ${isMobile ? 'top-32' : 'top-16'}
        before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/20 before:via-purple-50/10 before:to-pink-50/5 dark:before:from-slate-800/30 dark:before:via-slate-700/20 dark:before:to-slate-600/10 before:backdrop-blur-xl before:rounded-r-3xl before:-z-10
      `}>
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-blue-50/20 dark:from-transparent dark:via-slate-800/10 dark:to-slate-700/20 rounded-r-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-tr-3xl"></div>
        
        <div className="relative p-8 h-full overflow-y-auto scrollbar-hide">
          {/* Premium User Profile */}
          <div className="mb-10">
            {/* Profile Header */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 p-1 rounded-3xl shadow-2xl ring-1 ring-white/20">
                  <img 
                    src={mockUser.avatar} 
                    alt={mockUser.name}
                    className="w-24 h-24 rounded-3xl shadow-inner object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                {mockUser.name}
              </h3>
              
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 rounded-2xl border border-blue-200/30 dark:border-blue-400/20 backdrop-blur-sm mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">Level {mockUser.level}</span>
                <span className="mx-2 text-slate-400">•</span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{mockUser.rank}</span>
              </div>

              {/* Experience Progress */}
              <div className="relative mb-6">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 flex justify-between">
                  <span>Progress to next level</span>
                  <span className="text-blue-600 dark:text-blue-400">{mockUser.progress}%</span>
                </div>
                <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg transition-all duration-1000 ease-out relative"
                    style={{width: `${mockUser.progress}%`}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                    <div className="absolute right-0 top-0 w-2 h-full bg-white/40 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Points Showcase */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-sm"></div>
                <div className="relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-700/90 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-slate-600/30 shadow-xl">
                  <div className="text-4xl font-black bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 tracking-tight">
                    {mockUser.points.toLocaleString()}
                  </div>
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Total Points</div>
                </div>
              </div>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-white/30 dark:border-slate-600/20 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-1">12</div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Projects</div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-white/30 dark:border-slate-600/20 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mb-1">8</div>
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Completed</div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant Navigation */}
          <nav className="mb-8">
            <div className="space-y-3">
              <button className="w-full group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-4 px-6 py-4 text-left bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-600/20 shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Dashboard</span>
                </div>
              </button>
              
              <button 
                onClick={() => setShowMyProjects(true)}
                className="w-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-4 px-6 py-4 text-left bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-600/20 shadow-md group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">My Projects</span>
                </div>
              </button>
              
              <button 
                onClick={() => setShowProjectIdeas(true)}
                className="w-full group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center space-x-4 px-6 py-4 text-left bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-600/20 shadow-md group-hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">Explore Ideas</span>
                </div>
              </button>
            </div>
          </nav>

          {/* Elite Contributors Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-red-500/5 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-3xl p-6 border border-white/30 dark:border-slate-600/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-black bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  Elite Builders
                </h4>
                <div className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full">
                  <span className="text-xs font-black text-yellow-700 dark:text-yellow-400 uppercase tracking-widest">Top 3</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockLeaderboard.slice(0, 3).map((user, index) => (
                  <div key={user.name} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    <div className="relative flex items-center space-x-4 p-4 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-600/20 shadow-md group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-2xl overflow-hidden shadow-lg ring-3 ${
                          index === 0 ? 'ring-yellow-400' : index === 1 ? 'ring-gray-400' : 'ring-orange-400'
                        } group-hover:scale-110 transition-transform duration-300`}>
                          <img 
                            src={user.avatar} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                          index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                          'bg-gradient-to-br from-orange-400 to-orange-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 truncate mb-1">{user.name}</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{user.points}</span>
                          </div>
                          <span className="text-xs text-slate-400">pts</span>
                        </div>
                      </div>
                      <div className="text-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                        {user.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setShowLeaderboard(true)}
                className="w-full mt-6 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl"></div>
                <div className="relative flex items-center justify-center space-x-2 py-4 px-6 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-white/30 dark:border-slate-600/20 shadow-md group-hover:shadow-lg group-hover:scale-[1.02] transition-all duration-300">
                  <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">View Full Leaderboard</span>
                  <svg className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Revolutionary Main Content Area */}
      <div className={`transition-all duration-500 ease-out ${sidebarOpen || !isMobile ? 'ml-80' : 'ml-0'}`}>
        {/* Stunning Background Pattern */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-emerald-400/15 via-cyan-400/10 to-blue-400/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-violet-400/10 via-fuchsia-400/5 to-transparent rounded-full blur-2xl animate-bounce-gentle"></div>
        </div>

        {/* Premium Content Container */}
        <main className="relative z-10 px-6 sm:px-8 lg:px-12 py-8 sm:py-12 min-h-screen">
          {/* Epic Welcome Hero Section */}
          <section className="mb-16">
            <div className="relative group">
              {/* Hero Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/40 backdrop-blur-2xl rounded-[2.5rem] p-10 sm:p-12 lg:p-16 border border-white/30 dark:border-slate-700/30 shadow-elegant group-hover:shadow-ethereal transition-all duration-500">
                
                {/* Welcome Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-8 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-6 animate-fade-in-up">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-xl animate-float overflow-hidden relative group">
                        <img 
                          src={mockUser.avatar} 
                          alt={mockUser.name}
                          className="w-full h-full rounded-[1.25rem] object-cover shadow-inner transform transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center animate-pulse-glow">
                          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                        </div>
                      </div>
                      <div className="animate-slide-in-right">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 transform transition-all duration-300 hover:scale-105">
                          <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent animate-fade-in-up">
                            Welcome back,
                          </span>
                        </h1>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black group">
                          <span className="relative overflow-hidden">
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-black relative z-10 transition-all duration-300 group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-blue-600">
                              {mockUser.name}! 
                            </span>
                          </span>
                          <span className="text-4xl ml-3 inline-block animate-bounce-gentle transform transition-transform duration-300 hover:scale-125 hover:rotate-12">🚀</span>
                        </h2>
                        <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 mt-4 font-medium leading-relaxed animate-fade-in-up opacity-0 animation-delay-300 group">
                          Ready to build something <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent font-bold transition-all duration-300 hover:from-cyan-600 hover:to-emerald-600">extraordinary</span> today?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Premium Stats Card */}
                  <div className="lg:ml-12">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-700/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-slate-600/30 shadow-elegant">
                        <div className="text-center">
                          <div className="relative group/points">
                            <div className="text-6xl font-black bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 tracking-tight animate-pulse-glow transform transition-all duration-500 hover:scale-110">
                              <span className="inline-block animate-bounce-gentle animation-delay-150">{mockUser.points.toString().charAt(0)}</span>
                              <span className="inline-block animate-bounce-gentle animation-delay-300">{mockUser.points.toString().charAt(1)}</span>
                              <span className="inline-block animate-bounce-gentle animation-delay-500">{mockUser.points.toString().charAt(2)}</span>
                            </div>
                            <div className="absolute inset-0 animate-pulse-glow opacity-30"></div>
                          </div>
                          <div className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-[0.2em] mb-4 animate-fade-in-up animation-delay-500">
                            <span className="relative">
                              Total Points
                            </span>
                          </div>
                          <div className="flex items-center justify-center space-x-6">
                            <div className="text-center">
                              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">12</div>
                              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Projects</div>
                            </div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                            <div className="text-center">
                              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{mockUser.level}</div>
                              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Level</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
                  <button 
                    onClick={() => setShowPostModal(true)}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-elegant hover:shadow-ethereal transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>Share New Idea</span>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => {
                      console.log('Explore Projects button clicked');
                      setShowProjectIdeas(true);
                      console.log('showProjectIdeas state should now be true');
                    }}
                    className="group flex items-center space-x-3 px-8 py-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm text-slate-700 dark:text-slate-300 rounded-2xl border border-white/30 dark:border-slate-600/30 font-bold text-lg hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Explore Projects</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Spectacular Top Recommendations */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-10">
              <div className="group">
                <h2 className="text-4xl sm:text-5xl font-black mb-3">
                  <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mr-4 group-hover:animate-bounce-gentle">✨</span>
                  <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Top Picks for You
                  </span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
                  Handcrafted recommendations based on your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">interests</span>
                </p>
              </div>
              
              <button className="group hidden sm:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-2xl border border-blue-200 dark:border-blue-700/30 font-bold hover:shadow-lg hover:scale-105 transition-all duration-300">
                <span>View All</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            
            {/* Revolutionary Project Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.slice(0, 4).map((project, index) => (
                <div key={`rec-${project.id}`} className="group relative animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
                  {/* Card Background Magic */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  
                  <div className="relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-slate-800/90 dark:via-slate-800/70 dark:to-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/40 dark:border-slate-700/40 shadow-elegant hover:shadow-ethereal transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
                       onClick={() => {
                         setSelectedProject(project);
                         setShowModal(true);
                       }}>
                    
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-widest ${
                            project.status === 'New' 
                              ? 'bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/30'
                              : 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/30'
                          }`}>
                            {project.status}
                          </div>
                          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-semibold">{project.estimatedTime}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Project Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold border border-slate-200/50 dark:border-slate-600/50 hover:scale-105 transition-transform duration-200">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Project Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={project.owner.avatar} 
                            alt={project.owner.name}
                            className="w-8 h-8 rounded-xl border-2 border-white dark:border-slate-700 shadow-md"
                          />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{project.owner.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-rose-500 group-hover:text-rose-600 transition-colors duration-200">
                          <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-bold">{project.likes}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-xl text-sm font-bold ${
                          project.difficulty === 'Easy' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700/30'
                            : project.difficulty === 'Medium'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700/30'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700/30'
                        }`}>
                          {project.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Magnificent All Projects Section */}
          <section>
            {/* Spectacular Section Header */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white/70 via-white/50 to-white/30 dark:from-slate-800/70 dark:via-slate-800/50 dark:to-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
                  <div className="flex-1">
                    <h2 className="text-4xl sm:text-5xl font-black mb-3">
                      <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mr-3">
                        Explore All Projects
                      </span>
                      <span className="text-3xl animate-bounce-gentle">🌟</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
                      Discover <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">{filteredProjects.length}</span> amazing project ideas waiting to be built
                    </p>
                  </div>
                  
                  {/* Premium Filter Controls */}
                  <div className="flex items-center space-x-3">
                    <button className="group p-4 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-slate-600/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105" title="Advanced Filters">
                      <svg className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                      </svg>
                    </button>
                    <button className="group p-4 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-700/60 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-slate-600/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105" title="Sort Options">
                      <svg className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Revolutionary Category Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-12">
              <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold text-base shadow-elegant hover:shadow-ethereal transition-all duration-300 transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>All Projects</span>
                </div>
              </button>
              
              {['Web Development', 'Mobile Apps', 'AI/ML', 'Blockchain', 'Data Science', 'IoT'].map((category, index) => (
                <button key={category} className="group relative px-6 py-3 bg-gradient-to-br from-white/70 to-white/50 dark:from-slate-800/70 dark:to-slate-700/50 backdrop-blur-sm text-slate-700 dark:text-slate-300 rounded-2xl border border-white/40 dark:border-slate-600/30 font-bold text-base hover:shadow-lg hover:scale-105 transition-all duration-300"
                        style={{animationDelay: `${index * 100}ms`}}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  <span className="relative group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">{category}</span>
                </button>
              ))}
            </div>

            {/* Spectacular Projects Grid */}
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl animate-pulse-slow"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-spin">
                    <div className="absolute inset-2 bg-white dark:bg-slate-900 rounded-full"></div>
                  </div>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-slate-50/30 dark:from-slate-800/50 dark:to-slate-700/30 rounded-[2.5rem] blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative text-center py-24 bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-slate-700/40 shadow-elegant">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-4">No projects found</h3>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                    Ready to be the first? Share your brilliant idea and inspire others to build amazing things!
                  </p>
                  <button 
                    onClick={() => setShowPostModal(true)}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-elegant hover:shadow-ethereal transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-3">
                      <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      <span>Share Your First Idea</span>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
                {filteredProjects.slice(4).map((project, index) => (
                  <div key={project.id} className="group relative animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                    {/* Stunning Card Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-lg group-hover:blur-xl group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
                    
                    <div className="relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-slate-800/90 dark:via-slate-800/70 dark:to-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant hover:shadow-ethereal transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
                         onClick={() => {
                           setSelectedProject(project);
                           setShowModal(true);
                         }}>
                      
                      {/* Project Status & Time */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`px-3 py-1 rounded-2xl text-xs font-black uppercase tracking-widest ${
                          project.status === 'New' 
                            ? 'bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/30'
                            : 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/30'
                        }`}>
                          {project.status}
                        </div>
                        <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-semibold">{project.estimatedTime}</span>
                        </div>
                      </div>
                      
                      {/* Project Title */}
                      <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
                        {project.title}
                      </h3>
                      
                      {/* Project Description */}
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Project Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200/50 dark:border-slate-600/50">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-600 dark:to-slate-500 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Project Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img 
                            src={project.owner.avatar} 
                            alt={project.owner.name}
                            className="w-6 h-6 rounded-lg border-2 border-white dark:border-slate-700 shadow-sm"
                          />
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{project.owner.name}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1 text-rose-500 group-hover:text-rose-600 transition-colors duration-200">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-bold">{project.likes}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            project.difficulty === 'Easy' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                              : project.difficulty === 'Medium'
                              ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                          }`}>
                            {project.difficulty}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Responsive Modals */}
      {showModal && selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => {
            setShowModal(false);
            setSelectedProject(null);
          }}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}
      
      {showPostModal && (
        <PostIdeaModal 
          onClose={() => setShowPostModal(false)}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      {/* New Modals */}
      {showLeaderboard && (
        <FullLeaderboard
          onClose={() => setShowLeaderboard(false)}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      {showProjectIdeas && (
        <>
          {console.log('Rendering ProjectIdeaCards modal')}
          <ProjectIdeaCards
            onClose={() => setShowProjectIdeas(false)}
            onStartProject={handleStartProject}
            onViewProject={handleViewProject}
            onViewProfile={handleViewProfile}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </>
      )}

      {showMyProjects && (
        <MyProjects
          onClose={() => setShowMyProjects(false)}
          onViewProject={handleViewProject}
          onViewProfile={handleViewProfile}
          savedProjects={savedProjects}
          onUnsaveProject={handleUnsaveProject}
          onStartProject={handleStartProject}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      {/* Project Detail Modal */}
      {showProjectDetail && currentProject && (
        <ProjectDetailModal
          project={currentProject}
          onClose={() => {
            setShowProjectDetail(false);
            setCurrentProject(null);
          }}
          onSave={handleSaveProject}
          onUnsave={handleUnsaveProject}
          onStartProject={handleStartProject}
          onViewProfile={handleViewProfile}
          isSaved={isProjectSaved}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      {/* User Profile Modal */}
      {showUserProfile && selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => {
            setShowUserProfile(false);
            setSelectedUser(null);
          }}
          currentUser={mockUser}
          onEditProfile={handleEditProfile}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      {/* Profile Edit Modal */}
      {showProfileEdit && selectedUser && (
        <ProfileEditModal
          user={selectedUser}
          onClose={() => {
            setShowProfileEdit(false);
            setSelectedUser(null);
          }}
          onSave={handleSaveProfile}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}
    </div>
  );
};

export default Dashboard;
