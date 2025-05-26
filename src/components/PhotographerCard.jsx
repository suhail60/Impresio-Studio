import { Link } from 'react-router-dom';

export default function PhotographerCard({ photographer, onViewProfile }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-200">
        {photographer.profilePic && (
          <img 
            src={photographer.profilePic} 
            alt={photographer.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{photographer.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {photographer.rating.toFixed(1)} ★
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{photographer.location}</p>
        <p className="text-gray-800 font-medium mb-3">Starting from ₹{photographer.price.toLocaleString()}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {photographer.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <button 
          onClick={() => onViewProfile(photographer.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}