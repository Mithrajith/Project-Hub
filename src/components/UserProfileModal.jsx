import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useResponsive from '../hooks/useResponsive';

const UserProfileModal = ({ user, onClose, currentUser, onEditProfile, isMobile = false, isTablet = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { theme } = useTheme();
  const { isMobile: responsiveIsMobile } = useResponsive();
  
  const actualIsMobile = isMobile || responsiveIsMobile;
  const isOwnProfile = user?.id === currentUser?.id;

  if (!user) return null;

  const getBadgeColor = (badge) => {
    switch(badge.toLowerCase()) {
      case 'early adopter': return 'from-purple-500 to-purple-700';
      case 'mentor': return 'from-emerald-500 to-emerald-700';
      case 'innovator': return 'from-blue-500 to-blue-700';
      case 'contributor': return 'from-orange-500 to-orange-700';
      case 'rising star': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getSkillLevel = (level) => {
    switch(level) {
      case 'Expert': return { color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-900/30', borderColor: 'border-red-200 dark:border-red-700/30', width: '95%' };
      case 'Advanced': return { color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-900/30', borderColor: 'border-orange-200 dark:border-orange-700/30', width: '80%' };
      case 'Intermediate': return { color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/30', borderColor: 'border-yellow-200 dark:border-yellow-700/30', width: '60%' };
      case 'Beginner': return { color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/30', borderColor: 'border-green-200 dark:border-green-700/30', width: '40%' };
      default: return { color: 'text-gray-600 dark:text-gray-400', bgColor: 'bg-gray-50 dark:bg-gray-900/30', borderColor: 'border-gray-200 dark:border-gray-700/30', width: '20%' };
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'activity', label: 'Activity', icon: '📈' }
  ];

  const mockUserData = {
    ...user,
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Love working with React, Node.js, and exploring new technologies.",
    joinDate: '2023-06-15',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    skills: [
      { name: 'React', level: 'Expert', years: 4 },
      { name: 'Node.js', level: 'Advanced', years: 3 },
      { name: 'TypeScript', level: 'Advanced', years: 3 },
      { name: 'Python', level: 'Intermediate', years: 2 },
      { name: 'Docker', level: 'Intermediate', years: 2 },
      { name: 'AWS', level: 'Beginner', years: 1 }
    ],
    badges: ['Early Adopter', 'Mentor', 'Innovator'],
    stats: {
      projectsCompleted: 23,
      projectsInProgress: 4,
      mentoringSessions: 12,
      contributionsThisYear: 156,
      streakDays: 45,
      totalPoints: user.reputation || 2840
    },
    projectIdeas: [
      {
        id: 1,
        title: 'AI Recipe Generator',
        overview: 'Smart cooking assistant powered by machine learning',
        likes: 45,
        implementations: 8,
        createdDate: '2024-01-15',
        tags: ['AI', 'React', 'Python']
      },
      {
        id: 2,
        title: 'Task Management Dashboard',
        overview: 'Collaborative project management tool',
        likes: 32,
        implementations: 5,
        createdDate: '2024-01-10',
        tags: ['React', 'Node.js', 'MongoDB']
      }
    ],
    completedProjects: [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Full-featured online shopping platform',
        completedDate: '2024-01-20',
        teamSize: 3,
        role: 'Lead Developer',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
      },
      {
        id: 2,
        title: 'Weather App',
        description: 'Real-time weather tracking application',
        completedDate: '2023-12-15',
        teamSize: 1,
        role: 'Solo Developer',
        technologies: ['React Native', 'API Integration']
      }
    ],
    recentActivity: [
      { id: 1, type: 'project_completed', content: 'Completed "E-commerce Platform"', time: '2 days ago' },
      { id: 2, type: 'idea_shared', content: 'Shared new project idea "AI Recipe Generator"', time: '1 week ago' },
      { id: 3, type: 'milestone_reached', content: 'Reached 2500 reputation points', time: '2 weeks ago' },
      { id: 4, type: 'collaboration', content: 'Started mentoring 3 new developers', time: '3 weeks ago' }
    ]
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
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img 
                  src={mockUserData.avatar} 
                  alt={mockUserData.name}
                  className={`rounded-3xl border-4 border-white dark:border-slate-700 shadow-xl ${actualIsMobile ? 'w-20 h-20' : 'w-24 h-24 sm:w-28 sm:h-28'}`}
                />
                <div className={`
                  absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 
                  text-white rounded-2xl flex items-center justify-center font-black shadow-lg
                  ${actualIsMobile ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-lg'}
                `}>
                  {mockUserData.level}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h2 className={`
                  font-black text-slate-900 dark:text-slate-100 mb-2 leading-tight
                  ${actualIsMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}
                `}>
                  {mockUserData.name}
                </h2>
                
                <div className={`flex flex-wrap items-center gap-3 mb-3 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                  <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{mockUserData.stats.totalPoints} points</span>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500">•</span>
                  <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Joined {new Date(mockUserData.joinDate).toLocaleDateString()}</span>
                  </div>
                  {mockUserData.location && (
                    <>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{mockUserData.location}</span>
                      </div>
                    </>
                  )}
                </div>
                
                {mockUserData.bio && (
                  <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                    {mockUserData.bio}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isOwnProfile && (
                <button 
                  onClick={onEditProfile}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus-visible:focus"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className={actualIsMobile ? 'hidden' : 'inline'}>Edit Profile</span>
                  </span>
                </button>
              )}
              
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-700/50 rounded-full transition-all duration-200 focus-visible:focus"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`grid gap-4 mb-6 ${actualIsMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-700/40 text-center">
              <div className={`font-black text-emerald-600 dark:text-emerald-400 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                {mockUserData.stats.projectsCompleted}
              </div>
              <div className={`text-slate-600 dark:text-slate-400 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Completed
              </div>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-700/40 text-center">
              <div className={`font-black text-blue-600 dark:text-blue-400 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                {mockUserData.stats.projectsInProgress}
              </div>
              <div className={`text-slate-600 dark:text-slate-400 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                In Progress
              </div>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-700/40 text-center">
              <div className={`font-black text-purple-600 dark:text-purple-400 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                {mockUserData.stats.streakDays}
              </div>
              <div className={`text-slate-600 dark:text-slate-400 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Day Streak
              </div>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-4 border border-white/40 dark:border-slate-700/40 text-center">
              <div className={`font-black text-orange-600 dark:text-orange-400 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                {mockUserData.stats.mentoringSessions}
              </div>
              <div className={`text-slate-600 dark:text-slate-400 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Mentored
              </div>
            </div>
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
              {/* Skills */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Skills & Expertise
                </h3>
                <div className="space-y-4">
                  {mockUserData.skills.map((skill, index) => {
                    const levelData = getSkillLevel(skill.level);
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold text-slate-800 dark:text-slate-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                            {skill.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${levelData.color} ${levelData.bgColor} ${levelData.borderColor}`}>
                              {skill.level}
                            </span>
                            <span className={`text-slate-500 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                              {skill.years}y
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                            style={{width: levelData.width}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Badges */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Achievements & Badges
                </h3>
                <div className={`grid gap-4 ${actualIsMobile ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
                  {mockUserData.badges.map((badge, index) => (
                    <div 
                      key={index}
                      className={`bg-gradient-to-r ${getBadgeColor(badge)} rounded-2xl p-4 text-white text-center shadow-lg transform hover:scale-105 transition-transform duration-200`}
                    >
                      <div className={`font-black mb-2 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                        🏆
                      </div>
                      <div className={`font-bold ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        {badge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Connect & Follow
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mockUserData.website && (
                    <a 
                      href={mockUserData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <div>
                        <div className="font-bold">Website</div>
                        <div className="text-xs opacity-90">Portfolio</div>
                      </div>
                    </a>
                  )}
                  
                  {mockUserData.github && (
                    <a 
                      href={mockUserData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <div className="font-bold">GitHub</div>
                        <div className="text-xs opacity-90">Code</div>
                      </div>
                    </a>
                  )}
                  
                  {mockUserData.linkedin && (
                    <a 
                      href={mockUserData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                      <div>
                        <div className="font-bold">LinkedIn</div>
                        <div className="text-xs opacity-90">Network</div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              {/* Project Ideas */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Project Ideas ({mockUserData.projectIdeas.length})
                </h3>
                <div className="space-y-4">
                  {mockUserData.projectIdeas.map((idea) => (
                    <div key={idea.id} className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-600/30">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className={`font-bold text-slate-800 dark:text-slate-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                          {idea.title}
                        </h4>
                        <span className={`text-slate-500 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          {new Date(idea.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className={`text-slate-600 dark:text-slate-400 mb-3 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        {idea.overview}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {idea.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className={`bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold border border-blue-200/50 dark:border-blue-700/50 ${actualIsMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'}`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className={`flex items-center space-x-4 text-slate-500 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          <span>❤️ {idea.likes}</span>
                          <span>🚀 {idea.implementations}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed Projects */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Completed Projects ({mockUserData.completedProjects.length})
                </h3>
                <div className="space-y-4">
                  {mockUserData.completedProjects.map((project) => (
                    <div key={project.id} className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-600/30">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className={`font-bold text-slate-800 dark:text-slate-200 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                          {project.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-bold">
                            Completed
                          </span>
                          <span className={`text-slate-500 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                            {new Date(project.completedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className={`text-slate-600 dark:text-slate-400 mb-3 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className={`bg-gray-50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 rounded-lg font-semibold border border-gray-200/50 dark:border-gray-700/50 ${actualIsMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className={`flex items-center space-x-4 text-slate-500 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          <span>👥 {project.teamSize}</span>
                          <span>{project.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              {/* Badges Grid */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  All Achievements
                </h3>
                <div className={`grid gap-4 ${actualIsMobile ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
                  {['Early Adopter', 'Mentor', 'Innovator', 'Contributor', 'Rising Star'].map((badge, index) => (
                    <div 
                      key={index}
                      className={`bg-gradient-to-r ${getBadgeColor(badge)} rounded-2xl p-6 text-white text-center shadow-lg transform hover:scale-105 transition-transform duration-200`}
                    >
                      <div className={`font-black mb-3 ${actualIsMobile ? 'text-2xl' : 'text-3xl'}`}>
                        🏆
                      </div>
                      <div className={`font-bold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        {badge}
                      </div>
                      <div className={`text-xs opacity-90 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                        Earned {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Bars */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Progress to Next Level
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold text-slate-700 dark:text-slate-300 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        Level Progress
                      </span>
                      <span className={`font-bold text-blue-600 dark:text-blue-400 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        Level {mockUserData.level} → {parseInt(mockUserData.level) + 1}
                      </span>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg transition-all duration-1000 ease-out relative"
                        style={{width: '75%'}}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold text-slate-700 dark:text-slate-300 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        Mentor Badge Progress
                      </span>
                      <span className={`font-bold text-emerald-600 dark:text-emerald-400 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                        12/15 Sessions
                      </span>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-lg transition-all duration-1000 ease-out relative"
                        style={{width: '80%'}}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {mockUserData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-600/30">
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'project_completed' ? 'bg-emerald-500' :
                          activity.type === 'idea_shared' ? 'bg-blue-500' :
                          activity.type === 'milestone_reached' ? 'bg-purple-500' :
                          'bg-orange-500'
                        } animate-pulse`}></div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-slate-700 dark:text-slate-300 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                          {activity.content}
                        </p>
                        <p className={`text-slate-500 dark:text-slate-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Stats */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Activity Summary
                </h3>
                <div className={`grid gap-4 ${actualIsMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/30">
                    <div className={`font-black text-emerald-600 dark:text-emerald-400 mb-2 ${actualIsMobile ? 'text-xl' : 'text-2xl'}`}>
                      {mockUserData.stats.contributionsThisYear}
                    </div>
                    <div className={`text-emerald-700 dark:text-emerald-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      Contributions
                    </div>
                    <div className={`text-emerald-600 dark:text-emerald-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      This Year
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/30">
                    <div className={`font-black text-blue-600 dark:text-blue-400 mb-2 ${actualIsMobile ? 'text-xl' : 'text-2xl'}`}>
                      {mockUserData.stats.streakDays}
                    </div>
                    <div className={`text-blue-700 dark:text-blue-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      Current
                    </div>
                    <div className={`text-blue-600 dark:text-blue-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      Day Streak
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/30">
                    <div className={`font-black text-purple-600 dark:text-purple-400 mb-2 ${actualIsMobile ? 'text-xl' : 'text-2xl'}`}>
                      {mockUserData.projectIdeas.length}
                    </div>
                    <div className={`text-purple-700 dark:text-purple-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      Ideas
                    </div>
                    <div className={`text-purple-600 dark:text-purple-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      Shared
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-200/50 dark:border-orange-700/30">
                    <div className={`font-black text-orange-600 dark:text-orange-400 mb-2 ${actualIsMobile ? 'text-xl' : 'text-2xl'}`}>
                      {mockUserData.stats.mentoringSessions}
                    </div>
                    <div className={`text-orange-700 dark:text-orange-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      Mentoring
                    </div>
                    <div className={`text-orange-600 dark:text-orange-400 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      Sessions
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
