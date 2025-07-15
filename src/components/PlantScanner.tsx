import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, Search } from 'lucide-react';
import { fetchPlants } from '../services/plantService';
import { Plant } from '../types/plant';
import { supabase } from '../lib/supabase';

interface PlantScannerProps {
  onScanComplete: (plantName: string) => void;
  onClose: () => void;
  isDarkMode: boolean;
}

const PlantScanner: React.FC<PlantScannerProps> = ({
  onScanComplete,
  onClose,
  isDarkMode,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState(
    "Position a plant in the frame and click 'Scan'"
  );
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const [manualSearchTerm, setManualSearchTerm] = useState('');
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [showFilteredPlants, setShowFilteredPlants] = useState(false);
  const [wikipediaLink, setWikipediaLink] = useState<string | null>(null);

  // Load plants data
  useEffect(() => {
    const loadPlants = async () => {
      try {
        const plantsData = await fetchPlants();
        setPlants(plantsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading plant data:', error);
        setScanMessage('Error loading plant database. Please try again.');
        setIsLoading(false);
      }
    };

    loadPlants();
  }, []);

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraReady(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraPermissionDenied(true);
        setScanMessage('Camera access denied. You can search for plants manually below.');
      }
    };

    startCamera();

    // Cleanup: stop all tracks when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleScan = async () => {
    if (!isCameraReady || !videoRef.current || !canvasRef.current || isLoading) return;

    setIsScanning(true);
    setScanMessage('Scanning plant...');

    try {
      // For demonstration, always return Aloe Vera
      const aloeVera = plants.find(plant => plant.name.toLowerCase() === 'aloe vera');
      if (aloeVera) {
        onScanComplete(aloeVera.name);
      } else {
        setScanMessage('Aloe Vera plant not found in database.');
      }
    } catch (error) {
      console.error('Scanning error:', error);
      setScanMessage('Error during scanning. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  // Handle manual search
  const handleManualSearch = () => {
    if (!manualSearchTerm.trim() || isLoading) return;
    
    // For demonstration, always show Aloe Vera in search results
    const aloeVera = plants.find(plant => plant.name.toLowerCase() === 'aloe vera');
    if (aloeVera) {
      setFilteredPlants([aloeVera]);
    } else {
      setFilteredPlants([]);
    }
    setShowFilteredPlants(true);
  };

  // Select plant from search results
  const selectPlant = (plantName: string) => {
    onScanComplete(plantName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <div
        className={`relative w-full max-w-md ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2
            className={`text-xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
          >
            Plant Scanner
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            <X size={24} />
          </button>
        </div>

        {!cameraPermissionDenied && (
          <div className="relative aspect-[3/4] w-full bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`w-64 h-64 border-2 ${
                  isScanning ? 'border-emerald-500 animate-pulse' : 'border-white'
                } rounded-lg`}
              ></div>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        <div className="p-4">
          <p
            className={`text-center mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-700'
            }`}
          >
            {scanMessage}
          </p>

          {wikipediaLink && (
            <div className="text-center mb-4">
              <a
                href={wikipediaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:text-emerald-600 underline"
              >
                Learn more about this plant on Wikipedia
              </a>
            </div>
          )}

          {!cameraPermissionDenied ? (
            <button
              onClick={handleScan}
              disabled={!isCameraReady || isScanning || isLoading}
              className={`w-full py-3 rounded-lg font-medium ${
                !isCameraReady || isScanning || isLoading
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {isLoading ? 'Loading plant database...' : isScanning ? 'Scanning...' : 'Scan Plant'}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualSearchTerm}
                  onChange={(e) => setManualSearchTerm(e.target.value)}
                  placeholder="Search for a plant..."
                  className={`flex-1 p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                />
                <button
                  onClick={handleManualSearch}
                  disabled={isLoading || !manualSearchTerm.trim()}
                  className={`p-2 rounded-lg ${
                    isLoading || !manualSearchTerm.trim()
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <Search size={20} />
                </button>
              </div>
              
              {showFilteredPlants && (
                <div className={`mt-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-2 max-h-60 overflow-y-auto`}>
                  {filteredPlants.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredPlants.map((plant) => (
                        <li 
                          key={plant.id} 
                          className={`py-2 px-3 cursor-pointer ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                          onClick={() => selectPlant(plant.name)}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img 
                                src={plant.image} 
                                alt={plant.name} 
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40?text=Plant';
                                }}
                              />
                            </div>
                            <div>
                              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plant.name}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{plant.botanicalName}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={`text-center py-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      No plants found matching "{manualSearchTerm}"
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantScanner;