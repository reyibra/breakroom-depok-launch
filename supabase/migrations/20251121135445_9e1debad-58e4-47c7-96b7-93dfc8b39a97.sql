-- Add promo_code field to promos table
ALTER TABLE public.promos 
ADD COLUMN promo_code TEXT;