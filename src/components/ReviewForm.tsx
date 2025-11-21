import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Nama minimal 2 karakter" })
    .max(100, { message: "Nama maksimal 100 karakter" }),
  role: z
    .string()
    .trim()
    .max(100, { message: "Pekerjaan maksimal 100 karakter" })
    .optional(),
  rating: z
    .number()
    .min(1, { message: "Pilih rating minimal 1 bintang" })
    .max(5, { message: "Rating maksimal 5 bintang" }),
  reviewText: z
    .string()
    .trim()
    .min(10, { message: "Review minimal 10 karakter" })
    .max(500, { message: "Review maksimal 500 karakter" }),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSuccess?: () => void;
}

export const ReviewForm = ({ onSuccess }: ReviewFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      role: "",
      rating: 0,
      reviewText: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert({
        name: data.name,
        role: data.role || null,
        rating: data.rating,
        review_text: data.reviewText,
        is_approved: false, // Requires admin approval
      });

      if (error) throw error;

      toast({
        title: "Review Berhasil Dikirim!",
        description:
          "Terima kasih atas review Anda. Review Anda sedang menunggu persetujuan admin dan akan tampil setelah disetujui.",
        duration: 5000,
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Gagal Mengirim Review",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-border">
      <CardHeader>
        <CardTitle>Tulis Review Anda</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Anda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pekerjaan (opsional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: Mahasiswa, Pekerja Kantoran" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating *</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoveredStar || field.value)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Anda *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ceritakan pengalaman Anda di Breakroom..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Review"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
