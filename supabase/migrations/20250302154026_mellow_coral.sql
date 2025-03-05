/*
  # Seed plants data

  1. Data Seeding
    - Inserts initial plant data into the `plants` table
    - Inserts plant types data into the `plant_types` table
  2. Notes
    - This migration adds sample data for the Virtual Herbal Garden
    - Each plant has basic information and some have related types
*/

-- Insert plants data
INSERT INTO plants (id, name, botanical_name, common_names, habitat, medicinal_uses, cultivation, category, image, model, info, youtube_link, wikipedia_link, store_link)
VALUES
  (gen_random_uuid(), 'Aloe Vera', 'Aloe barbadensis miller', 'Aloe, Ghrita Kumari', 'Dry regions', 'Skin care, wound healing, digestion', 'Requires well-drained soil and moderate watering', 'ayurvedic', 'https://vgrgardens.com/wp-content/uploads/2024/09/Alovera-plant.jpeg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Aloe Vera is widely used for medicinal and cosmetic purposes.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Aloe_vera', 'https://www.amazon.com/s?k=aloe+vera+products'),
  
  (gen_random_uuid(), 'Tulsi', 'Ocimum sanctum', 'Holy Basil', 'Tropical regions', 'Boosts immunity, treats cough and cold', 'Grows well in warm climate with ample sunlight', 'immunity', 'https://www.greendna.in/cdn/shop/products/1296x728_Holy_Basil_1155x.jpg?v=1591462900', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Tulsi is revered in Ayurveda for its healing properties.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Tulsi', 'https://www.amazon.com/s?k=tulsi+products'),
  
  (gen_random_uuid(), 'Neem', 'Azadirachta indica', 'Indian Lilac', 'Tropical and semi-tropical regions', 'Purifies blood, treats skin disorders', 'Thrives in well-drained soil and full sunlight', 'ayurvedic', 'https://m.media-amazon.com/images/I/61qFnvqr46L._AC_UF1000,1000_QL80_.jpg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Neem is a versatile plant used in traditional medicine.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Neem', 'https://www.amazon.com/s?k=neem+products'),
  
  (gen_random_uuid(), 'Ashwagandha', 'Withania somnifera', 'Indian Ginseng', 'Dry regions', 'Reduces stress, boosts energy', 'Prefers well-drained soil and sunny conditions', 'immunity', 'https://m.media-amazon.com/images/I/41U1Uz5Q9HL.jpg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Ashwagandha is a powerful adaptogen used in Ayurveda.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Ashwagandha', 'https://www.amazon.com/s?k=ashwagandha+products'),
  
  (gen_random_uuid(), 'Mint', 'Mentha', 'Pudina', 'Moist regions', 'Aids digestion, relieves headaches', 'Grows in moist, fertile soil', 'ayurvedic', 'https://cdn-prod.medicalnewstoday.com/content/images/articles/275/275944/mint-on-a-wooden-table.jpg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Mint is widely used for its refreshing aroma and medicinal properties.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Mint', 'https://www.amazon.com/s?k=mint+products'),
  
  (gen_random_uuid(), 'Brahmi', 'Bacopa monnieri', 'Water Hyssop', 'Wet, tropical regions', 'Improves memory, reduces anxiety', 'Thrives in wet soil and warm climates', 'immunity', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRm_hyH2epjG902Xg5h4iBsnYKpY45MOfRvAl2w4DWDk-4JSWCVX_jiPAYCznKUsQbcOnd3EcRcaWYuKOTjyqsvEg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Brahmi is renowned for its cognitive benefits.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Brahmi', 'https://www.amazon.com/s?k=brahmi+products'),
  
  (gen_random_uuid(), 'Fenugreek', 'Trigonella foenum-graecum', 'Methi', 'Dry and semi-arid regions', 'Controls blood sugar, enhances digestion', 'Grows in sandy loam soil with moderate watering', 'drugs', 'https://www.greendna.in/cdn/shop/products/methi1_3d692343-7719-403b-91d8-ca9550fa598d_600x.jpg?v=1672577996', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Fenugreek seeds are widely used in traditional medicine.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Fenugreek', 'https://www.amazon.com/s?k=fenugreek+products'),
  
  (gen_random_uuid(), 'Hibiscus', 'Hibiscus rosa-sinensis', 'Gurhal', 'Tropical and subtropical regions', 'Promotes hair health, supports cardiovascular health', 'Requires rich, well-drained soil and full sunlight', 'ayurvedic', 'https://plantsguru.com/cdn/shop/files/pg-hibiscus-red-desi.png?v=1735616608', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Hibiscus flowers are known for their vibrant color and medicinal benefits.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Hibiscus', 'https://www.amazon.com/s?k=hibiscus+products'),
  
  (gen_random_uuid(), 'Turmeric', 'Curcuma longa', 'Haldi', 'Tropical regions', 'Anti-inflammatory, enhances skin health', 'Thrives in warm, humid conditions and loamy soil', 'immunity', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgcybzPhezEBBZ8srCtDtDogeF3chlpO9B_w&s', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Turmeric is a staple in traditional medicine and cuisine.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Turmeric', 'https://www.amazon.com/s?k=turmeric+products'),
  
  (gen_random_uuid(), 'Ginger', 'Zingiber officinale', 'Adrak', 'Tropical and subtropical regions', 'Relieves nausea, boosts immunity', 'Requires fertile, well-drained soil and warm climate', 'immunity', 'https://www.garnierusa.com/-/media/project/loreal/brand-sites/garnier/usa/us/articles_new/strengthen-fragile-hair-with-ginger/garnier_article-header_ginger.jpg?rev=07e043606da3401aa15837849d8fef41&h=496&w=890&la=en&hash=C756272A42D8E095BF63E44BA3DE2897', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Ginger is widely used for its therapeutic properties.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Ginger', 'https://www.amazon.com/s?k=ginger+products'),
  
  (gen_random_uuid(), 'Lemongrass', 'Cymbopogon', 'Lemongrass', 'Tropical and subtropical regions', 'Reduces stress, improves digestion', 'Thrives in sandy, well-drained soil and sunny conditions', 'miscellaneous', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToHtzJs_FPMCJhTft0aTrlP0XpbDPI3PcYeA5IHMq0WakbwUp5daScptodgq0PXfZUHlz7HMqt5ZuVCXpesGM19zWIklQnLw2h6MxHtQ', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Lemongrass is used in aromatherapy and traditional medicine.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Lemongrass', 'https://www.amazon.com/s?k=lemongrass+products');

-- Get the ID of Aloe Vera to add types
DO $$
DECLARE
  aloe_id UUID;
BEGIN
  SELECT id INTO aloe_id FROM plants WHERE name = 'Aloe Vera' LIMIT 1;
  
  -- Insert types for Aloe Vera
  IF aloe_id IS NOT NULL THEN
    INSERT INTO plant_types (id, plant_id, name, botanical_name, common_names, habitat, medicinal_uses, cultivation, image, model, info, youtube_link, wikipedia_link, store_link)
    VALUES
      (gen_random_uuid(), aloe_id, 'Aloe Vera 1', 'Aloe barbadensis miller var. 1', 'Aloe, Ghrita Kumari', 'Dry regions', 'Skin care, wound healing', 'Requires well-drained soil', 'https://vgrgardens.com/wp-content/uploads/2024/09/Alovera-plant.jpeg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'A specific variety of Aloe Vera with unique properties.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Aloe_vera', 'https://www.amazon.com/s?k=aloe+vera+products'),
      
      (gen_random_uuid(), aloe_id, 'Aloe Vera 2', 'Aloe barbadensis miller var. 2', 'Aloe, Ghrita Kumari', 'Dry regions', 'Skin care, wound healing', 'Requires well-drained soil', 'https://vgrgardens.com/wp-content/uploads/2024/09/Alovera-plant.jpeg', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Another variety of Aloe Vera with different properties.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Aloe_vera', 'https://www.amazon.com/s?k=aloe+vera+products');
  END IF;
END $$;

-- Get the ID of Tulsi to add types
DO $$
DECLARE
  tulsi_id UUID;
BEGIN
  SELECT id INTO tulsi_id FROM plants WHERE name = 'Tulsi' LIMIT 1;
  
  -- Insert types for Tulsi
  IF tulsi_id IS NOT NULL THEN
    INSERT INTO plant_types (id, plant_id, name, botanical_name, common_names, habitat, medicinal_uses, cultivation, image, model, info, youtube_link, wikipedia_link, store_link)
    VALUES
      (gen_random_uuid(), tulsi_id, 'Tulsi 1', 'Ocimum sanctum var. 1', 'Holy Basil', 'Tropical regions', 'Boosts immunity', 'Grows in warm climate', 'https://www.greendna.in/cdn/shop/products/1296x728_Holy_Basil_1155x.jpg?v=1591462900', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'A specific variety of Tulsi with unique properties.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Tulsi', 'https://www.amazon.com/s?k=tulsi+products'),
      
      (gen_random_uuid(), tulsi_id, 'Tulsi 2', 'Ocimum sanctum var. 2', 'Holy Basil', 'Tropical regions', 'Treats cough and cold', 'Grows in warm climate', 'https://www.greendna.in/cdn/shop/products/1296x728_Holy_Basil_1155x.jpg?v=1591462900', 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', 'Another variety of Tulsi with different properties.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://en.wikipedia.org/wiki/Tulsi', 'https://www.amazon.com/s?k=tulsi+products');
  END IF;
END $$;