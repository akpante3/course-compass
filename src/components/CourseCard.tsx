import { Link } from "react-router-dom";
import { Star, Clock, Award, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/course";
import { useCourseContext } from "@/context/CourseContext";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { setSelectedCourse } = useCourseContext();
  
  const formatPrice = (priceUsd: number) => {
    return priceUsd === 0 ? "Free" : `$${priceUsd.toFixed(2)}`;
  };
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };
  
  const getRating = () => {
    return course.popularity.rating || (course.popularity.likes && course.popularity.views 
      ? (course.popularity.likes / course.popularity.views * 5).toFixed(1) 
      : undefined);
  };

  const handleViewDetails = () => {
    setSelectedCourse(course);
  };
  const rating = getRating();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <Badge variant="secondary" className="shrink-0 capitalize">
            {course.provider}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {course.thumbnail && (
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-32 object-cover rounded"
            />
          )}
          
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                <span>{rating}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(course.durationMinutes)}</span>
            </div>
            {course.certificationAvailable && (
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4" />
                <span>Certificate</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold">{formatPrice(course.priceUsd)}</span>
            <Link to={`/course/${course.providerId}`} onClick={handleViewDetails}>
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
