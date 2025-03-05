import React from 'react';
import { Plant } from '../types/plant';

interface AddPlantFormProps {
  onSubmit: (plant: Plant) => void;
  onCancel: () => void;
  isDarkMode: boolean;
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onSubmit, onCancel, isDarkMode }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newPlant: Plant = {
      name: formData.get('name') as string,
      botanicalName: formData.get('botanicalName') as string,
      commonNames: formData.get('commonNames') as string,
      habitat: formData.get('habitat') as string,
      medicinalUses: formData.get('medicinalUses') as string,
      cultivation: formData.get('cultivation') as string,
      category: formData.get('category') as string,
      image: formData.get('image') as string,
      model: formData.get('model') as string || "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
      info: formData.get('info') as string,
      youtubeLink: formData.get('youtubeLink') as string || "https://www.youtube.com",
      wikipediaLink: formData.get('wikipediaLink') as string || "https://www.wikipedia.org",
      storeLink: formData.get('storeLink') as string || "https://www.amazon.com",
      types: []
    };
    
    onSubmit(newPlant);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4 overflow-y-auto">
      <div className={`relative w-full max-w-2xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-emerald-100 to-teal-100 text-gray-900'} rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto`}>
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded hover:bg-black z-10"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-4">Add New Plant</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Plant Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                className="w-full p-2 rounded text-gray-900"
              />
            </div>
            
            <div>
              <label className="block mb-1">Botanical Name</label>
              <input 
                type="text" 
                name="botanicalName" 
                required 
                className="w-full p-2 rounded text-gray-900"
              />
            </div>
            
            <div>
              <label className="block mb-1">Common Names</label>
              <input 
                type="text" 
                name="commonNames" 
                required 
                className="w-full p-2 rounded text-gray-900"
              />
            </div>
            
            <div>
              <label className="block mb-1">Category</label>
              <select 
                name="category" 
                required 
                className="w-full p-2 rounded text-gray-900"
              >
                <option value="ayurvedic">Ayurvedic</option>
                <option value="immunity">Immunity Boosters</option>
                <option value="drugs">Drugs</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1">Habitat</label>
              <textarea 
                name="habitat" 
                required 
                className="w-full p-2 rounded text-gray-900"
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Medicinal Uses</label>
              <textarea 
                name="medicinalUses" 
                required 
                className="w-full p-2 rounded text-gray-900"
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Cultivation</label>
              <textarea 
                name="cultivation" 
                required 
                className="w-full p-2 rounded text-gray-900"
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Additional Info</label>
              <textarea 
                name="info" 
                required 
                className="w-full p-2 rounded text-gray-900"
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Image URL</label>
              <input 
                type="url" 
                name="image" 
                required 
                className="w-full p-2 rounded text-gray-900"
              />
            </div>
            
            <div>
              <label className="block mb-1">3D Model URL</label>
              <input 
                type="url" 
                name="model" 
                className="w-full p-2 rounded text-gray-900"
                placeholder="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
              />
            </div>
            
            <div>
              <label className="block mb-1">YouTube Link</label>
              <input 
                type="url" 
                name="youtubeLink" 
                className="w-full p-2 rounded text-gray-900"
              />
            </div>
            
            <div>
              <label className="block mb-1">Wikipedia Link</label>
              <input 
                type="url" 
                name="wikipediaLink" 
                className="w-full p-2 rounded text-gray-900"
              />
            </div>
            
            <div>
              <label className="block mb-1">Store Link</label>
              <input 
                type="url" 
                name="storeLink" 
                className="w-full p-2 rounded text-gray-900"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button 
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
            >
              Add Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlantForm;