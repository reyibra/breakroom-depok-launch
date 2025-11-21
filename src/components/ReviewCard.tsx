import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface ReviewCardProps {
  name: string;
  role?: string;
  rating: number;
  reviewText: string;
  imageUrl?: string;
  createdAt: string;
  adminResponse?: string | null;
  adminResponseDate?: string | null;
}

export const ReviewCard = ({
  name,
  role,
  rating,
  reviewText,
  imageUrl,
  createdAt,
  adminResponse,
  adminResponseDate,
}: ReviewCardProps) => {
  return (
    <Card className="bg-card border-border hover:border-primary transition-colors h-full">
      <CardContent className="p-6 flex flex-col h-full">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= rating
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-muted-foreground mb-4 italic flex-grow">
          "{reviewText}"
        </p>

        {/* Optional Image */}
        {imageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt={`Review by ${name}`}
              loading="lazy"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Admin Response */}
        {adminResponse && (
          <div className="mb-4 bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Response dari Breakroom</span>
            </div>
            <p className="text-sm text-foreground mb-1">{adminResponse}</p>
            {adminResponseDate && (
              <p className="text-xs text-muted-foreground">
                {format(new Date(adminResponseDate), "dd MMM yyyy")}
              </p>
            )}
          </div>
        )}

        {/* Author Info */}
        <div className="border-t border-border pt-4">
          <div className="font-bold">{name}</div>
          {role && <div className="text-sm text-muted-foreground">{role}</div>}
          <div className="text-xs text-muted-foreground mt-1">
            {format(new Date(createdAt), "dd MMM yyyy")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
