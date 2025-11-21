-- Create storage bucket for news images
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for news-images bucket
CREATE POLICY "Admins can upload news images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'news-images' AND
  (storage.foldername(name))[1] = 'news'
);

CREATE POLICY "Anyone can view news images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'news-images');

CREATE POLICY "Admins can update news images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'news-images');

CREATE POLICY "Admins can delete news images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'news-images');