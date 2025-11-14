import { SearchResponse } from "@/types/course";

export const mockSearchResponse: SearchResponse = {
  query: "programming",
  count: 6,
  results: [
    {
      score: 259.4277,
      provider: "youtube",
      providerId: "Xrgk023l4lI",
      title: "Complete Web Development Bootcamp - Learn HTML, CSS, JavaScript",
      url: "https://www.youtube.com/watch?v=Xrgk023l4lI",
      priceUsd: 0,
      level: "Beginner",
      durationMinutes: 3120,
      popularity: { views: 2126127, likes: 46815 },
      certificationAvailable: false,
      thumbnail: "https://i.ytimg.com/vi/Xrgk023l4lI/mqdefault.jpg",
      locale: "en"
    },
    {
      score: 63.2644,
      provider: "youtube",
      providerId: "6GQRb4fGvtk",
      title: "Python Programming for Beginners - Full Course",
      url: "https://www.youtube.com/watch?v=6GQRb4fGvtk",
      priceUsd: 0,
      level: "Beginner",
      durationMinutes: 240,
      popularity: { views: 489994, likes: 14265 },
      certificationAvailable: false,
      thumbnail: "https://i.ytimg.com/vi/6GQRb4fGvtk/mqdefault.jpg",
      locale: "en"
    },
    {
      score: 180.5,
      provider: "youtube",
      providerId: "7h8K3lI9mno",
      title: "JavaScript Tutorial for Beginners - Full Course in 3 Hours",
      url: "https://www.youtube.com/watch?v=7h8K3lI9mno",
      priceUsd: 0,
      level: "Beginner",
      durationMinutes: 180,
      popularity: { views: 1250000, likes: 35000 },
      certificationAvailable: false,
      thumbnail: "https://i.ytimg.com/vi/7h8K3lI9mno/mqdefault.jpg",
      locale: "en"
    },
    {
      score: 45.2,
      provider: "udemy",
      providerId: "24674",
      title: "Complete Web Development Bootcamp",
      url: "https://www.udemy.com/course/complete-web-development-bootcamp/",
      priceUsd: 99.99,
      level: "All Levels",
      durationMinutes: 3120,
      popularity: { rating: 4.7 },
      certificationAvailable: true,
      locale: "en"
    },
    {
      score: 38.8,
      provider: "udemy",
      providerId: "24645",
      title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
      url: "https://www.udemy.com/course/react-the-complete-guide/",
      priceUsd: 89.99,
      level: "Intermediate",
      durationMinutes: 2880,
      popularity: { rating: 4.6 },
      certificationAvailable: true,
      locale: "en"
    },
    {
      score: 52.1,
      provider: "coursera",
      providerId: "cs101",
      title: "Machine Learning Specialization",
      url: "https://www.coursera.org/specializations/machine-learning",
      priceUsd: 49,
      level: "Intermediate",
      durationMinutes: 5400,
      popularity: { rating: 4.9 },
      certificationAvailable: true,
      locale: "en"
    }
  ]
};
