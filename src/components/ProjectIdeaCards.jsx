import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useResponsive from '../hooks/useResponsive';

// Enhanced mock data for project ideas with overview and full descriptions
const mockProjectIdeas = [
  {
    id: 1,
    title: "AI-Powered Recipe Generator",
    overview: "Create personalized recipes using AI based on dietary preferences and available ingredients",
    description: "Build a comprehensive AI system that generates personalized recipes by analyzing user dietary preferences, available ingredients, nutritional requirements, and cooking skill level. The system will use machine learning algorithms to suggest creative combinations and provide step-by-step cooking instructions. Features include ingredient substitution suggestions, nutritional information, cooking time estimation, and integration with grocery delivery services.",
    creator: { 
      name: "Alice Smith", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      level: 15,
      reputation: 450
    },
    tags: ["AI/ML", "Web Development", "API", "Database"],
    difficulty: "Medium",
    estimatedTime: "3-4 weeks",
    likes: 142,
    participants: [
      { name: "John Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Sarah Lee", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    status: "Active",
    createdAt: "2024-01-15",
    category: "AI/ML"
  },
  {
    id: 2,
    title: "Smart Home IoT Dashboard",
    overview: "Comprehensive dashboard for monitoring and controlling all smart home devices with automation",
    description: "Develop a unified dashboard that connects and controls various IoT devices throughout the home. The system will provide real-time monitoring of energy usage, security cameras, smart thermostats, lighting systems, and appliances. Include features like automated scheduling, energy optimization recommendations, security alerts, voice control integration, mobile app synchronization, and machine learning-based usage pattern analysis for predictive automation.",
    creator: { 
      name: "Bob Johnson", 
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      level: 12,
      reputation: 380
    },
    tags: ["IoT", "Full Stack", "Mobile", "Cloud"],
    difficulty: "Hard",
    estimatedTime: "6-8 weeks",
    likes: 89,
    participants: [
      { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    status: "Planning",
    createdAt: "2024-01-12",
    category: "IoT"
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    overview: "Secure and transparent voting platform using blockchain technology for elections",
    description: "Create a revolutionary voting system that leverages blockchain technology to ensure complete transparency, security, and immutability of election processes. The system will feature voter authentication through biometric verification, encrypted vote casting, real-time result tracking, audit trails, smart contract-based vote validation, and decentralized storage. Additional features include multi-language support, accessibility compliance, mobile voting capabilities, and integration with government identity systems.",
    creator: { 
      name: "Carol Davis", 
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      level: 18,
      reputation: 520
    },
    tags: ["Blockchain", "Security", "Web3", "Cryptography"],
    difficulty: "Expert",
    estimatedTime: "8-12 weeks",
    likes: 267,
    participants: [
      { name: "Michael Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Lisa Garcia", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "David Miller", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    status: "In Progress",
    createdAt: "2024-01-08",
    category: "Blockchain"
  },
  {
    id: 4,
    title: "Mental Health Companion App",
    overview: "AI-powered chatbot providing mental health support, mood tracking, and professional resources",
    description: "Develop a comprehensive mental health companion that uses natural language processing to provide empathetic conversation, mood tracking, and personalized mental wellness recommendations. The app will include features like daily check-ins, meditation guides, breathing exercises, crisis intervention protocols, journal functionality, progress tracking, professional therapist directory, appointment scheduling, and integration with wearable devices for stress monitoring. The AI will be trained on psychological frameworks while maintaining strict privacy and ethical guidelines.",
    creator: { 
      name: "Dr. Sarah Chen", 
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      level: 16,
      reputation: 490
    },
    tags: ["AI/ML", "Health Tech", "Mobile", "NLP"],
    difficulty: "Hard",
    estimatedTime: "5-7 weeks",
    likes: 203,
    participants: [],
    status: "New",
    createdAt: "2024-01-20",
    category: "Health Tech"
  },
  {
    id: 5,
    title: "Sustainable Energy Tracker",
    overview: "Track and optimize energy consumption with renewable energy integration and cost savings",
    description: "Build a comprehensive energy management system that monitors household energy consumption in real-time, integrates with solar panels and other renewable sources, and provides actionable insights for reducing carbon footprint and energy costs. Features include smart meter integration, weather-based energy predictions, carbon footprint calculations, energy trading marketplace, appliance efficiency recommendations, peak usage alerts, and gamification elements to encourage sustainable behavior. The system will also provide detailed analytics and reports for energy audits.",
    creator: { 
      name: "Alex Green", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      level: 11,
      reputation: 320
    },
    tags: ["IoT", "Sustainability", "Data Analytics", "Mobile"],
    difficulty: "Medium",
    estimatedTime: "4-6 weeks",
    likes: 156,
    participants: [
      { name: "Jenny Park", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
    ],
    status: "Active",
    createdAt: "2024-01-18",
    category: "Sustainability"
  }
];

  const ProjectIdeaCard = ({ idea, onStartProject, onViewProject, onViewProfile }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const getDifficultyColor = (difficulty) => {
      switch(difficulty) {
        case 'Easy': return 'bg-green-500';
        case 'Medium': return 'bg-yellow-500';
        case 'Hard': return 'bg-orange-500';
        case 'Expert': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    };
    
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
          onClick={() => onViewProject?.(idea)}
        >
          {/* Difficulty indicator */}
          <div className="absolute top-0 right-0 overflow-hidden">
            <div className={`
              ${getDifficultyColor(idea.difficulty)} 
              text-white text-xs font-black px-6 py-2 transform rotate-45 translate-x-4 -translate-y-1
              shadow-lg border border-white/20
            `}>
              {idea.difficulty.toUpperCase()}
            </div>
          </div>

          {/* Header */}
          <div className="mb-4">
            <h3 className={`
              font-black text-slate-900 dark:text-slate-100 mb-3 leading-tight 
              group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 
              group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 
              line-clamp-2
              ${actualIsMobile ? 'text-lg' : 'text-xl'}
            `}>
              {idea.title}
            </h3>

            <p className={`
              text-slate-600 dark:text-slate-400 leading-relaxed mb-3
              ${actualIsMobile ? 'text-sm' : 'text-base'}
            `}>
              {idea.overview}
            </p>

            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className={`font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                  {idea.estimatedTime}
                </span>
              </div>
              <span className="text-slate-400 dark:text-slate-500">•</span>
              <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                  {idea.participants?.length || 0} joined
                </span>
              </div>
            </div>
          </div>

          {/* Creator info */}
          <div className="flex items-center space-x-3 mb-4 p-3 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-600/30">
            <img 
              src={idea.creator.avatar} 
              alt={idea.creator.name}
              className={`rounded-xl border-2 border-white dark:border-slate-700 shadow-md cursor-pointer hover:scale-105 transition-transform duration-200 ${actualIsMobile ? 'w-10 h-10' : 'w-12 h-12'}`}
              onClick={(e) => {
                e.stopPropagation();
                onViewProfile?.(idea.creator);
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 
                  className={`font-bold text-slate-800 dark:text-slate-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewProfile?.(idea.creator);
                  }}
                >
                  {idea.creator.name}
                </h4>
                <div className={`
                  bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full 
                  flex items-center justify-center font-black shadow-lg
                  ${actualIsMobile ? 'w-6 h-6 text-xs' : 'w-7 h-7 text-sm'}
                `}>
                  {idea.creator.level}
                </div>
              </div>
              <p className={`text-slate-600 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Project Creator • {idea.creator.reputation} reputation
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {idea.tags.slice(0, actualIsMobile ? 3 : 5).map((tag, index) => (
                <span 
                  key={index} 
                  className={`
                    bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 
                    text-blue-700 dark:text-blue-300 rounded-xl font-semibold border border-blue-200/50 
                    dark:border-blue-700/50 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/40 
                    dark:hover:to-indigo-800/40 transition-colors duration-300
                    ${actualIsMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
                  `}
                >
                  #{tag}
                </span>
              ))}
              {idea.tags.length > (actualIsMobile ? 3 : 5) && (
                <span className={`
                  bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 
                  text-slate-600 dark:text-slate-400 rounded-xl font-semibold
                  ${actualIsMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
                `}>
                  +{idea.tags.length - (actualIsMobile ? 3 : 5)}
                </span>
              )}
            </div>
          </div>

          {/* Description preview */}
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-700/30">
            <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
              {isExpanded ? idea.description : `${idea.description.substring(0, 120)}...`}
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className={`mt-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-4 mb-4 ${actualIsMobile ? 'text-center' : ''}`}>
            <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/30">
              <div className={`font-black text-emerald-600 dark:text-emerald-400 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                {idea.likes || 0}
              </div>
              <div className={`text-emerald-700 dark:text-emerald-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Likes
              </div>
            </div>
            
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/30">
              <div className={`font-black text-blue-600 dark:text-blue-400 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                {idea.implementations || 0}
              </div>
              <div className={`text-blue-700 dark:text-blue-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Built
              </div>
            </div>
            
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/30">
              <div className={`font-black text-purple-600 dark:text-purple-400 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                {idea.comments || 0}
              </div>
              <div className={`text-purple-700 dark:text-purple-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Comments
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartProject?.(idea);
              }}
              className={`
                w-full bg-gradient-to-r from-blue-600 to-purple-600 
                hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl 
                transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                focus-visible:focus group/btn
                ${actualIsMobile ? 'py-3 px-4' : 'py-4 px-6'}
              `}
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Start This Project</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

const ProjectIdeaCards = ({ onClose, onStartProject, onViewProject, onViewProfile, isMobile = false, isTablet = false }) => {
  console.log('ProjectIdeaCards component rendered');
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-black">ProjectIdeaCards Component</h2>
        <p className="mb-4 text-gray-700">This is the ProjectIdeaCards component working!</p>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

  const categories = ['all', 'AI/ML', 'IoT', 'Blockchain', 'Health Tech', 'Sustainability', 'Web Development'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Liked' },
    { value: 'difficulty', label: 'By Difficulty' }
  ];

  const filteredAndSortedProjects = mockProjectIdeas
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || 
                             project.category === selectedCategory ||
                             project.tags.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3, 'Expert': 4 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

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
          relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 
          dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 
          border-b border-slate-200/60 dark:border-slate-700/50
          ${actualIsMobile ? 'p-4 pt-6' : 'p-6 sm:p-8'}
        `}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h2 className={`
                    font-black bg-gradient-to-r from-slate-900 to-slate-700 
                    dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent
                    ${actualIsMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'}
                  `}>
                    Project Ideas
                  </h2>
                  <p className={`text-slate-600 dark:text-slate-400 mt-1 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                    Discover innovative projects to build and grow your skills
                  </p>
                </div>
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
                    placeholder="Search project ideas..."
                  />
                </div>

                {/* Categories and Sort */}
                <div className={`flex ${actualIsMobile ? 'flex-col space-y-3' : 'items-center justify-between'} gap-4`}>
                  {/* Category filter */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                          px-4 py-2 rounded-xl font-semibold transition-all duration-300 capitalize
                          ${actualIsMobile ? 'text-sm px-3 py-1.5' : 'text-base'}
                          ${selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                            : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80'
                          }
                        `}
                      >
                        {category === 'all' ? 'All Categories' : category}
                      </button>
                    ))}
                  </div>

                  {/* Sort dropdown */}
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
                    {sortOptions.map((option) => (
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
        
        {/* Project Ideas Grid */}
        <div className={`overflow-y-auto ${actualIsMobile ? 'p-4 flex-1' : 'p-6 sm:p-8 max-h-[70vh]'}`}>
          {filteredAndSortedProjects.length > 0 ? (
            <div className={`grid gap-6 ${actualIsMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}`}>
              {filteredAndSortedProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProjectIdeaCard
                    idea={project}
                    onStartProject={onStartProject}
                    onViewProject={onViewProject}
                    onViewProfile={onViewProfile}
                    isMobile={actualIsMobile}
                    isTablet={isTablet}
                  />
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
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-4">No project ideas found</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Try adjusting your search criteria or explore different categories
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectIdeaCards;
