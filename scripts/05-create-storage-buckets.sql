-- Create storage bucket for Allô Dakar files
-- Run this in Supabase SQL editor

-- Create bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('allodakar', 'allodakar', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Users can upload their own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'allodakar' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view all files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'allodakar');

CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'allodakar' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'allodakar' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
