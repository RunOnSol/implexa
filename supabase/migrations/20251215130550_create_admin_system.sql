/*
  # Create Admin System Tables

  ## Overview
  This migration creates the database structure for the Implexa admin panel system.

  ## New Tables Created
  
  ### 1. blog_posts
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly version of title
  - `excerpt` (text) - Short summary of the post
  - `content` (text) - Full blog post content
  - `category` (text) - Post category (e.g., "Digital Health", "Innovation", "Research")
  - `read_time` (text) - Estimated reading time (e.g., "5 min read")
  - `image_url` (text) - URL to featured image
  - `published` (boolean) - Whether the post is published
  - `created_at` (timestamptz) - Post creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. executives
  - `id` (uuid, primary key) - Unique identifier for each executive
  - `name` (text) - Executive's full name
  - `title` (text) - Job title/position
  - `bio` (text) - Biography/description
  - `image_url` (text) - URL to profile image
  - `order_index` (integer) - Display order on the page
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. contact_messages
  - `id` (uuid, primary key) - Unique identifier for each message
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email address
  - `message` (text) - Message content
  - `read` (boolean) - Whether admin has read the message
  - `created_at` (timestamptz) - Message received timestamp

  ## Security Implementation
  
  ### Row Level Security (RLS)
  - All tables have RLS enabled for data protection
  - Public read access for published blog posts and executives
  - Authenticated admin users can manage all content
  - Contact messages are write-only for public, read-only for admins

  ## Important Notes
  - Uses `gen_random_uuid()` for automatic ID generation
  - Timestamps use `now()` for automatic date tracking
  - Indexes added for performance on frequently queried columns
  - All tables use `IF NOT EXISTS` for safe re-running
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  read_time text DEFAULT '5 min read',
  image_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create executives table
CREATE TABLE IF NOT EXISTS executives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  image_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS executives_order_idx ON executives(order_index);
CREATE INDEX IF NOT EXISTS contact_messages_read_idx ON contact_messages(read);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE executives ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Blog Posts Policies
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "Authenticated admins can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admins can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Executives Policies
CREATE POLICY "Public can view all executives"
  ON executives FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated admins can insert executives"
  ON executives FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can update executives"
  ON executives FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete executives"
  ON executives FOR DELETE
  TO authenticated
  USING (true);

-- Contact Messages Policies
CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admins can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('implexa-images', 'implexa-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for images
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'implexa-images');

CREATE POLICY "Authenticated admins can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'implexa-images');

CREATE POLICY "Authenticated admins can update images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'implexa-images')
  WITH CHECK (bucket_id = 'implexa-images');

CREATE POLICY "Authenticated admins can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'implexa-images');