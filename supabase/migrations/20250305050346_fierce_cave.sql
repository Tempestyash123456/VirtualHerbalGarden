/*
  # Create forum messages table

  1. New Tables
    - `forum_messages`
      - `id` (uuid, primary key)
      - `author` (text)
      - `content` (text)
      - `is_bold` (boolean)
      - `is_italic` (boolean)
      - `is_align_center` (boolean)
      - `image_url` (text, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `forum_messages` table
    - Add policy for public read access
    - Add policy for authenticated users to create messages
*/

CREATE TABLE IF NOT EXISTS forum_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  is_bold BOOLEAN DEFAULT false,
  is_italic BOOLEAN DEFAULT false,
  is_align_center BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE forum_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to forum messages"
  ON forum_messages
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated users to create messages
CREATE POLICY "Allow authenticated users to create forum messages"
  ON forum_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);