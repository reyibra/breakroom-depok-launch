import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Star, Trash2, MessageSquare, Send } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Review {
  id: string;
  name: string;
  role: string | null;
  review_text: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
  admin_response: string | null;
  admin_response_date: string | null;
  admin_responder_id: string | null;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRating, setSelectedRating] = useState<number | "all">("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest" | "highest" | "lowest">("latest");
  const [selectedReviews, setSelectedReviews] = useState<Set<string>>(new Set());
  const [responseText, setResponseText] = useState<Record<string, string>>({});
  const [savingResponse, setSavingResponse] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();

    // Subscribe to real-time INSERT events for new reviews
    const channel = supabase
      .channel("new-reviews-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "reviews",
        },
        (payload) => {
          console.log("🔔 New review submitted:", payload);
          
          // Show notification for new pending reviews
          if (payload.new && !payload.new.is_approved) {
            toast({
              title: "📝 Review Baru Masuk!",
              description: `Review dari ${payload.new.name} menunggu persetujuan`,
              duration: 5000,
            });
          }
          
          // Refresh the reviews list
          fetchReviews();
        }
      )
      .subscribe((status) => {
        console.log("🔔 Real-time notifications status:", status);
      });

    return () => {
      console.log("🔔 Unsubscribing from review notifications");
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengambil data reviews",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: true })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Review berhasil di-approve",
      });
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal approve review",
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: false })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Review berhasil di-reject",
      });
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal reject review",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Review berhasil dihapus",
      });
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menghapus review",
      });
    }
  };

  const handleBulkApprove = async () => {
    try {
      const ids = Array.from(selectedReviews);
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: true })
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: `${ids.length} review berhasil di-approve`,
      });
      setSelectedReviews(new Set());
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal approve reviews",
      });
    }
  };

  const handleBulkReject = async () => {
    try {
      const ids = Array.from(selectedReviews);
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: false })
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: `${ids.length} review berhasil di-reject`,
      });
      setSelectedReviews(new Set());
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal reject reviews",
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      const ids = Array.from(selectedReviews);
      const { error } = await supabase
        .from("reviews")
        .delete()
        .in("id", ids);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: `${ids.length} review berhasil dihapus`,
      });
      setSelectedReviews(new Set());
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menghapus reviews",
      });
    }
  };

  const toggleSelectReview = (id: string) => {
    const newSelected = new Set(selectedReviews);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedReviews(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedReviews.size === sortedReviews.length) {
      setSelectedReviews(new Set());
    } else {
      setSelectedReviews(new Set(sortedReviews.map(r => r.id)));
    }
  };

  const handleSaveResponse = async (reviewId: string) => {
    const response = responseText[reviewId]?.trim();
    
    if (!response) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Response tidak boleh kosong",
      });
      return;
    }

    setSavingResponse({ ...savingResponse, [reviewId]: true });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("reviews")
        .update({
          admin_response: response,
          admin_response_date: new Date().toISOString(),
          admin_responder_id: user?.id,
        })
        .eq("id", reviewId);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Response berhasil disimpan",
      });
      
      // Clear the input after save
      setResponseText({ ...responseText, [reviewId]: "" });
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menyimpan response",
      });
    } finally {
      setSavingResponse({ ...savingResponse, [reviewId]: false });
    }
  };

  const handleDeleteResponse = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({
          admin_response: null,
          admin_response_date: null,
          admin_responder_id: null,
        })
        .eq("id", reviewId);

      if (error) throw error;

      toast({
        title: "Berhasil",
        description: "Response berhasil dihapus",
      });
      fetchReviews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menghapus response",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter by rating
  const filteredByRating = selectedRating === "all" 
    ? reviews 
    : reviews.filter(review => review.rating === selectedRating);

  // Sort reviews
  const sortedReviews = [...filteredByRating].sort((a, b) => {
    switch (sortOrder) {
      case "latest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "oldest":
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const pendingCount = reviews.filter(review => !review.is_approved).length;
  const approvedCount = reviews.filter(review => review.is_approved).length;
  
  // Rating distribution for analytics
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Reviews Management</h1>
          {pendingCount > 0 && (
            <Badge variant="destructive" className="text-base px-3 py-1 animate-pulse">
              {pendingCount} Pending
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground">
          Kelola dan moderasi review dari customer
        </p>
        
        {/* Stats Summary */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              Total: {reviews.length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-sm">
              Approved: {approvedCount}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Pending: {pendingCount}
            </Badge>
          </div>
        </div>
      </div>

      {/* Analytics - Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Distribusi Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-20">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex-1">
                  <div className="h-6 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium w-12 text-right">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedReviews.size > 0 && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium">
                {selectedReviews.size} review dipilih
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleBulkApprove}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve Semua
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBulkReject}
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject Semua
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus Semua
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus {selectedReviews.size} Review?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Review yang dipilih akan dihapus permanen dan tidak bisa dikembalikan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBulkDelete}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedReviews(new Set())}
                >
                  Batal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Rating Filter */}
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filter Rating</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedRating === "all" ? "default" : "outline"}
                  onClick={() => setSelectedRating("all")}
                >
                  Semua
                </Button>
                {[5, 4, 3, 2, 1].map(rating => (
                  <Button
                    key={rating}
                    size="sm"
                    variant={selectedRating === rating ? "default" : "outline"}
                    onClick={() => setSelectedRating(rating)}
                    className="gap-1"
                  >
                    {rating}
                    <Star className="w-3 h-3 fill-current" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Urutkan</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={sortOrder === "latest" ? "default" : "outline"}
                  onClick={() => setSortOrder("latest")}
                >
                  Terbaru
                </Button>
                <Button
                  size="sm"
                  variant={sortOrder === "oldest" ? "default" : "outline"}
                  onClick={() => setSortOrder("oldest")}
                >
                  Terlama
                </Button>
                <Button
                  size="sm"
                  variant={sortOrder === "highest" ? "default" : "outline"}
                  onClick={() => setSortOrder("highest")}
                >
                  Rating Tertinggi
                </Button>
                <Button
                  size="sm"
                  variant={sortOrder === "lowest" ? "default" : "outline"}
                  onClick={() => setSortOrder("lowest")}
                >
                  Rating Terendah
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {/* Select All Header */}
        {sortedReviews.length > 0 && (
          <div className="flex items-center gap-3 px-1">
            <Checkbox
              checked={selectedReviews.size === sortedReviews.length && sortedReviews.length > 0}
              onCheckedChange={toggleSelectAll}
              id="select-all"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium cursor-pointer select-none"
            >
              Pilih Semua ({sortedReviews.length})
            </label>
          </div>
        )}

        <div className="grid gap-4">
          {sortedReviews.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                Tidak ada review yang sesuai dengan filter
              </CardContent>
            </Card>
          ) : (
            sortedReviews.map((review) => (
            <Card key={review.id} className={selectedReviews.has(review.id) ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Checkbox
                      checked={selectedReviews.has(review.id)}
                      onCheckedChange={() => toggleSelectReview(review.id)}
                      id={`review-${review.id}`}
                    />
                    <div>
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      {review.role && (
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      )}
                    </div>
                  </div>
                <div className="flex items-center gap-2">
                  <Badge variant={review.is_approved ? "default" : "secondary"}>
                    {review.is_approved ? "Approved" : "Pending"}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{review.review_text}</p>
              
              {/* Admin Response Section */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Admin Response</span>
                </div>
                
                {review.admin_response ? (
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <p className="text-sm mb-2">{review.admin_response}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {review.admin_response_date && 
                          `Dibalas pada ${format(new Date(review.admin_response_date), "dd MMM yyyy, HH:mm")}`
                        }
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteResponse(review.id)}
                        className="h-7 px-2 text-xs"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Hapus Response
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Tulis response untuk review ini..."
                      value={responseText[review.id] || ""}
                      onChange={(e) => setResponseText({ ...responseText, [review.id]: e.target.value })}
                      className="min-h-[80px] resize-none"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSaveResponse(review.id)}
                      disabled={savingResponse[review.id] || !responseText[review.id]?.trim()}
                      className="w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      {savingResponse[review.id] ? "Menyimpan..." : "Kirim Response"}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 mt-4">
                {!review.is_approved && (
                  <Button
                    size="sm"
                    onClick={() => handleApprove(review.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                )}
                {review.is_approved && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(review.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Review?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Review ini akan dihapus permanen dan tidak bisa dikembalikan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(review.id)}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
