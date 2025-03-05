import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, Search } from 'lucide-react';
import { fetchPlants } from '../services/plantService';
import { Plant } from '../types/plant';

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

  // Handle the scan button click
  const handleScan = async () => {
    if (!isCameraReady || !videoRef.current || !canvasRef.current || isLoading) return;

    setIsScanning(true);
    setScanMessage('Scanning plant...');

    // Capture image from video stream
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // In a real application, you would send this image to a plant recognition API
      // For now, we'll implement a simulated image analysis that searches for plants
      // based on dominant colors in the image
      
      // Get image data for analysis
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const plantName = analyzeImageAndFindPlant(imageData);
      
      if (plantName) {
        setScanMessage(`Plant identified: ${plantName}`);
        setTimeout(() => {
          onScanComplete(plantName);
        }, 1500);
      } else {
        setScanMessage('Could not identify plant. Please try again.');
        setTimeout(() => {
          setIsScanning(false);
        }, 1500);
      }
    }
  };

  // Handle manual search
  const handleManualSearch = () => {
    if (!manualSearchTerm.trim() || isLoading) return;
    
    const searchResults = plants.filter(plant => 
      plant.name.toLowerCase().includes(manualSearchTerm.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(manualSearchTerm.toLowerCase()) ||
      plant.commonNames.toLowerCase().includes(manualSearchTerm.toLowerCase())
    );
    
    setFilteredPlants(searchResults);
    setShowFilteredPlants(true);
  };

  // Select plant from search results
  const selectPlant = (plantName: string) => {
    onScanComplete(plantName);
  };

  // Analyze image and find matching plant
  // This is a simplified version that would be replaced with actual image recognition
  const analyzeImageAndFindPlant = (imageData: ImageData): string | null => {
    if (plants.length === 0) return null;
    
    // In a real application, this would use computer vision to identify plants
    // For this demo, we'll implement a basic color analysis to simulate plant recognition
    
    // Calculate dominant color in the image
    const dominantColor = getDominantColor(imageData);
    
    // Find plants that might match based on color (simulating real recognition)
    // In reality, this would be replaced with actual plant recognition algorithms
    const greenThreshold = 100; // Threshold for green detection
    
    if (dominantColor.g > greenThreshold && dominantColor.g > dominantColor.r && dominantColor.g > dominantColor.b) {
      // If image has dominant green, return a random plant from our database
      // In a real app, this would be based on actual recognition results
      const randomIndex = Math.floor(Math.random() * plants.length);
      return plants[randomIndex].name;
    } else {
      // If not predominantly green, try to match with specific plants based on color
      // This is still a simulation - real recognition would be much more sophisticated
      if (dominantColor.r > dominantColor.g && dominantColor.r > dominantColor.b) {
        // Reddish plants like Hibiscus
        const redPlants = plants.filter(p => 
          p.name.toLowerCase().includes('hibiscus') || 
          p.name.toLowerCase().includes('tulsi')
        );
        if (redPlants.length > 0) {
          return redPlants[0].name;
        }
      } else if (dominantColor.g > dominantColor.r && dominantColor.g > dominantColor.b) {
        // Green plants like Aloe, Neem
        const greenPlants = plants.filter(p => 
          p.name.toLowerCase().includes('aloe') || 
          p.name.toLowerCase().includes('neem') ||
          p.name.toLowerCase().includes('mint')
        );
        if (greenPlants.length > 0) {
          return greenPlants[0].name;
        }
      } else if (dominantColor.b > dominantColor.r && dominantColor.b > dominantColor.g) {
        // Bluish plants (rare, but could be lavender or similar)
        const bluePlants = plants.filter(p => 
          p.name.toLowerCase().includes('lavender') || 
          p.name.toLowerCase().includes('lemongrass')
        );
        if (bluePlants.length > 0) {
          return bluePlants[0].name;
        }
      } else if (dominantColor.r > 150 && dominantColor.g > 150 && dominantColor.b < 100) {
        // Yellowish plants like Turmeric
        const yellowPlants = plants.filter(p => 
          p.name.toLowerCase().includes('turmeric') || 
          p.name.toLowerCase().includes('ginger')
        );
        if (yellowPlants.length > 0) {
          return yellowPlants[0].name;
        }
      }
      
      // If no specific match, return a random plant
      // In a real app, this would return null or ask for a better image
      const randomIndex = Math.floor(Math.random() * plants.length);
      return plants[randomIndex].name;
    }
  };

  // Calculate dominant color in image
  const getDominantColor = (imageData: ImageData) => {
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    
    // Sample pixels at regular intervals for efficiency
    const sampleSize = 20;
    let count = 0;
    
    for (let i = 0; i < data.length; i += 4 * sampleSize) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    
    // Calculate average color
    return {
      r: Math.floor(r / count),
      g: Math.floor(g / count),
      b: Math.floor(b / count)
    };
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
            {/* Video feed from camera */}
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

            {/* Scanning overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div
                className={`w-64 h-64 border-2 ${
                  isScanning ? 'border-emerald-500 animate-pulse' : 'border-white'
                } rounded-lg`}
              ></div>
            </div>

            {/* Hidden canvas for capturing images */}
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