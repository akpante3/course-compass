import { SearchResponse } from "@/types/course";
import { mockSearchResponse } from "@/lib/mockData";

const API_BASE_URL = "http://localhost:4000";

export const searchCourses = async (query: string, limit: number = 5): Promise<SearchResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/courses/search?q=${encodeURIComponent(query)}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    console.warn("API request failed, using mock data:", error);
    // Return mock data as fallback
    return {
      ...mockSearchResponse,
      query,
    };
  }
};
