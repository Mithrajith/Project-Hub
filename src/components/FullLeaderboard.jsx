import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import useResponsive from '../hooks/useResponsive';

// Extended mock data for leaderboard
const mockLeaderboardData = [
  { id: 1, name: "Alice Smith", points: 450, avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 1, badge: "🏆", level: 15, projectsCompleted: 28, streak: 45 },
  { id: 2, name: "John Doe", points: 215, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 2, badge: "🥈", level: 12, projectsCompleted: 15, streak: 22 },
  { id: 3, name: "Bob Johnson", points: 380, avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 3, badge: "🥉", level: 14, projectsCompleted: 23, streak: 31 },
  { id: 4, name: "Carol Davis", points: 320, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 4, badge: "⭐", level: 13, projectsCompleted: 19, streak: 18 },
  { id: 5, name: "David Wilson", points: 295, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 5, badge: "⭐", level: 11, projectsCompleted: 17, streak: 25 },
  { id: 6, name: "Emma Thompson", points: 275, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 6, badge: "⭐", level: 10, projectsCompleted: 16, streak: 12 },
  { id: 7, name: "Michael Brown", points: 260, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 7, badge: "⭐", level: 9, projectsCompleted: 14, streak: 8 },
  { id: 8, name: "Sarah Garcia", points: 245, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 8, badge: "⭐", level: 9, projectsCompleted: 13, streak: 14 },
  { id: 9, name: "James Miller", points: 230, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 9, badge: "⭐", level: 8, projectsCompleted: 12, streak: 7 },
  { id: 10, name: "Lisa Anderson", points: 220, avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 10, badge: "⭐", level: 8, projectsCompleted: 11, streak: 16 },
  { id: 11, name: "Ryan Martinez", points: 205, avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 11, badge: "⭐", level: 7, projectsCompleted: 10, streak: 5 },
  { id: 12, name: "Jessica Lee", points: 190, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 12, badge: "⭐", level: 7, projectsCompleted: 9, streak: 11 },
  { id: 13, name: "Kevin Taylor", points: 175, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 13, badge: "⭐", level: 6, projectsCompleted: 8, streak: 3 },
  { id: 14, name: "Amanda White", points: 165, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 14, badge: "⭐", level: 6, projectsCompleted: 7, streak: 9 },
  { id: 15, name: "Christopher Clark", points: 150, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 15, badge: "⭐", level: 5, projectsCompleted: 6, streak: 2 },
  { id: 16, name: "Nicole Rodriguez", points: 140, avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 16, badge: "⭐", level: 5, projectsCompleted: 6, streak: 6 },
  { id: 17, name: "Daniel Lewis", points: 125, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 17, badge: "⭐", level: 4, projectsCompleted: 5, streak: 4 },
  { id: 18, name: "Stephanie Walker", points: 115, avatar: "https://images.unsplash.com/photo-1494790108755-2616b152faf0?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 18, badge: "⭐", level: 4, projectsCompleted: 4, streak: 1 },
  { id: 19, name: "Matthew Hall", points: 105, avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 19, badge: "⭐", level: 3, projectsCompleted: 4, streak: 8 },
  { id: 20, name: "Ashley Young", points: 95, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", rank: 20, badge: "⭐", level: 3, projectsCompleted: 3, streak: 0 }
];

const FullLeaderboard = ({ onClose, isMobile = false, isTablet = false }) => {
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all-time');

  const { theme } = useTheme();
  const { isMobile: responsiveIsMobile } = useResponsive();
  
  const actualIsMobile = isMobile || responsiveIsMobile;

  const ITEMS_PER_PAGE = 10;

  // Load initial data
  useEffect(() => {
    loadMoreUsers();
  }, []);

  const loadMoreUsers = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newUsers = mockLeaderboardData.slice(startIndex, endIndex);
    
    if (newUsers.length === 0) {
      setHasMore(false);
    } else {
      setDisplayedUsers(prev => [...prev, ...newUsers]);
      setPage(prev => prev + 1);
    }
    
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  // Scroll handler for infinite scroll
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !isLoading) {
      loadMoreUsers();
    }
  }, [loadMoreUsers, hasMore, isLoading]);

  const filteredUsers = displayedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankColor = (rank) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-400 to-gray-600';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-blue-500 to-purple-600';
  };

  const getRankBorder = (rank) => {
    if (rank === 1) return 'ring-yellow-400/50';
    if (rank === 2) return 'ring-gray-400/50';
    if (rank === 3) return 'ring-orange-400/50';
    return 'ring-blue-500/50';
  };

  const UserCard = ({ user, index }) => (
    <div 
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Background glow for top 3 */}
      {user.rank <= 3 && (
        <div className={`absolute inset-0 bg-gradient-to-r ${getRankColor(user.rank)}/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
      )}
      
      <div className={`
        relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 
        dark:from-slate-800/90 dark:via-slate-800/70 dark:to-slate-800/50 
        backdrop-blur-xl rounded-3xl border border-white/40 dark:border-slate-700/40 
        shadow-elegant hover:shadow-ethereal transition-all duration-500 
        transform hover:scale-[1.02] cursor-pointer overflow-hidden
        ${user.rank <= 3 ? `ring-2 ${getRankBorder(user.rank)} ring-offset-2 ring-offset-transparent` : ''}
        ${actualIsMobile ? 'p-4' : 'p-6'}
      `}>
        
        {/* Premium rank indicator for top 3 */}
        {user.rank <= 3 && (
          <div className="absolute top-0 right-0 overflow-hidden">
            <div className={`
              bg-gradient-to-br ${getRankColor(user.rank)} 
              text-white text-xs font-black px-4 py-2 transform rotate-45 translate-x-3 -translate-y-1
              shadow-lg
            `}>
              TOP {user.rank}
            </div>
          </div>
        )}

        <div className={`flex items-center space-x-4 ${actualIsMobile ? 'flex-col space-x-0 space-y-4' : ''}`}>
          {/* Rank and Avatar */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Rank Badge */}
            <div className={`
              relative flex items-center justify-center w-12 h-12 rounded-2xl font-black text-white shadow-lg
              bg-gradient-to-br ${getRankColor(user.rank)}
              ${user.rank <= 3 ? 'animate-pulse-glow' : ''}
              ${actualIsMobile ? 'w-10 h-10 text-sm' : 'text-lg'}
            `}>
              <span className="relative z-10">#{user.rank}</span>
              {user.rank <= 3 && (
                <div className="absolute inset-0 rounded-2xl animate-ping opacity-75 bg-gradient-to-br from-yellow-400 to-orange-500"></div>
              )}
            </div>

            {/* Avatar with level indicator */}
            <div className="relative">
              <div className={`
                rounded-2xl overflow-hidden shadow-lg ring-2 ring-white dark:ring-slate-700 
                group-hover:scale-110 transition-transform duration-300
                ${actualIsMobile ? 'w-12 h-12' : 'w-16 h-16'}
              `}>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Level badge */}
              <div className={`
                absolute -bottom-1 -right-1 bg-gradient-to-br from-blue-500 to-purple-600 
                text-white rounded-full flex items-center justify-center font-bold shadow-lg
                ${actualIsMobile ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}
              `}>
                {user.level}
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className={`flex-1 min-w-0 ${actualIsMobile ? 'text-center' : ''}`}>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`
                font-black text-slate-900 dark:text-slate-100 truncate
                ${actualIsMobile ? 'text-lg text-center' : 'text-xl'}
              `}>
                {user.name}
              </h3>
              <span className="text-xl flex-shrink-0">{user.badge}</span>
            </div>
            
            {/* Points */}
            <div className="mb-3">
              <div className={`
                text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                font-black tracking-tight
                ${actualIsMobile ? 'text-2xl' : 'text-3xl'}
              `}>
                {user.points.toLocaleString()}
              </div>
              <div className={`text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-widest ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                Points
              </div>
            </div>

            {/* Stats Grid */}
            <div className={`grid gap-3 ${actualIsMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-xl p-3 border border-emerald-200/50 dark:border-emerald-700/30">
                <div className={`font-black text-emerald-600 dark:text-emerald-400 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  {user.projectsCompleted}
                </div>
                <div className={`text-emerald-700 dark:text-emerald-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                  Projects
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-3 border border-orange-200/50 dark:border-orange-700/30">
                <div className={`font-black text-orange-600 dark:text-orange-400 ${actualIsMobile ? 'text-lg' : 'text-xl'}`}>
                  {user.streak}
                </div>
                <div className={`text-orange-700 dark:text-orange-300 font-semibold ${actualIsMobile ? 'text-xs' : 'text-sm'}`}>
                  Streak
                </div>
              </div>

              {!actualIsMobile && (
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3 border border-purple-200/50 dark:border-purple-700/30">
                  <div className="text-xl font-black text-purple-600 dark:text-purple-400">
                    L{user.level}
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300 font-semibold">
                    Level
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
            : 'max-w-6xl w-full max-h-[90vh] rounded-3xl'
        }
        overflow-hidden
      `}>
        {/* Header */}
        <div className={`
          relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 
          dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 
          border-b border-slate-200/60 dark:border-slate-700/50
          ${actualIsMobile ? 'p-4 pt-6' : 'p-6 sm:p-8'}
        `}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h2 className={`
                    font-black bg-gradient-to-r from-slate-900 to-slate-700 
                    dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent
                    ${actualIsMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'}
                  `}>
                    Elite Builders Leaderboard
                  </h2>
                  <p className={`text-slate-600 dark:text-slate-400 mt-1 ${actualIsMobile ? 'text-sm' : 'text-base'}`}>
                    Top performers shaping the future
                  </p>
                </div>
              </div>

              {/* Timeframe selector */}
              <div className={`flex flex-wrap gap-2 ${actualIsMobile ? 'mb-4' : 'mb-6'}`}>
                {['all-time', 'this-month', 'this-week'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`
                      px-4 py-2 rounded-xl font-semibold transition-all duration-300 capitalize
                      ${actualIsMobile ? 'text-sm px-3 py-1.5' : 'text-base'}
                      ${selectedTimeframe === timeframe
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80'
                      }
                    `}
                  >
                    {timeframe.replace('-', ' ')}
                  </button>
                ))}
              </div>

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
                  placeholder="Search builders..."
                />
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
        
        {/* Leaderboard List */}
        <div 
          className={`overflow-y-auto space-y-4 ${actualIsMobile ? 'p-4 flex-1' : 'p-6 sm:p-8 max-h-[70vh]'}`}
          onScroll={handleScroll}
        >
          {filteredUsers.map((user, index) => (
            <UserCard key={user.id} user={user} index={index} />
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg animate-pulse-slow"></div>
                <div className="relative w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-spin">
                  <div className="absolute inset-2 bg-white dark:bg-slate-900 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* End of results */}
          {!hasMore && filteredUsers.length > 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/30">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-blue-700 dark:text-blue-300 font-semibold">You've seen all builders!</span>
              </div>
            </div>
          )}
          
          {/* Empty state */}
          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-4">No builders found</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullLeaderboard;
