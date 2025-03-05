import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import { Plant } from './types/plant';
import { fetchPlants } from './services/plantService';
import LandingPage from './components/LandingPage';
import CategoryMenu from './components/CategoryMenu';
import PlantCard from './components/PlantCard';
import PlantPopup from './components/PlantPopup';
import PlantScanner from './components/PlantScanner';
import AddPlantForm from './components/AddPlantForm';
import {
  Leaf,
  Sun,
  Moon,
  PlusCircle,
  Menu,
  Search,
  Camera,
} from 'lucide-react';

function App() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [popupHistory, setPopupHistory] = useState<Plant[]>([]);
  const [showAddPlantPopup, setShowAddPlantPopup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanNotFound, setShowNotFound] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load plants data from Supabase
  useEffect(() => {
    const loadPlants = async () => {
      try {
        setIsLoading(true);
        const plantsData = await fetchPlants();
        setPlants(plantsData);
      } catch (error) {
        console.error('Error loading plant data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlants();
  }, []);

  // Check for dark mode preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark-mode') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scan result
  useEffect(() => {
    if (scanResult) {
      setSearchQuery(scanResult);
      // Check if plant exists in database
      const foundPlant = plants.find((plant) =>
        plant.name.toLowerCase().includes(scanResult.toLowerCase())
      );

      if (!foundPlant) {
        setShowNotFound(true);
        const timer = setTimeout(() => {
          setShowNotFound(false);
        }, 3000);
        return () => clearTimeout(timer);
      }

      setScanResult(null);
    }
  }, [scanResult, plants]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('theme');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    }
    setIsDarkMode(!isDarkMode);
  };

  // Filter plants based on category and search query
  const filteredPlants = plants.filter(
    (plant) =>
      (currentCategory === 'all' || plant.category === currentCategory) &&
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle scan completion
  const handleScanComplete = (plantName: string) => {
    setScanResult(plantName);
    setShowScanner(false);
  };

  // Show plant popup
  const showPlantPopup = (plant: Plant, fromType = false) => {
    setSelectedPlant(plant);

    if (fromType) {
      setPopupHistory((prev) => {
        if (!prev.some((p) => p.name === plant.name)) {
          return [...prev, plant];
        }
        return prev;
      });
    } else {
      setPopupHistory([plant]);
    }

    document.body.classList.add('popup-open');
  };

  // Close plant popup
  const closePlantPopup = () => {
    setSelectedPlant(null);
    document.body.classList.remove('popup-open');
  };

  // Go back to previous plant
  const goBackToPreviousPlant = () => {
    if (popupHistory.length > 1) {
      const newHistory = [...popupHistory];
      newHistory.pop();
      const previousPlant = newHistory[newHistory.length - 1];
      setSelectedPlant(previousPlant);
      setPopupHistory(newHistory);
    }
  };

  // Add new plant
  const handleAddPlant = async (plant: Plant) => {
    try {
      // Add plant to Supabase
      const { data, error } = await supabase
        .from('plants')
        .insert([
          {
            name: plant.name,
            botanical_name: plant.botanicalName,
            common_names: plant.commonNames,
            habitat: plant.habitat,
            medicinal_uses: plant.medicinalUses,
            cultivation: plant.cultivation,
            category: plant.category,
            image: plant.image,
            model:
              plant.model ||
              'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
            info: plant.info,
            youtube_link: plant.youtubeLink || 'https://www.youtube.com',
            wikipedia_link: plant.wikipediaLink || 'https://www.wikipedia.org',
            store_link: plant.storeLink || 'https://www.amazon.com',
          },
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        // Add to local state
        const newPlant: Plant = {
          id: data[0].id,
          name: data[0].name,
          botanicalName: data[0].botanical_name,
          commonNames: data[0].common_names,
          habitat: data[0].habitat,
          medicinalUses: data[0].medicinal_uses,
          cultivation: data[0].cultivation,
          category: data[0].category,
          image: data[0].image,
          model: data[0].model,
          info: data[0].info,
          youtubeLink: data[0].youtube_link,
          wikipediaLink: data[0].wikipedia_link,
          storeLink: data[0].store_link,
          types: [],
        };

        setPlants([...plants, newPlant]);
      }

      setShowAddPlantPopup(false);
    } catch (error) {
      console.error('Error adding plant:', error);
      alert('Failed to add plant. Please try again.');
    }
  };

  // Close search input when clicking outside
  const handleClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setShowSearchInput(false);
    }
  };

  // If showing landing page
  if (showLandingPage) {
    return (
      <LandingPage
        onEnter={() => setShowLandingPage(false)}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-emerald-50 text-gray-900'
      }`}
      onClick={handleClickOutside}
    >
      {/* Intro Animation */}
      {showIntro && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-[180px] text-emerald-500 animate-pulse">VHG</div>
        </div>
      )}

      {/* Header */}
      <header
        className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-emerald-700'
        } py-3 px-4 relative shadow-md`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-300 overflow-hidden flex items-center justify-center bg-white mr-3">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-xl font-bold text-white hidden sm:block">
              Virtual Herbal Garden
            </h1>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 relative">
            {/* Plant Scanner */}
            <button
              onClick={() => setShowScanner(true)}
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              title="Scan Plant"
            >
              <Camera size={20} />
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              title="Search"
            >
              <Search size={20} />
            </button>

            {/* Floating Search Space */}
            {showSearchInput && (
              <div
                ref={searchRef}
                className="absolute inset-x-0 top-full mt-2 flex items-center justify-center z-50 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg"
              >
                <div className="w-full max-w-md p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                  <input
                    type="text"
                    placeholder="Search for a plant..."
                    className="w-full p-2 rounded-full text-sm dark:bg-gray-700 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Category Menu Toggle */}
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              title="Categories"
            >
              <Menu size={20} />
            </button>

            {/* Add Plant Button */}
            <button
              onClick={() => setShowAddPlantPopup(true)}
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              title="Add New Plant"
            >
              <PlusCircle size={20} />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              title={
                isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
              }
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Category Menu - Now as a dropdown */}
      {showCategoryMenu && (
        <div className="absolute right-4 top-16 z-30 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          <CategoryMenu
            currentCategory={currentCategory}
            onCategoryChange={(category) => {
              setCurrentCategory(category);
              setShowCategoryMenu(false);
            }}
            isDarkMode={isDarkMode}
          />
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-5 ${
          isDarkMode ? 'bg-gray-900' : 'bg-emerald-50'
        } transition-opacity duration-1000 opacity-100`}
      >
        {/* Current Category Display */}
        <div className="mb-6 text-center">
          <h2
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-emerald-800'
            }`}
          >
            {currentCategory === 'all'
              ? 'All Plants'
              : currentCategory === 'ayurvedic'
              ? 'Ayurvedic Plants'
              : currentCategory === 'immunity'
              ? 'Immunity Boosters'
              : currentCategory === 'drugs'
              ? 'Medicinal Drugs'
              : 'Miscellaneous Plants'}
          </h2>
          <p
            className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-emerald-600'
            }`}
          >
            {filteredPlants.length} plants found
          </p>

          {/* Plant not found message */}
          {scanNotFound && (
            <div className="mt-2 p-2 bg-red-500 text-white rounded-md inline-block">
              Plant does not exist in our database
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onClick={showPlantPopup}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}
      </main>

      {/* Plant Details Popup */}
      {selectedPlant && (
        <PlantPopup
          selectedPlant={selectedPlant}
          popupHistory={popupHistory}
          isDarkMode={isDarkMode}
          onClose={closePlantPopup}
          onBack={goBackToPreviousPlant}
          onTypeSelect={(type, fromType) =>
            showPlantPopup(type as Plant, fromType)
          }
        />
      )}

      {/* Add Plant Popup */}
      {showAddPlantPopup && (
        <AddPlantForm
          onSubmit={handleAddPlant}
          onCancel={() => setShowAddPlantPopup(false)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Plant Scanner */}
      {showScanner && (
        <PlantScanner
          onScanComplete={handleScanComplete}
          onClose={() => setShowScanner(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}

export default App;
