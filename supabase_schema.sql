-- Supabase Database Initialization Script
-- Copy and paste this script into your Supabase SQL Editor and run it!

-- 1. Create the notes table
CREATE TABLE IF NOT EXISTS public.notes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  color TEXT DEFAULT 'slate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- 3. Create a Policy to allow public READ access
CREATE POLICY "Allow public select" 
  ON public.notes 
  FOR SELECT 
  USING (true);

-- 4. Create a Policy to allow public INSERT access
CREATE POLICY "Allow public insert" 
  ON public.notes 
  FOR INSERT 
  WITH CHECK (true);

-- 5. Create a Policy to allow public DELETE access
CREATE POLICY "Allow public delete" 
  ON public.notes 
  FOR DELETE 
  USING (true);
