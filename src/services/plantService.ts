import { supabase } from '../lib/supabase';
import { Plant, PlantType, mapPlantFromDB, mapPlantToDB, mapPlantTypeToDB } from '../types/plant';

export const fetchPlants = async (): Promise<Plant[]> => {
  try {
    const { data: plantsData, error: plantsError } = await supabase
      .from('plants')
      .select('*')
      .order('name');

    if (plantsError) throw plantsError;
    if (!plantsData) return [];

    const plants = await Promise.all(
      plantsData.map(async (plant) => {
        const { data: typesData, error: typesError } = await supabase
          .from('plant_types')
          .select('*')
          .eq('plant_id', plant.id)
          .order('name');

        if (typesError) throw typesError;

        return mapPlantFromDB(plant, typesData || []);
      })
    );

    return plants;
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

export const fetchPlantsByCategory = async (category: string): Promise<Plant[]> => {
  try {
    const { data: plantsData, error: plantsError } = await supabase
      .from('plants')
      .select('*')
      .eq('category', category)
      .order('name');

    if (plantsError) throw plantsError;
    if (!plantsData) return [];

    const plants = await Promise.all(
      plantsData.map(async (plant) => {
        const { data: typesData, error: typesError } = await supabase
          .from('plant_types')
          .select('*')
          .eq('plant_id', plant.id)
          .order('name');

        if (typesError) throw typesError;

        return mapPlantFromDB(plant, typesData || []);
      })
    );

    return plants;
  } catch (error) {
    console.error(`Error fetching plants for category ${category}:`, error);
    return [];
  }
};

export const addPlant = async (plant: Plant): Promise<Plant | null> => {
  try {
    const plantData = mapPlantToDB(plant);
    
    const { data: insertedPlant, error: insertError } = await supabase
      .from('plants')
      .insert(plantData)
      .select()
      .single();

    if (insertError) throw insertError;
    if (!insertedPlant) throw new Error('Failed to insert plant');

    if (plant.types && plant.types.length > 0) {
      const typesData = plant.types.map(type => mapPlantTypeToDB(type, insertedPlant.id));
      
      const { error: typesError } = await supabase
        .from('plant_types')
        .insert(typesData);

      if (typesError) throw typesError;
    }

    // Fetch the complete plant with types
    const { data: plantWithTypes, error: fetchError } = await supabase
      .from('plants')
      .select('*')
      .eq('id', insertedPlant.id)
      .single();

    if (fetchError) throw fetchError;

    const { data: typesData, error: typesError } = await supabase
      .from('plant_types')
      .select('*')
      .eq('plant_id', insertedPlant.id);

    if (typesError) throw typesError;

    return mapPlantFromDB(plantWithTypes, typesData || []);
  } catch (error) {
    console.error('Error adding plant:', error);
    return null;
  }
};

export const searchPlants = async (query: string): Promise<Plant[]> => {
  try {
    const { data: plantsData, error: plantsError } = await supabase
      .from('plants')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name');

    if (plantsError) throw plantsError;
    if (!plantsData) return [];

    const plants = await Promise.all(
      plantsData.map(async (plant) => {
        const { data: typesData, error: typesError } = await supabase
          .from('plant_types')
          .select('*')
          .eq('plant_id', plant.id)
          .order('name');

        if (typesError) throw typesError;

        return mapPlantFromDB(plant, typesData || []);
      })
    );

    return plants;
  } catch (error) {
    console.error(`Error searching plants for "${query}":`, error);
    return [];
  }
};

// Function to seed initial data from JSON to Supabase
export const seedPlantsData = async (plantsData: any[]): Promise<void> => {
  try {
    // First check if we already have plants in the database
    const { count, error: countError } = await supabase
      .from('plants')
      .select('*', { count: 'exact', head: true });
    
    if (countError) throw countError;
    
    // Only seed if the database is empty
    if (count === 0) {
      console.log('Seeding plants data to Supabase...');
      
      // Insert plants one by one
      for (const plant of plantsData) {
        const plantData = {
          name: plant.name,
          botanical_name: plant.botanicalName,
          common_names: plant.commonNames,
          habitat: plant.habitat,
          medicinal_uses: plant.medicinalUses,
          cultivation: plant.cultivation,
          category: plant.category,
          image: plant.image,
          model: plant.model || "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
          info: plant.info,
          youtube_link: plant.youtubeLink || "https://www.youtube.com",
          wikipedia_link: plant.wikipediaLink || "https://www.wikipedia.org",
          store_link: plant.storeLink || "https://www.amazon.com"
        };
        
        const { data: insertedPlant, error: insertError } = await supabase
          .from('plants')
          .insert(plantData)
          .select();
        
        if (insertError) throw insertError;
        
        // If plant has types, insert them
        if (plant.types && plant.types.length > 0 && insertedPlant && insertedPlant.length > 0) {
          const plantId = insertedPlant[0].id;
          
          for (const type of plant.types) {
            const typeData = {
              plant_id: plantId,
              name: type.name,
              botanical_name: type.botanicalName,
              common_names: type.commonNames,
              habitat: type.habitat,
              medicinal_uses: type.medicinalUses,
              cultivation: type.cultivation,
              image: type.image,
              model: type.model || "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
              info: type.info,
              youtube_link: type.youtubeLink || "https://www.youtube.com",
              wikipedia_link: type.wikipediaLink || "https://www.wikipedia.org",
              store_link: type.storeLink || "https://www.amazon.com"
            };
            
            const { error: typeInsertError } = await supabase
              .from('plant_types')
              .insert(typeData);
            
            if (typeInsertError) throw typeInsertError;
          }
        }
      }
      
      console.log('Plants data seeded successfully!');
    } else {
      console.log('Database already contains plants. Skipping seed operation.');
    }
  } catch (error) {
    console.error('Error seeding plants data:', error);
  }
};