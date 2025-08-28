import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useResponsive from '../hooks/useResponsive';

const ProfileEditModal = ({ user, onClose, onSave, isMobile = false, isTablet = false }) => {
  const { theme } = useTheme();
  const { isMobile: responsiveIsMobile } = useResponsive();
  
  const actualIsMobile = isMobile || responsiveIsMobile;
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || user?.name?.toLowerCase().replace(' ', '') || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    avatar: user?.avatar || ''
  });

  const [badges, setBadges] = useState(user?.badges || ['Early Adopter', 'Mentor', 'Innovator']);
  const [availableBadges] = useState([
    'Early Adopter', 'Mentor', 'Innovator', 'Contributor', 'Rising Star', 
    'Code Master', 'Team Player', 'Problem Solver', 'Creative Thinker', 'Tech Enthusiast'
  ]);

  const [activeTab, setActiveTab] = useState('profile');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBadgeToggle = (badge) => {
    setBadges(prev => {
      if (prev.includes(badge)) {
        return prev.filter(b => b !== badge);
      } else if (prev.length < 6) { // Limit to 6 badges
        return [...prev, badge];
      }
      return prev;
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
      badges
    };
    onSave(updatedUser);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real app, you'd upload to a server
      // For demo, we'll just create a local URL
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('avatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getBadgeColor = (badge) => {
    switch(badge.toLowerCase()) {
      case 'early adopter': return 'from-purple-500 to-purple-700';
      case 'mentor': return 'from-emerald-500 to-emerald-700';
      case 'innovator': return 'from-blue-500 to-blue-700';
      case 'contributor': return 'from-orange-500 to-orange-700';
      case 'rising star': return 'from-yellow-400 to-yellow-600';
      case 'code master': return 'from-red-500 to-red-700';
      case 'team player': return 'from-indigo-500 to-indigo-700';
      case 'problem solver': return 'from-green-500 to-green-700';
      case 'creative thinker': return 'from-pink-500 to-pink-700';
      case 'tech enthusiast': return 'from-cyan-500 to-cyan-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'badges', label: 'Badges', icon: '🏆' }
  ];

  if (!user) return null;

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
            ? 'w-full max-w-4xl max-h-[95vh] rounded-2xl'
            : 'max-w-5xl w-full max-h-[90vh] rounded-3xl'
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
          <div className="flex items-center justify-between mb-6">
            <h2 className={`
              font-black text-slate-900 dark:text-slate-100 leading-tight
              ${actualIsMobile ? 'text-xl' : 'text-2xl sm:text-3xl'}
            `}>
              Edit Profile
            </h2>
            
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

          {/* Tabs */}
          <div className="flex space-x-1 bg-white/50 dark:bg-slate-800/50 rounded-2xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300
                  ${actualIsMobile ? 'text-sm' : 'text-base'}
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/50'
                  }
                `}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'profile' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              {/* Avatar Section */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Profile Picture
                </h3>
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img 
                      src={formData.avatar} 
                      alt="Profile"
                      className={`rounded-3xl border-4 border-white dark:border-slate-700 shadow-xl ${actualIsMobile ? 'w-20 h-20' : 'w-24 h-24'}`}
                    />
                    <div className={`
                      absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-500 to-purple-600 
                      text-white rounded-2xl flex items-center justify-center font-black shadow-lg
                      ${actualIsMobile ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-lg'}
                    `}>
                      {user?.level}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <span className={`
                        inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
                        hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl 
                        cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl 
                        transform hover:-translate-y-1 focus-visible:focus
                        ${actualIsMobile ? 'text-sm' : 'text-base'}
                      `}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Upload New Photo</span>
                      </span>
                    </label>
                    <p className={`text-slate-500 dark:text-slate-400 mt-2 ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                      JPG, PNG or GIF. Max file size 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-slate-700 dark:text-slate-300 font-semibold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`
                        w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 
                        rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 
                        transition-all duration-200
                        ${actualIsMobile ? 'px-4 py-3 text-sm' : 'px-4 py-3 text-base'}
                      `}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-slate-700 dark:text-slate-300 font-semibold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`
                        w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 
                        rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 
                        transition-all duration-200
                        ${actualIsMobile ? 'px-4 py-3 text-sm' : 'px-4 py-3 text-base'}
                      `}
                      placeholder="@username"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className={`block text-slate-700 dark:text-slate-300 font-semibold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className={`
                        w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 
                        rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 
                        transition-all duration-200 resize-none
                        ${actualIsMobile ? 'px-4 py-3 text-sm' : 'px-4 py-3 text-base'}
                      `}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-slate-700 dark:text-slate-300 font-semibold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`
                        w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 
                        rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 
                        transition-all duration-200
                        ${actualIsMobile ? 'px-4 py-3 text-sm' : 'px-4 py-3 text-base'}
                      `}
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-slate-700 dark:text-slate-300 font-semibold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className={`
                        w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 
                        rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 
                        transition-all duration-200
                        ${actualIsMobile ? 'px-4 py-3 text-sm' : 'px-4 py-3 text-base'}
                      `}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-6 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Social Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-slate-700 dark:text-slate-300 font-semibold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      GitHub Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className={`
                          w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 
                          rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 
                          transition-all duration-200
                          ${actualIsMobile ? 'pl-10 pr-4 py-3 text-sm' : 'pl-10 pr-4 py-3 text-base'}
                        `}
                        placeholder="https://github.com/username"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-slate-700 dark:text-slate-300 font-semibold mb-2 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                      LinkedIn Profile
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.530A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </div>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className={`
                          w-full bg-white/70 dark:bg-slate-800/70 border border-slate-300/50 dark:border-slate-600/50 
                          rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 
                          transition-all duration-200
                          ${actualIsMobile ? 'pl-10 pr-4 py-3 text-sm' : 'pl-10 pr-4 py-3 text-base'}
                        `}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className={`${actualIsMobile ? 'p-4' : 'p-6 sm:p-8'} space-y-6`}>
              {/* Selected Badges */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Selected Badges ({badges.length}/6)
                </h3>
                <p className={`text-slate-600 dark:text-slate-400 mb-6 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                  Choose up to 6 badges to showcase on your profile. Drag to reorder them.
                </p>
                <div className={`grid gap-4 ${actualIsMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {badges.map((badge, index) => (
                    <div 
                      key={badge}
                      className={`bg-gradient-to-r ${getBadgeColor(badge)} rounded-2xl p-4 text-white text-center shadow-lg relative group cursor-pointer`}
                    >
                      <button
                        onClick={() => handleBadgeToggle(badge)}
                        className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className={`font-black mb-2 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                        🏆
                      </div>
                      <div className={`font-bold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                        {badge}
                      </div>
                      <div className={`text-xs opacity-90 mt-1`}>
                        #{index + 1}
                      </div>
                    </div>
                  ))}
                  
                  {/* Add Badge Slots */}
                  {Array.from({length: 6 - badges.length}).map((_, index) => (
                    <div 
                      key={`empty-${index}`}
                      className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl p-4 text-center text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center min-h-[100px]"
                    >
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className={actualIsMobile ? 'text-xs' : 'text-sm'}>Empty Slot</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Badges */}
              <div className="bg-gradient-to-br from-white/70 to-white/40 dark:from-slate-800/70 dark:to-slate-700/40 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-slate-700/40 shadow-elegant">
                <h3 className={`font-bold text-slate-900 dark:text-slate-100 mb-4 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  Available Badges
                </h3>
                <p className={`text-slate-600 dark:text-slate-400 mb-6 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                  Click on a badge to add it to your profile. Some badges are earned through achievements.
                </p>
                <div className={`grid gap-4 ${actualIsMobile ? 'grid-cols-2' : 'grid-cols-3 sm:grid-cols-4'}`}>
                  {availableBadges.map((badge) => {
                    const isSelected = badges.includes(badge);
                    const canSelect = !isSelected && badges.length < 6;
                    
                    return (
                      <button
                        key={badge}
                        onClick={() => canSelect && handleBadgeToggle(badge)}
                        disabled={!canSelect && !isSelected}
                        className={`
                          bg-gradient-to-r ${getBadgeColor(badge)} rounded-2xl p-4 text-white text-center shadow-lg 
                          transition-all duration-300 transform
                          ${isSelected 
                            ? 'opacity-50 scale-95' 
                            : canSelect 
                              ? 'hover:scale-105 hover:shadow-xl cursor-pointer' 
                              : 'opacity-30 cursor-not-allowed'
                          }
                        `}
                      >
                        <div className={`font-black mb-2 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                          🏆
                        </div>
                        <div className={`font-bold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                          {badge}
                        </div>
                        {isSelected && (
                          <div className="text-xs opacity-90 mt-1">
                            ✓ Selected
                          </div>
                        )}
                      </button>
                    );
                  })}
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
            <button
              onClick={handleSave}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Changes</span>
              </span>
            </button>
            
            <button
              onClick={onClose}
              className={`
                border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 
                font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 
                hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 
                focus-visible:focus
                ${actualIsMobile ? 'py-3 px-4' : 'py-4 px-6'}
              `}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
