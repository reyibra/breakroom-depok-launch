import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Optimized hook to batch fetch all initial homepage data in parallel
 * Reduces number of sequential database queries from 3 to 1 parallel batch
 */
export const useInitialData = () => {
  return useQuery({
    queryKey: ["initial-homepage-data"],
    queryFn: async () => {
      const now = new Date().toISOString();
      
      // Batch all queries in parallel for faster loading
      const [promosResult, newsResult, reviewsResult] = await Promise.all([
        // Active promos
        supabase
          .from("promos")
          .select("*")
          .eq("is_active", true)
          .lte("start_date", now)
          .gte("end_date", now)
          .order("created_at", { ascending: false }),
        
        // Active news (limit 4 for performance)
        supabase
          .from("news")
          .select("*")
          .eq("is_active", true)
          .order("published_at", { ascending: false })
          .limit(4),
        
        // Approved reviews (limit 50 for performance)
        supabase
          .from("reviews")
          .select("*")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(50),
      ]);

      return {
        promos: promosResult.data || [],
        news: newsResult.data || [],
        reviews: reviewsResult.data || [],
      };
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep in cache for 10 minutes
  });
};
