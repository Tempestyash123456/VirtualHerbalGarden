import React from 'react';
import { Plant } from '../types/plant';

interface PlantCardProps {
  plant: Plant;
  onClick: (plant: Plant) => void;
  isDarkMode: boolean;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onClick, isDarkMode }) => {
  return (
    <div
      className={`w-full sm:w-64 h-72 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl relative ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-emerald-200 to-teal-200 text-gray-900'}`}
      onClick={() => onClick(plant)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(plant)}
    >
      <div className="h-40 overflow-hidden">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{plant.name}</h2>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>
          {plant.info.split(' ').slice(0, 10).join(' ')}...
        </p>
      </div>
      <div className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${isDarkMode ? 'bg-gray-900/80' : 'bg-emerald-500/80'}`}>
        <span className="px-4 py-2 rounded-full bg-white text-emerald-700 font-bold shadow-lg">
          View Details
        </span>
      </div>
    </div>
  );
};

export default PlantCard;