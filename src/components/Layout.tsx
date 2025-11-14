import { Link } from "react-router-dom";
import { Search, BookOpen } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">CourseCompare</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/search" className="text-sm font-medium hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span className="text-sm font-medium">CourseCompare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Course Comparison API. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Search
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
