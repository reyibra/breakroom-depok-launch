-- Update cleanup_old_rate_limits function to set search_path for security
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE last_attempt < now() - interval '1 hour';
END;
$$;