
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  PenTool, 
  ArrowRight,
  TrendingUp,
  Users,
  MessageSquare,
  Activity,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPosts, mockAnalyticsData } from '@/lib/data';
import { useAuth } from '@/contexts/AuthContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AppLayout from '@/components/layout/AppLayout';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Filter posts that are scheduled or published
  const activePostsCount = mockPosts.filter(post => 
    post.status === 'scheduled' || post.status === 'published'
  ).length;
  
  // Get latest analytics data
  const latestAnalytics = mockAnalyticsData.slice(-7);
  
  // Calculate totals for analytics cards
  const totalEngagement = latestAnalytics.reduce(
    (sum, day) => sum + day.likes + day.comments + day.shares, 
    0
  );
  
  const followerGrowth = latestAnalytics[latestAnalytics.length - 1].followers - 
    latestAnalytics[0].followers;
  
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome section */}
        <section className="space-y-2">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your social media accounts today.
          </p>
        </section>
        
        {/* Stats overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPosts.length}</div>
              <p className="text-xs text-muted-foreground">
                {activePostsCount} active posts
              </p>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEngagement}</div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(totalEngagement * 0.15)} from last week
              </p>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestAnalytics[latestAnalytics.length - 1].followers}
              </div>
              <p className="text-xs text-muted-foreground">
                +{followerGrowth} new followers
              </p>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestAnalytics.reduce((sum, day) => sum + day.comments, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                +{Math.floor(latestAnalytics.reduce((sum, day) => sum + day.comments, 0) * 0.08)} from last week
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Quick actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 dashboard-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Create and manage your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-between">
                <Link to="/creator">
                  Create new content <PenTool className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link to="/scheduler">
                  Schedule posts <Calendar className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link to="/analytics">
                  View analytics <BarChart3 className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-2 dashboard-card">
            <CardHeader>
              <CardTitle>Engagement Overview</CardTitle>
              <CardDescription>
                Last 7 days of activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={latestAnalytics}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7E69AB" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#7E69AB" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="likes" 
                      stroke="#9b87f5" 
                      fillOpacity={1} 
                      fill="url(#colorLikes)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="comments" 
                      stroke="#7E69AB" 
                      fillOpacity={1} 
                      fill="url(#colorComments)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Recent posts and platform analytics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-1 md:col-span-2 dashboard-card">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Posts</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/scheduler" className="flex items-center">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <CardDescription>
                Your most recent content across platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-start space-x-4 p-3 rounded-md bg-accent/30">
                    {post.image && (
                      <div className="h-12 w-12 rounded overflow-hidden bg-muted flex-shrink-0">
                        <img src={post.image} alt="" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{post.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{post.content}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs capitalize text-muted-foreground">
                          {post.platform} • {post.status}
                        </span>
                        {post.status === 'scheduled' && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(post.scheduledFor).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>
                Performance by platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Facebook', value: 120 },
                      { name: 'Instagram', value: 210 },
                      { name: 'Twitter', value: 150 },
                      { name: 'YouTube', value: 90 },
                      { name: 'Pinterest', value: 75 },
                    ]}
                    margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                  >
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
