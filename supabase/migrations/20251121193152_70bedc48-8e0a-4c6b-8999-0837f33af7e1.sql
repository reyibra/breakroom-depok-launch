-- Grant public SELECT access to reviews_public view
-- This allows anonymous users to view approved reviews while protecting admin_responder_id

-- First, ensure RLS is enabled on the view
ALTER VIEW public.reviews_public SET (security_invoker = false);

-- Create a policy to allow anyone to view from the reviews_public view
-- Note: Views inherit the base table's RLS, so we need to add a policy to the reviews table
-- that specifically allows SELECT through the view context

-- Add back a public SELECT policy for reviews, but only for approved reviews
CREATE POLICY "Anyone can view approved reviews through public view"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (is_approved = true);

-- Update comment
COMMENT ON VIEW public.reviews_public IS 'Public-safe view that excludes admin_responder_id to prevent admin identity exposure. This view can be queried by anyone to see approved reviews.';