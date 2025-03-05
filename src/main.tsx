import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { seedPlantsData } from './services/plantService';

// Sample plants data for initial seeding
const plantsData = [
  {
    "name": "Aloe Vera",
    "botanicalName": "Aloe barbadensis miller",
    "commonNames": "Aloe, Ghrita Kumari",
    "habitat": "Dry regions",
    "medicinalUses": "Skin care, wound healing, digestion",
    "cultivation": "Requires well-drained soil and moderate watering",
    "category": "ayurvedic",
    "image": "https://vgrgardens.com/wp-content/uploads/2024/09/Alovera-plant.jpeg",
    "model": "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    "info": "Aloe Vera is widely used for medicinal and cosmetic purposes.",
    "youtubeLink": "https://www.youtube.com/watch?v=dQw4w9WgX.",
  "metadata": {
    "id": "dark-mode-and-supabase-integration-continued",
    "title": "Continue Implementing GeeksforGeeks-style Dark Mode and Supabase Integration"
  }
  }
]

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);