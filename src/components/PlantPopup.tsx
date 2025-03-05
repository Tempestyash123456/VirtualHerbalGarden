import React from 'react';
import { Plant, PlantType } from '../types/plant';
import { Youtube, Globe, ShoppingCart } from 'lucide-react';

interface PlantPopupProps {
  selectedPlant: Plant | null;
  popupHistory: Plant[];
  isDarkMode: boolean;
  onClose: () => void;
  onBack: () => void;
  onTypeSelect: (type: PlantType, fromType: boolean) => void;
}

const PlantPopup: React.FC<PlantPopupProps> = ({
  selectedPlant,
  popupHistory,
  isDarkMode,
  onClose,
  onBack,
  onTypeSelect
}) => {
  if (!selectedPlant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4 overflow-y-auto">
      <div className={`relative w-full max-w-4xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-emerald-100 to-teal-100 text-gray-900'} rounded-lg shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[90vh] overflow-y-auto`}>
        {/* Floating Back and Close Buttons */}
        <div className="fixed top-4 left-4 z-50 flex space-x-2">
          {popupHistory.length > 1 && (
            <button
              onClick={onBack}
              className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-black z-10"
            >
              Back
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-black z-10"
          >
            &times;
          </button>
        </div>

        {/* 3D Model */}
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-emerald-100'} rounded-lg p-2 h-[400px] relative`}>
          <model-viewer
            src={selectedPlant.model}
            alt={`3D model of ${selectedPlant.name}`}
            ar
            auto-rotate
            camera-controls
            style={{width: '100%', height: '100%'}}
          ></model-viewer>
        </div>

        {/* Plant Info */}
        <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-emerald-100'} rounded-lg p-4 overflow-y-auto`}>
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-bold">{selectedPlant.name}</h2>
            <div className="ml-auto flex space-x-2">
              <a href={selectedPlant.youtubeLink} target="_blank" rel="noopener noreferrer" className="text-red-500">
                <Youtube size={24} />
              </a>
              <a href={selectedPlant.wikipediaLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                <Globe size={24} />
              </a>
              <a href={selectedPlant.storeLink} target="_blank" rel="noopener noreferrer" className="text-green-500">
                <ShoppingCart size={24} />
              </a>
            </div>
          </div>

          <p className="mb-4">{selectedPlant.info}</p>

          <ul className="space-y-2 mb-4">
            <li><b>Botanical Name:</b> {selectedPlant.botanicalName || "NA"}</li>
            <li><b>Common Names:</b> {selectedPlant.commonNames || "NA"}</li>
            <li><b>Habitat:</b> {selectedPlant.habitat || "NA"}</li>
            <li><b>Medicinal Uses:</b> {selectedPlant.medicinalUses || "NA"}</li>
            <li><b>Cultivation:</b> {selectedPlant.cultivation || "NA"}</li>
          </ul>

          {/* Types Panel */}
          {selectedPlant.types && selectedPlant.types.length > 0 && (
            <div className={`mt-4 ${isDarkMode ? 'bg-gray-600' : 'bg-emerald-200'} p-4 rounded-lg`}>
              <h3 className="font-bold mb-2">Types</h3>
              <div className="space-y-2">
                {selectedPlant.types.map((type, index) => (
                  <div
                    key={index}
                    className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-emerald-300 hover:bg-emerald-400'} p-2 rounded cursor-pointer transition-colors`}
                    onClick={() => onTypeSelect(type, true)}
                  >
                    {type.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantPopup;