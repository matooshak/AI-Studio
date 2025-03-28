
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/components/layout/LandingLayout';
import {
  Sparkles,
  BarChart3,
  Calendar,
  Zap,
  CheckCircle,
  ArrowRight,
  FileText,
  Image,
  Video,
} from 'lucide-react';

const Landing = () => {
  return (
    <LandingLayout>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight gradient-text">
                Your Social Media, <br />Supercharged by AI
              </h1>
              <p className="text-xl text-muted-foreground">
                AI Studio helps small businesses and content creators automate their social media workflow with powerful AI tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Try Demo</Link>
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                <span>No credit card required</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary-purple rounded-xl blur-sm opacity-50"></div>
              <div className="relative bg-card rounded-xl overflow-hidden shadow-xl border">
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7" 
                  alt="AI Studio Dashboard" 
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30" id="features">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Streamline Your Social Media Workflow
            </h2>
            <p className="text-xl text-muted-foreground">
              AI Studio combines advanced AI with intuitive tools to help you create, schedule, and analyze your social media content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Content</h3>
                <p className="text-muted-foreground">
                  Create engaging posts, captions, and hashtags with advanced AI models including GPT-4o and Claude 3.5 Sonnet.
                </p>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-sm">Text generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-primary" />
                    <span className="text-sm">Image creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" />
                    <span className="text-sm">Video scripting</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Intuitive Scheduling</h3>
                <p className="text-muted-foreground">
                  Plan and schedule your posts with a drag-and-drop interface similar to Meta Business Suite for all major platforms.
                </p>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Multi-platform posting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Visual calendar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Approval workflows</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Detailed Analytics</h3>
                <p className="text-muted-foreground">
                  Track the performance of your content with comprehensive analytics dashboards showing engagement metrics.
                </p>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Engagement tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Growth analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Performance insights</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              How AI Studio Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Our simple but powerful workflow helps you save time and create better content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">1. Create</h3>
              <p className="text-muted-foreground">
                Use AI to generate engaging content for multiple platforms with simple prompts.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">2. Schedule</h3>
              <p className="text-muted-foreground">
                Drag and drop your content to schedule at the optimal times for engagement.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">3. Analyze</h3>
              <p className="text-muted-foreground">
                Track performance and get AI-powered recommendations to improve your strategy.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link to="/signup" className="flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Loved by Content Creators
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear what our users have to say about AI Studio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center mb-4">
                  <div className="mr-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">SB</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah B.</h4>
                    <p className="text-sm text-muted-foreground">E-commerce Store Owner</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "AI Studio has been a game-changer for my small business. I save hours each week on content creation, and my engagement has increased by 45%!"
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center mb-4">
                  <div className="mr-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">MJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Mark J.</h4>
                    <p className="text-sm text-muted-foreground">Content Creator</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The AI-generated content is surprisingly creative and engaging. The scheduling feature is intuitive, and the analytics help me understand what's working."
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center mb-4">
                  <div className="mr-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">LP</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Lisa P.</h4>
                    <p className="text-sm text-muted-foreground">Marketing Manager</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Our team loves the approval workflow. It's streamlined our content process and helped maintain consistent brand messaging across all platforms."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 px-4" id="pricing">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold">Free</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic content creation with GPT-4o</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Schedule up to 10 posts per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Connect 2 social media accounts</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold">Pro</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced content creation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Unlimited scheduling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Full analytics suite</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Connect all social platforms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-6" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Business Plan */}
            <Card className="border shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold">Business</h3>
                  <div className="mt-4 mb-6">
                    <span className="text-4xl font-bold">$79</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Team collaboration (5 users)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Approval workflows</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Advanced AI with Claude 3.5 Sonnet</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link to="/signup">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your social media strategy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using AI Studio to save time, create better content, and grow their social media presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Try Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
};

export default Landing;
