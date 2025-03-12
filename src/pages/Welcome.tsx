import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { MainLayout } from "@/components/layout/MainLayout"
import { CheckCircle } from "lucide-react"

const Welcome = () => {
  const features = [
    "AI-powered resume builder",
    "Smart job matching technology",
    "Cover letter generator",
    "Application tracking dashboard",
    "Job search aggregator",
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find Your Dream Job with <span className="text-primary">AI-Powered</span> Tools
              </h1>
              <p className="text-xl text-muted-foreground">
                JobifyAI streamlines your job search with intelligent resume building, job matching, and application
                tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Job search illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Supercharge Your Job Search</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform helps you find and apply to jobs faster and more effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm border border-border">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium">{feature}</h3>
                </div>
                <p className="text-muted-foreground">
                  Leverage the power of AI to streamline your job search process and improve your chances of landing
                  interviews.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Welcome

