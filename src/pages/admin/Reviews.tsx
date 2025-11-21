import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Star, Trash2 } from "lucide-react";
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
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const pendingCount = reviews.filter(review => !review.is_approved).length;
  const approvedCount = reviews.filter(review => review.is_approved).length;

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

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                  {review.role && (
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  )}
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
              <div className="flex gap-2">
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
        ))}
      </div>
    </div>
  );
};

export default Reviews;
