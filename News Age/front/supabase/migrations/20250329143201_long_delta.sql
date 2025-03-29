/*
  # Add channel relationship to articles table

  1. Changes
    - Add channel_id column to articles table
    - Add foreign key constraint to channels table
    - Add RLS policies for articles table
    - Add indexes for better query performance

  2. Security
    - Enable RLS on articles table
    - Add policies for authenticated users to:
      - View articles in their channels
      - Create articles in their channels
      - Update articles in their channels
      - Delete articles in their channels
*/

-- Add channel_id to articles table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'articles' AND column_name = 'channel_id'
  ) THEN
    ALTER TABLE articles 
    ADD COLUMN channel_id uuid REFERENCES channels(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies for articles
CREATE POLICY "Users can view articles in their channels"
  ON articles
  FOR SELECT
  TO authenticated
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create articles in their channels"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    channel_id IN (
      SELECT id FROM channels WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update articles in their channels"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete articles in their channels"
  ON articles
  FOR DELETE
  TO authenticated
  USING (
    channel_id IN (
      SELECT id FROM channels WHERE user_id = auth.uid()
    )
  );

-- Add index for better performance
CREATE INDEX IF NOT EXISTS articles_channel_id_idx ON articles(channel_id);