import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Course } from "@/types/course";
import { searchCourses as searchCoursesAPI } from "@/services/courseService";

interface CourseState {
  query: string;
  results: Course[];
  count: number;
  loading: boolean;
  error?: string;
  selectedCourse?: Course;
}

type CourseAction =
  | { type: "SEARCH_START"; payload: string }
  | { type: "SEARCH_SUCCESS"; payload: { results: Course[]; count: number } }
  | { type: "SEARCH_ERROR"; payload: string }
  | { type: "SET_SELECTED_COURSE"; payload: Course }
  | { type: "CLEAR_RESULTS" };

interface CourseContextType extends CourseState {
  searchCourses: (query: string) => Promise<void>;
  setSelectedCourse: (course: Course) => void;
  clearResults: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const initialState: CourseState = {
  query: "",
  results: [],
  count: 0,
  loading: false,
  error: undefined,
  selectedCourse: undefined,
};

function courseReducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case "SEARCH_START":
      return {
        ...state,
        query: action.payload,
        loading: true,
        error: undefined,
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        results: action.payload.results,
        count: action.payload.count,
        loading: false,
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SET_SELECTED_COURSE":
      return {
        ...state,
        selectedCourse: action.payload,
      };
    case "CLEAR_RESULTS":
      return initialState;
    default:
      return state;
  }
}

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const searchCourses = async (query: string) => {
    dispatch({ type: "SEARCH_START", payload: query });
    try {
      const data = await searchCoursesAPI(query);
      dispatch({
        type: "SEARCH_SUCCESS",
        payload: { results: data.results, count: data.count },
      });
    } catch (error) {
      dispatch({
        type: "SEARCH_ERROR",
        payload: error instanceof Error ? error.message : "Failed to search courses",
      });
    }
  };

  const setSelectedCourse = (course: Course) => {
    dispatch({ type: "SET_SELECTED_COURSE", payload: course });
  };

  const clearResults = () => {
    dispatch({ type: "CLEAR_RESULTS" });
  };

  return (
    <CourseContext.Provider
      value={{
        ...state,
        searchCourses,
        setSelectedCourse,
        clearResults,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};
