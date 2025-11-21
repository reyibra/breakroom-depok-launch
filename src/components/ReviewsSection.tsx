import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, TrendingUp, Clock } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface Review {
  id: string;
  name: string;
  role: string | null;
  rating: number;
  review_text: string;
  image_url: string | null;
  created_at: string;
  admin_response: string | null;
  admin_response_date: string | null;
}

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"latest" | "highest">("latest");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [currentLimit, setCurrentLimit] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true) // Only show approved reviews
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("reviews-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reviews",
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    let filtered = [...reviews];

    // Filter by rating
    if (filterRating !== "all") {
      const rating = parseInt(filterRating);
      filtered = filtered.filter((review) => review.rating === rating);
    }

    // Sort
    if (sortBy === "highest") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    setFilteredReviews(filtered);
    setCurrentLimit(6); // Reset limit when filters change
  }, [reviews, sortBy, filterRating]);

  // Update displayed reviews based on current limit
  useEffect(() => {
    setDisplayedReviews(filteredReviews.slice(0, currentLimit));
    setLoadingMore(false);
  }, [filteredReviews, currentLimit]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setCurrentLimit(prev => prev + 6);
  };

  const hasMore = displayedReviews.length < filteredReviews.length;

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <section id="reviews" className="py-12 md:py-20 px-4 md:px-6 bg-card">
      <div className="container mx-auto max-w-6xl">
        {/* Header with Stats - Mobile Optimized */}
        <div className="text-center mb-8 md:mb-12 px-2">
          <Badge className="mb-3 md:mb-4 bg-primary text-primary-foreground text-xs md:text-sm">
            Review Pelanggan
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight">
            Apa Kata <span className="text-gradient">Mereka?</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed">
            Pengalaman nyata dari pelanggan yang sudah merasakan Breakroom
          </p>

          {/* Rating Summary */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary" />
              <span className="text-xl md:text-2xl font-bold">{averageRating}</span>
              <span className="text-sm md:text-base text-muted-foreground">/ 5.0</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">{reviews.length} review</span>
            </div>
          </div>

          {/* Controls - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 px-2">
            <Select value={sortBy} onValueChange={(val: "latest" | "highest") => setSortBy(val)}>
              <SelectTrigger className="w-full sm:w-[160px] md:w-[180px] min-h-[44px] text-sm">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Terbaru</span>
                  </div>
                </SelectItem>
                <SelectItem value="highest">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">Rating Tertinggi</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full sm:w-[160px] md:w-[180px] min-h-[44px] text-sm">
                <SelectValue placeholder="Filter Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"><span className="text-sm">Semua Rating</span></SelectItem>
                <SelectItem value="5"><span className="text-sm">⭐⭐⭐⭐⭐ (5)</span></SelectItem>
                <SelectItem value="4"><span className="text-sm">⭐⭐⭐⭐ (4)</span></SelectItem>
                <SelectItem value="3"><span className="text-sm">⭐⭐⭐ (3)</span></SelectItem>
                <SelectItem value="2"><span className="text-sm">⭐⭐ (2)</span></SelectItem>
                <SelectItem value="1"><span className="text-sm">⭐ (1)</span></SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="hero"
              size="sm"
              className="text-sm w-full sm:w-auto min-h-[44px]"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Tutup Form" : "Tulis Review"}
            </Button>
          </div>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-in">
            <ReviewForm
              onSuccess={() => {
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Reviews Grid - Mobile Optimized */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 space-y-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-5 h-5 bg-muted/40 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="space-y-2 flex-grow">
                  <div className="h-4 bg-muted/30 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-muted/30 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-muted/30 rounded w-4/5 animate-pulse"></div>
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="h-5 bg-muted/40 rounded w-32 animate-pulse"></div>
                  <div className="h-4 bg-muted/20 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredReviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {displayedReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  name={review.name}
                  role={review.role || undefined}
                  rating={review.rating}
                  reviewText={review.review_text}
                  imageUrl={review.image_url || undefined}
                  createdAt={review.created_at}
                  adminResponse={review.admin_response || undefined}
                  adminResponseDate={review.admin_response_date || undefined}
                />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8 md:mt-12 animate-fade-in">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  size="lg"
                  variant="outline"
                  className="min-w-[200px]"
                >
                  {loadingMore ? "Memuat..." : `Muat Lebih Banyak (${filteredReviews.length - displayedReviews.length} lagi)`}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 px-4">
            <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">
              {filterRating !== "all"
                ? `Belum ada review dengan rating ${filterRating} bintang`
                : "Belum ada review. Jadilah yang pertama!"}
            </p>
            <Button variant="hero" className="min-h-[44px]" onClick={() => setShowForm(true)}>
              Tulis Review Pertama
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
