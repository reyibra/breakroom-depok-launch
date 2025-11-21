-- Create news table for latest news and updates
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view active news
CREATE POLICY "Anyone can view active news"
ON public.news
FOR SELECT
USING (is_active = true);

-- Create index for better query performance
CREATE INDEX idx_news_published_at ON public.news(published_at DESC);
CREATE INDEX idx_news_is_active ON public.news(is_active);