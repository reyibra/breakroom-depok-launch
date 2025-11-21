-- Create promos table
CREATE TABLE public.promos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  discount_percentage integer,
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  event_date timestamp with time zone NOT NULL,
  location text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Anyone can view active promos and events
CREATE POLICY "Anyone can view active promos"
ON public.promos
FOR SELECT
USING (is_active = true);

CREATE POLICY "Anyone can view active events"
ON public.events
FOR SELECT
USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX idx_promos_active ON public.promos(is_active, start_date, end_date);
CREATE INDEX idx_events_active ON public.events(is_active, event_date);