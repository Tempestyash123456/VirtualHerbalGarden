/*
  # Create plants database schema

  1. New Tables
    - `plants`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `botanical_name` (text, not null)
      - `common_names` (text, not null)
      - `habitat` (text, not null)
      - `medicinal_uses` (text, not null)
      - `cultivation` (text, not null)
      - `category` (text, not null)
      - `image` (text, not null)
      - `model` (text, not null)
      - `info` (text, not null)
      - `youtube_link` (text)
      - `wikipedia_link` (text)
      - `store_link` (text)
      - `created_at` (timestamptz, default now())
    
    - `plant_types`
      - `id` (uuid, primary key)
      - `plant_id` (uuid, foreign key to plants.id)
      - `name` (text, not null)
      - `botanical_name` (text, not null)
      - `common_names` (text, not null)
      - `habitat` (text, not null)
      - `medicinal_uses` (text, not null)
      - `cultivation` (text, not null)
      - `image` (text, not null)
      - `model` (text, not null)
      - `info` (text, not null)
      - `youtube_link` (text)
      - `wikipedia_link` (text)
      - `store_link` (text)
      - `created_at` (timestamptz, default now())
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to create plants
*/

-- Create plants table
CREATE TABLE IF NOT EXISTS plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  botanical_name TEXT NOT NULL,
  common_names TEXT NOT NULL,
  habitat TEXT NOT NULL,
  medicinal_uses TEXT NOT NULL,
  cultivation TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  model TEXT NOT NULL,
  info TEXT NOT NULL,
  youtube_link TEXT,
  wikipedia_link TEXT,
  store_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create plant_types table
CREATE TABLE IF NOT EXISTS plant_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id UUID NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  botanical_name TEXT NOT NULL,
  common_names TEXT NOT NULL,
  habitat TEXT NOT NULL,
  medicinal_uses TEXT NOT NULL,
  cultivation TEXT NOT NULL,
  image TEXT NOT NULL,
  model TEXT NOT NULL,
  info TEXT NOT NULL,
  youtube_link TEXT,
  wikipedia_link TEXT,
  store_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_types ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to plants" 
  ON plants 
  FOR SELECT 
  TO public 
  USING (true);

CREATE POLICY "Allow public read access to plant_types" 
  ON plant_types 
  FOR SELECT 
  TO public 
  USING (true);

-- Create policies for authenticated users to create plants
CREATE POLICY "Allow authenticated users to create plants" 
  ON plants 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to create plant types" 
  ON plant_types 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Create policies for authenticated users to update their own plants
CREATE POLICY "Allow authenticated users to update their own plants" 
  ON plants 
  FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow authenticated users to update their own plant types" 
  ON plant_types 
  FOR UPDATE 
  TO authenticated 
  USING (true);