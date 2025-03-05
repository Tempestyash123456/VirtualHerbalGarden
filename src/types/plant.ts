export interface PlantType {
  id?: string | number;
  name: string;
  botanicalName: string;
  commonNames: string;
  habitat: string;
  medicinalUses: string;
  cultivation: string;
  image: string;
  model: string;
  info: string;
  youtubeLink: string;
  wikipediaLink: string;
  storeLink: string;
}

export interface Plant extends PlantType {
  category: string;
  types?: PlantType[];
}

export interface PlantFromDB {
  id: string;
  name: string;
  botanical_name: string;
  common_names: string;
  habitat: string;
  medicinal_uses: string;
  cultivation: string;
  category: string;
  image: string;
  model: string;
  info: string;
  youtube_link: string;
  wikipedia_link: string;
  store_link: string;
  created_at?: string;
}

export interface PlantTypeFromDB {
  id: string;
  plant_id: string;
  name: string;
  botanical_name: string;
  common_names: string;
  habitat: string;
  medicinal_uses: string;
  cultivation: string;
  image: string;
  model: string;
  info: string;
  youtube_link: string;
  wikipedia_link: string;
  store_link: string;
  created_at?: string;
}

export const mapPlantFromDB = (plant: PlantFromDB, types?: PlantTypeFromDB[]): Plant => {
  return {
    id: plant.id,
    name: plant.name,
    botanicalName: plant.botanical_name,
    commonNames: plant.common_names,
    habitat: plant.habitat,
    medicinalUses: plant.medicinal_uses,
    cultivation: plant.cultivation,
    category: plant.category,
    image: plant.image,
    model: plant.model,
    info: plant.info,
    youtubeLink: plant.youtube_link,
    wikipediaLink: plant.wikipedia_link,
    storeLink: plant.store_link,
    types: types?.map(type => ({
      id: type.id,
      name: type.name,
      botanicalName: type.botanical_name,
      commonNames: type.common_names,
      habitat: type.habitat,
      medicinalUses: type.medicinal_uses,
      cultivation: type.cultivation,
      image: type.image,
      model: type.model,
      info: type.info,
      youtubeLink: type.youtube_link,
      wikipediaLink: type.wikipedia_link,
      storeLink: type.store_link
    }))
  };
};

export const mapPlantToDB = (plant: Plant) => {
  return {
    name: plant.name,
    botanical_name: plant.botanicalName,
    common_names: plant.commonNames,
    habitat: plant.habitat,
    medicinal_uses: plant.medicinalUses,
    cultivation: plant.cultivation,
    category: plant.category,
    image: plant.image,
    model: plant.model,
    info: plant.info,
    youtube_link: plant.youtubeLink,
    wikipedia_link: plant.wikipediaLink,
    store_link: plant.storeLink
  };
};

export const mapPlantTypeToDB = (plantType: PlantType, plantId: string | number) => {
  return {
    plant_id: plantId,
    name: plantType.name,
    botanical_name: plantType.botanicalName,
    common_names: plantType.commonNames,
    habitat: plantType.habitat,
    medicinal_uses: plantType.medicinalUses,
    cultivation: plantType.cultivation,
    image: plantType.image,
    model: plantType.model,
    info: plantType.info,
    youtube_link: plantType.youtubeLink,
    wikipedia_link: plantType.wikipediaLink,
    store_link: plantType.storeLink
  };
};