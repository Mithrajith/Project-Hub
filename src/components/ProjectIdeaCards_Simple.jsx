import React from 'react';

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

export default ProjectIdeaCards;
