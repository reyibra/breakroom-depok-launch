-- Fix security definer view issue
-- Use security_invoker = true for better security (uses caller's permissions)
ALTER VIEW public.reviews_public SET (security_invoker = true);

-- The "Anyone can view approved reviews through public view" policy 
-- on the reviews table already allows this to work correctly