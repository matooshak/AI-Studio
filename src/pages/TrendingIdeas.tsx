
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { TrendingUp, Search, Twitter, Facebook, Instagram, Youtube, Linkedin, ArrowRight, Bookmark } from 'lucide-react';
import { toast } from 'sonner';

const TrendingIdeas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [trendingTopics, setTrendingTopics] = useState<any[]>([]);

  // Mock trending data
  const mockTrendingData = {
    twitter: [
      { id: 1, topic: '#ArtificialIntelligence', volume: '234K', trend: 'up', description: 'AI adoption in business and everyday life' },
      { id: 2, topic: '#WorkFromHome', volume: '189K', trend: 'up', description: 'Remote work culture and productivity tips' },
      { id: 3, topic: '#SustainableFashion', volume: '156K', trend: 'up', description: 'Eco-friendly clothing and ethical fashion brands' },
      { id: 4, topic: '#DigitalNomad', volume: '122K', trend: 'stable', description: 'Working while traveling and location independence' },
      { id: 5, topic: '#MentalHealthAwareness', volume: '344K', trend: 'up', description: 'Self-care and mental health discussions' },
    ],
    facebook: [
      { id: 1, topic: 'Home Cooking', volume: '387K', trend: 'up', description: 'Easy recipes and cooking tips for home' },
      { id: 2, topic: 'Fitness Challenges', volume: '267K', trend: 'up', description: '30-day fitness routines and transformation stories' },
      { id: 3, topic: 'DIY Home Decor', volume: '198K', trend: 'stable', description: 'Budget-friendly home decoration ideas' },
      { id: 4, topic: 'Gardening Tips', volume: '134K', trend: 'up', description: 'Indoor plants and sustainable gardening' },
      { id: 5, topic: 'Family Activities', volume: '212K', trend: 'stable', description: 'Fun activities for kids and family bonding' },
    ],
    instagram: [
      { id: 1, topic: '#SkincareTips', volume: '467K', trend: 'up', description: 'Natural skincare routines and product reviews' },
      { id: 2, topic: '#HealthyEating', volume: '389K', trend: 'up', description: 'Nutritious meal prep and diet plans' },
      { id: 3, topic: '#TravelPhotography', volume: '277K', trend: 'down', description: 'Stunning travel destinations and photography tips' },
      { id: 4, topic: '#FitnessJourney', volume: '321K', trend: 'up', description: 'Personal fitness transformations and workout routines' },
      { id: 5, topic: '#MindfulLiving', volume: '189K', trend: 'up', description: 'Wellness practices and mindfulness techniques' },
    ],
    youtube: [
      { id: 1, topic: 'Tech Reviews', volume: '543K', trend: 'up', description: 'Latest gadget unboxings and honest reviews' },
      { id: 2, topic: 'Productivity Hacks', volume: '287K', trend: 'up', description: 'Time management and efficiency tips' },
      { id: 3, topic: 'Day in the Life', volume: '376K', trend: 'stable', description: 'Creator daily routines and behind-the-scenes content' },
      { id: 4, topic: 'Financial Literacy', volume: '421K', trend: 'up', description: 'Investment advice and money management' },
      { id: 5, topic: 'Cooking Tutorials', volume: '332K', trend: 'up', description: 'Step-by-step recipe guides and cooking techniques' },
    ],
    linkedin: [
      { id: 1, topic: 'Remote Work Culture', volume: '276K', trend: 'up', description: 'Building effective remote teams and work policies' },
      { id: 2, topic: 'Leadership Development', volume: '312K', trend: 'up', description: 'Modern leadership strategies and team management' },
      { id: 3, topic: 'Career Transitions', volume: '298K', trend: 'up', description: 'Changing industries and upskilling journeys' },
      { id: 4, topic: 'Workplace Wellness', volume: '187K', trend: 'stable', description: 'Mental health and well-being at work' },
      { id: 5, topic: 'AI in Business', volume: '356K', trend: 'up', description: 'AI applications and impact on industries' },
    ],
  };

  useEffect(() => {
    // Simulate loading trending topics
    loadTrendingTopics(selectedPlatform);
  }, [selectedPlatform]);

  const loadTrendingTopics = (platform: string) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (platform === 'all') {
        // Combine topics from all platforms
        const allTopics = [
          ...mockTrendingData.twitter,
          ...mockTrendingData.facebook,
          ...mockTrendingData.instagram,
          ...mockTrendingData.youtube,
          ...mockTrendingData.linkedin,
        ];
        setTrendingTopics(allTopics.slice(0, 15)); // Limit to 15 topics
      } else {
        // Get topics for selected platform
        setTrendingTopics(mockTrendingData[platform as keyof typeof mockTrendingData] || []);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setIsLoading(true);
    toast.info(`Searching for trending topics related to "${searchQuery}"...`);

    // Simulate search results
    setTimeout(() => {
      const results = mockTrendingData[selectedPlatform === 'all' ? 'twitter' : selectedPlatform as keyof typeof mockTrendingData] || [];
      
      // Filter results to simulate search
      const filteredResults = results.filter(item => 
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setTrendingTopics(filteredResults.length > 0 ? filteredResults : [
        { id: 99, topic: searchQuery, volume: '87K', trend: 'up', description: `New trending topic related to "${searchQuery}"` },
        { id: 100, topic: `${searchQuery} Guide`, volume: '56K', trend: 'up', description: `How-to guides about "${searchQuery}"` },
        { id: 101, topic: `${searchQuery} Tips`, volume: '43K', trend: 'stable', description: `Tips and tricks for "${searchQuery}"` },
      ]);
      
      setIsLoading(false);
    }, 1500);
  };

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="h-5 w-5 text-[#1DA1F2]" />;
      case 'facebook': return <Facebook className="h-5 w-5 text-[#4267B2]" />;
      case 'instagram': return <Instagram className="h-5 w-5 text-[#C13584]" />;
      case 'youtube': return <Youtube className="h-5 w-5 text-[#FF0000]" />;
      case 'linkedin': return <Linkedin className="h-5 w-5 text-[#0077B5]" />;
      default: return <TrendingUp className="h-5 w-5 text-primary" />;
    }
  };

  const saveIdea = (topic: string) => {
    toast.success(`Saved "${topic}" to your ideas`);
  };

  const createContent = (topic: string) => {
    toast.success(`Redirecting to content creator with "${topic}"`);
    // In a real app, redirect to creator page with this topic pre-filled
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold">Trending Topics</h1>
          <p className="text-muted-foreground">
            Discover what's trending across social platforms to inspire your content
          </p>
        </section>

        {/* Search and Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search Trending Topics</CardTitle>
            <CardDescription>
              Find trending topics related to your niche or interests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search-query">Search Keywords</Label>
                <div className="flex mt-2">
                  <Input
                    id="search-query"
                    placeholder="E.g. fitness, marketing, technology..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button 
                    onClick={handleSearch} 
                    className="rounded-l-none"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
              </div>
              
              <div className="sm:w-64">
                <Label>Filter by Platform</Label>
                <Tabs 
                  defaultValue="all" 
                  value={selectedPlatform} 
                  onValueChange={setSelectedPlatform}
                  className="mt-2"
                >
                  <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="twitter" className="px-2">
                      <Twitter className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="facebook" className="px-2">
                      <Facebook className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="instagram" className="px-2">
                      <Instagram className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="youtube" className="px-2">
                      <Youtube className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="px-2">
                      <Linkedin className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Results */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> 
            {isLoading ? 'Loading trending topics...' : `Trending on ${selectedPlatform === 'all' ? 'all platforms' : selectedPlatform}`}
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="opacity-50 animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-6 bg-muted rounded-md w-3/4"></div>
                    <div className="h-4 bg-muted rounded-md w-1/2 mt-2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded-md w-full"></div>
                    <div className="h-4 bg-muted rounded-md w-5/6 mt-2"></div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-9 bg-muted rounded-md w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingTopics.length > 0 ? (
                trendingTopics.map((topic) => (
                  <Card key={topic.id} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span className="truncate">{topic.topic}</span>
                        {selectedPlatform === 'all' && getIcon(Object.keys(mockTrendingData).find(key => 
                          mockTrendingData[key as keyof typeof mockTrendingData].some(t => t.id === topic.id)
                        ) || 'twitter')}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        Volume: {topic.volume}
                        {topic.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2 pt-0">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => saveIdea(topic.topic)}>
                        <Bookmark className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => createContent(topic.topic)}>
                        Create <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-lg text-muted-foreground">No trending topics found. Try a different search term or platform.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TrendingIdeas;
