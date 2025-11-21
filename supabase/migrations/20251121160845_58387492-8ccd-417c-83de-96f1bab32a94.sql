-- Add admin response columns to reviews table
ALTER TABLE public.reviews
ADD COLUMN admin_response TEXT,
ADD COLUMN admin_response_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN admin_responder_id UUID REFERENCES auth.users(id);