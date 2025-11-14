import { Link } from "react-router-dom";
import { Star, Clock, Award, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  platform: string;
  price: string;
  rating?: number;
  duration?: string;
  certification?: boolean;
  description?: string;
}

const CourseCard = ({ id, title, platform, price, rating, duration, certification, description }: CourseCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {platform}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          )}
          
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span>{rating}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{duration}</span>
              </div>
            )}
            {certification && (
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>Certificate</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold">{price}</span>
            <Link to={`/course/${id}`}>
              <Button variant="outline" size="sm">
                View Details
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
