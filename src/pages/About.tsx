import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Code, Rocket } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold">About CourseCompare</h1>
            <p className="text-xl text-muted-foreground">
              Making online learning more accessible through unified course search
            </p>
          </div>

          {/* Mission Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Target className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Why I Built This</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                As someone passionate about online learning, I found myself constantly switching between multiple
                platforms to find the best courses. Each platform has its strengths - YouTube for free tutorials,
                Udemy for comprehensive paid courses, and Coursera for professional certifications.
              </p>
              <p>
                This project was born from the need to simplify the course discovery process. Instead of searching
                across multiple platforms, you can now compare courses from different sources in one place, making
                it easier to find the perfect learning resource for your needs.
              </p>
            </CardContent>
          </Card>

          {/* Technology Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Code className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">APIs Used</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">YouTube Data API</h3>
                <p className="text-muted-foreground">
                  Access millions of educational videos and tutorials from YouTube's vast library
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Udemy RapidAPI</h3>
                <p className="text-muted-foreground">
                  Search through Udemy's extensive catalog of professional courses
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Coursera Integration</h3>
                <p className="text-muted-foreground">
                  Find university-level courses and professional certificates from top institutions
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Rocket className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Future Roadmap</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Add user accounts to save favorite courses and create learning paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Implement advanced filtering by skill level, language, and course type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Include more platforms like LinkedIn Learning and Pluralsight</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Add course reviews and ratings from multiple sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">•</span>
                  <span>Create personalized course recommendations based on learning history</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default About;
