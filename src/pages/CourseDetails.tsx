import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Clock, Award, ExternalLink, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface CourseDetail {
  id: string;
  title: string;
  platform: string;
  price: string;
  rating?: number;
  duration?: string;
  certification?: boolean;
  description: string;
  externalUrl: string;
}

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        // TODO: Replace with your actual backend URL
        // const response = await fetch(`https://your-backend-url/courses/${id}`);
        // const data = await response.json();
        // setCourse(data);

        // Mock data for demonstration
        const mockCourse: CourseDetail = {
          id: id || "1",
          title: "Complete Web Development Bootcamp",
          platform: "Udemy",
          price: "$99.99",
          rating: 4.7,
          duration: "52 hours",
          certification: true,
          description: "This comprehensive web development bootcamp covers everything you need to become a full-stack developer. Starting from the basics of HTML and CSS, you'll progress through JavaScript, React, Node.js, and database management. The course includes hands-on projects, real-world applications, and best practices used in the industry. Perfect for beginners and those looking to transition into web development.",
          externalUrl: "https://www.udemy.com/course/example"
        };

        setCourse(mockCourse);
      } catch (error) {
        toast.error("Failed to fetch course details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

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
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link to="/search" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to results
          </Link>

          <div>
            <Badge variant="secondary" className="mb-4">
              {course.platform}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              {course.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              )}
              {course.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
              )}
              {course.certification && (
                <div className="flex items-center gap-1">
                  <Award className="h-5 w-5" />
                  <span>Certificate Available</span>
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-3xl font-bold">{course.price}</p>
                </div>
                <a href={course.externalUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    View on {course.platform}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;
