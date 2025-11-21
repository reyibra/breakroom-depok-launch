-- Remove the public SELECT policy from reviews table
-- This forces public users to query through reviews_public view instead
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;

-- Keep admin access to full reviews table
-- The "Admins can view all reviews" policy already exists

-- Ensure the view has proper RLS
ALTER VIEW public.reviews_public SET (security_invoker = true);

-- Add comment to document the security pattern
COMMENT ON VIEW public.reviews_public IS 'Public-safe view that excludes admin_responder_id to prevent admin identity exposure. All public queries should use this view instead of the reviews table directly.';