-- Security Fix #1: Hide admin_responder_id from public view
-- Create a public-safe view for reviews that excludes admin_responder_id
CREATE OR REPLACE VIEW public.reviews_public AS
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

-- Security Fix #2: Add proper RLS policies to user_roles table
-- Only admins can insert new roles
CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update roles
CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete roles
CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));