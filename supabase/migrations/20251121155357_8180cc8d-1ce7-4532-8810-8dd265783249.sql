-- Create galleries table for managing media content
CREATE TABLE public.galleries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for galleries
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

-- Policies for galleries
CREATE POLICY "Admins can view all galleries"
ON public.galleries
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active galleries"
ON public.galleries
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Admins can insert galleries"
ON public.galleries
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update galleries"
ON public.galleries
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete galleries"
ON public.galleries
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create faqs table for managing FAQ content
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for faqs
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Policies for faqs
CREATE POLICY "Admins can view all faqs"
ON public.faqs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can view active faqs"
ON public.faqs
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "Admins can insert faqs"
ON public.faqs
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update faqs"
ON public.faqs
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete faqs"
ON public.faqs
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for better query performance
CREATE INDEX idx_galleries_is_active ON public.galleries(is_active);
CREATE INDEX idx_galleries_display_order ON public.galleries(display_order);
CREATE INDEX idx_faqs_is_active ON public.faqs(is_active);
CREATE INDEX idx_faqs_category ON public.faqs(category);
CREATE INDEX idx_faqs_display_order ON public.faqs(display_order);