import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/components/CourseCard";
import PlatformTabs from "@/components/PlatformTabs";
import SortDropdown from "@/components/SortDropdown";
import EmptyState from "@/components/EmptyState";
import SkeletonLoader from "@/components/SkeletonLoader";
import { useCourseContext } from "@/context/CourseContext";
import { Course } from "@/types/course";
import { toast } from "sonner";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { results, loading, count, searchCourses } = useCourseContext();
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    if (query && results.length === 0) {
      searchCourses(query);
    }
  }, [query]);

  useEffect(() => {
    if (!loading && count > 0) {
      toast.success(`Found ${count} courses for "${query}"`);
    }
  }, [loading, count, query]);

  const sortedCourses = [...results].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.priceUsd - b.priceUsd;
      case "price-desc":
        return b.priceUsd - a.priceUsd;
      case "rating-desc":
        const ratingA = a.popularity.rating || 0;
        const ratingB = b.popularity.rating || 0;
        return ratingB - ratingA;
      case "relevance":
      default:
        return b.score - a.score;
    }
  });

  const platformGroups = {
    youtube: sortedCourses.filter(c => c.provider === "youtube"),
    udemy: sortedCourses.filter(c => c.provider === "udemy"),
    coursera: sortedCourses.filter(c => c.provider === "coursera")
  };

  const platforms = [
    {
      name: "YouTube",
      count: platformGroups.youtube.length,
      content: platformGroups.youtube.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformGroups.youtube.map(course => (
            <CourseCard key={course.providerId} course={course} />
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
            <CourseCard key={course.providerId} course={course} />
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
            <CourseCard key={course.providerId} course={course} />
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
                {loading ? "Searching..." : `${count} courses found for "${query}"`}
              </p>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Results */}
          {loading ? (
            <SkeletonLoader />
          ) : results.length > 0 ? (
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
