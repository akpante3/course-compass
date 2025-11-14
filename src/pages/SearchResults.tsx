import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/components/CourseCard";
import PlatformTabs from "@/components/PlatformTabs";
import SortDropdown from "@/components/SortDropdown";
import EmptyState from "@/components/EmptyState";
import SkeletonLoader from "@/components/SkeletonLoader";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  platform: string;
  price: string;
  rating?: number;
  duration?: string;
  certification?: boolean;
  description?: string;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    const fetchCourses = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        // TODO: Replace with your actual backend URL
        // const response = await fetch(`https://your-backend-url/courses?query=${encodeURIComponent(query)}`);
        // const data = await response.json();
        // setCourses(data);
        
        // Mock data for demonstration
        const mockCourses: Course[] = [
          {
            id: "1",
            title: "Complete Web Development Bootcamp",
            platform: "Udemy",
            price: "$99.99",
            rating: 4.7,
            duration: "52 hours",
            certification: true,
            description: "Learn web development from scratch with HTML, CSS, JavaScript, and more"
          },
          {
            id: "2",
            title: "Machine Learning Specialization",
            platform: "Coursera",
            price: "$49/month",
            rating: 4.9,
            duration: "3 months",
            certification: true,
            description: "Master machine learning algorithms and deep learning with Andrew Ng"
          },
          {
            id: "3",
            title: "JavaScript Tutorial for Beginners",
            platform: "YouTube",
            price: "Free",
            rating: 4.8,
            duration: "3 hours",
            certification: false,
            description: "Learn JavaScript fundamentals in this comprehensive tutorial"
          },
          {
            id: "4",
            title: "React - The Complete Guide",
            platform: "Udemy",
            price: "$89.99",
            rating: 4.6,
            duration: "48 hours",
            certification: true,
            description: "Dive deep into React.js and build modern web applications"
          },
          {
            id: "5",
            title: "Data Science Professional Certificate",
            platform: "Coursera",
            price: "$39/month",
            rating: 4.5,
            duration: "6 months",
            certification: true,
            description: "Launch your career in data science with this professional certificate"
          },
          {
            id: "6",
            title: "Python Full Course",
            platform: "YouTube",
            price: "Free",
            rating: 4.7,
            duration: "4 hours",
            certification: false,
            description: "Complete Python programming course for beginners"
          }
        ];
        
        setCourses(mockCourses);
        toast.success(`Found ${mockCourses.length} courses for "${query}"`);
      } catch (error) {
        toast.error("Failed to fetch courses. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  const sortedCourses = [...courses].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
      case "price-desc":
        return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
      case "rating-desc":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const platformGroups = {
    youtube: sortedCourses.filter(c => c.platform === "YouTube"),
    udemy: sortedCourses.filter(c => c.platform === "Udemy"),
    coursera: sortedCourses.filter(c => c.platform === "Coursera")
  };

  const platforms = [
    {
      name: "YouTube",
      count: platformGroups.youtube.length,
      content: platformGroups.youtube.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformGroups.youtube.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <EmptyState message="No YouTube courses found" />
      )
    },
    {
      name: "Udemy",
      count: platformGroups.udemy.length,
      content: platformGroups.udemy.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformGroups.udemy.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <EmptyState message="No Udemy courses found" />
      )
    },
    {
      name: "Coursera",
      count: platformGroups.coursera.length,
      content: platformGroups.coursera.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformGroups.coursera.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <EmptyState message="No Coursera courses found" />
      )
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Search Bar */}
          <div className="flex justify-center">
            <SearchBar defaultValue={query} />
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Search Results</h1>
              <p className="text-muted-foreground mt-1">
                {loading ? "Searching..." : `${courses.length} courses found for "${query}"`}
              </p>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Results */}
          {loading ? (
            <SkeletonLoader />
          ) : courses.length > 0 ? (
            <PlatformTabs platforms={platforms} />
          ) : (
            <EmptyState 
              message="No courses found"
              description="Try searching with different keywords"
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
