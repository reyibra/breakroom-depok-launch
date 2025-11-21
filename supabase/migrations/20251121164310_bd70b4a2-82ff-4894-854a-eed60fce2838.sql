-- Fix Security Definer View issue
-- Drop and recreate the view without SECURITY DEFINER (which is the default)
DROP VIEW IF EXISTS public.reviews_public;

CREATE VIEW public.reviews_public 
WITH (security_invoker = true)
AS
SELECT 
  id,
  name,
  role,
  rating,
  review_text,
  image_url,
  created_at,
  is_approved,
  admin_response,
  admin_response_date
FROM public.reviews
WHERE is_approved = true;

-- Grant SELECT permission on the view to public
GRANT SELECT ON public.reviews_public TO anon, authenticated;