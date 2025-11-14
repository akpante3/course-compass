import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { GraduationCap, TrendingUp, Award } from "lucide-react";

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              Find the Perfect Course
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance">
              Compare courses from YouTube, Udemy, and Coursera all in one place
            </p>
            <div className="flex justify-center pt-4">
              <SearchBar size="lg" placeholder="Search for blockchain, AI, devops..." />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Multiple Platforms</h3>
              <p className="text-muted-foreground">
                Access courses from YouTube, Udemy, and Coursera in one search
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Smart Comparison</h3>
              <p className="text-muted-foreground">
                Compare prices, ratings, and duration to find your best match
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Certifications</h3>
              <p className="text-muted-foreground">
                Find courses that offer certificates to boost your career
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
