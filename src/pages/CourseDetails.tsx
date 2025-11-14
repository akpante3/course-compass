import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Clock, Award, ExternalLink, ArrowLeft } from "lucide-react";
import { useCourseContext } from "@/context/CourseContext";

const CourseDetails = () => {
  const { id } = useParams();
  const { selectedCourse, results } = useCourseContext();

  // Find course from results if not selected
  const course = selectedCourse || results.find(c => c.providerId === id);

  const formatPrice = (priceUsd: number) => {
    return priceUsd === 0 ? "Free" : `$${priceUsd.toFixed(2)}`;
  };
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
  };
  
  const getRating = () => {
    if (!course) return undefined;
    return course.popularity.rating || (course.popularity.likes && course.popularity.views 
      ? (course.popularity.likes / course.popularity.views * 5).toFixed(1) 
      : undefined);
  };

  const loading = false;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-16 w-full" />
            <Card>
              <CardContent className="p-8 space-y-6">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-48" />
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist.</p>
            <Link to="/search">
              <Button>Back to Search</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const rating = getRating();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link to="/search" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to results
          </Link>

          <div>
            <Badge variant="secondary" className="mb-4 capitalize">
              {course.provider}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            
            {course.thumbnail && (
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              {rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-lg">{rating}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                <span className="text-lg">{formatDuration(course.durationMinutes)}</span>
              </div>
              {course.certificationAvailable && (
                <div className="flex items-center gap-1">
                  <Award className="h-5 w-5" />
                  <span className="text-lg">Certificate Available</span>
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Details</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Level:</strong> {course.level}</p>
                  <p><strong>Provider:</strong> <span className="capitalize">{course.provider}</span></p>
                  {course.locale && <p><strong>Language:</strong> {course.locale.toUpperCase()}</p>}
                  {course.popularity.views && (
                    <p><strong>Views:</strong> {course.popularity.views.toLocaleString()}</p>
                  )}
                  {course.popularity.likes && (
                    <p><strong>Likes:</strong> {course.popularity.likes.toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Price</p>
                    <p className="text-3xl font-bold">{formatPrice(course.priceUsd)}</p>
                  </div>
                </div>

                {course.url && (
                  <a href={course.url} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full">
                      View Course
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;
