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
}

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<"latest" | "highest">("latest");
  const [filterRating, setFilterRating] = useState<string>("all");

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
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
  }, [reviews, sortBy, filterRating]);

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <section id="reviews" className="py-20 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        {/* Header with Stats */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            Review Pelanggan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apa Kata <span className="text-gradient">Mereka?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Pengalaman nyata dari pelanggan yang sudah merasakan Breakroom
          </p>

          {/* Rating Summary */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-primary text-primary" />
              <span className="text-2xl font-bold">{averageRating}</span>
              <span className="text-muted-foreground">/ 5.0</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="w-5 h-5" />
              <span>{reviews.length} review</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Select value={sortBy} onValueChange={(val: "latest" | "highest") => setSortBy(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Terbaru
                  </div>
                </SelectItem>
                <SelectItem value="highest">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Rating Tertinggi
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Rating</SelectItem>
                <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                <SelectItem value="2">⭐⭐ (2)</SelectItem>
                <SelectItem value="1">⭐ (1)</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="hero"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Tutup Form" : "Tulis Review"}
            </Button>
          </div>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
            <ReviewForm
              onSuccess={() => {
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                role={review.role || undefined}
                rating={review.rating}
                reviewText={review.review_text}
                imageUrl={review.image_url || undefined}
                createdAt={review.created_at}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {filterRating !== "all"
                ? `Belum ada review dengan rating ${filterRating} bintang`
                : "Belum ada review. Jadilah yang pertama!"}
            </p>
            <Button variant="hero" onClick={() => setShowForm(true)}>
              Tulis Review Pertama
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
