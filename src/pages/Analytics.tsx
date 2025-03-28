
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAnalyticsData, mockPosts } from '@/lib/data';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  Users,
  MessageSquare,
  Share2,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [platformFilter, setPlatformFilter] = useState('all');
  
  // Get data for the selected time range
  const getFilteredData = () => {
    let days = 30;
    switch (timeRange) {
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
    }
    
    return mockAnalyticsData.slice(-days);
  };
  
  const filteredData = getFilteredData();
  
  // Calculate period-over-period changes
  const calculateChange = (metricName: string) => {
    if (filteredData.length < 2) return 0;
    
    const currentPeriod = filteredData.slice(Math.floor(filteredData.length / 2));
    const previousPeriod = filteredData.slice(0, Math.floor(filteredData.length / 2));
    
    const currentSum = currentPeriod.reduce((sum, day) => sum + day[metricName as keyof typeof day] as number, 0);
    const previousSum = previousPeriod.reduce((sum, day) => sum + day[metricName as keyof typeof day] as number, 0);
    
    if (previousSum === 0) return 100;
    return Math.round(((currentSum - previousSum) / previousSum) * 100);
  };
  
  // Platform distribution data
  const platformData = [
    { name: 'Facebook', value: 38 },
    { name: 'Instagram', value: 45 },
    { name: 'Twitter', value: 27 },
    { name: 'YouTube', value: 18 },
    { name: 'Pinterest', value: 12 },
  ];
  
  const COLORS = ['#1877F2', '#E1306C', '#1DA1F2', '#FF0000', '#E60023'];
  
  // Content performance data
  const contentPerformanceData = mockPosts
    .filter(post => post.stats)
    .map(post => ({
      name: post.title,
      likes: post.stats?.likes || 0,
      comments: post.stats?.comments || 0,
      shares: post.stats?.shares || 0,
      platform: post.platform,
    }));
  
  // Audience data
  const audienceData = [
    { name: '18-24', male: 15, female: 20, other: 2 },
    { name: '25-34', male: 25, female: 30, other: 3 },
    { name: '35-44', male: 20, female: 22, other: 2 },
    { name: '45-54', male: 10, female: 12, other: 1 },
    { name: '55+', male: 5, female: 8, other: 0 },
  ];
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Track the performance of your social media content
            </p>
          </div>
          
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All platforms</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="pinterest">Pinterest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
        
        {/* Overview cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((filteredData.reduce((sum, day) => sum + day.likes + day.comments, 0) / 
                   filteredData.reduce((sum, day) => sum + day.followers, 0)) * 100).toFixed(2)}%
              </div>
              <div className="flex items-center mt-1">
                {calculateChange('likes') > 0 ? (
                  <div className="flex items-center text-green-500 text-xs">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('likes'))}%
                  </div>
                ) : (
                  <div className="flex items-center text-red-500 text-xs">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('likes'))}%
                  </div>
                )}
                <span className="text-xs text-muted-foreground ml-1">
                  vs. previous period
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData[filteredData.length - 1].followers.toLocaleString()}
              </div>
              <div className="flex items-center mt-1">
                {calculateChange('followers') > 0 ? (
                  <div className="flex items-center text-green-500 text-xs">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('followers'))}%
                  </div>
                ) : (
                  <div className="flex items-center text-red-500 text-xs">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('followers'))}%
                  </div>
                )}
                <span className="text-xs text-muted-foreground ml-1">
                  vs. previous period
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Comments</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.reduce((sum, day) => sum + day.comments, 0).toLocaleString()}
              </div>
              <div className="flex items-center mt-1">
                {calculateChange('comments') > 0 ? (
                  <div className="flex items-center text-green-500 text-xs">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('comments'))}%
                  </div>
                ) : (
                  <div className="flex items-center text-red-500 text-xs">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('comments'))}%
                  </div>
                )}
                <span className="text-xs text-muted-foreground ml-1">
                  vs. previous period
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Shares</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredData.reduce((sum, day) => sum + day.shares, 0).toLocaleString()}
              </div>
              <div className="flex items-center mt-1">
                {calculateChange('shares') > 0 ? (
                  <div className="flex items-center text-green-500 text-xs">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('shares'))}%
                  </div>
                ) : (
                  <div className="flex items-center text-red-500 text-xs">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    {Math.abs(calculateChange('shares'))}%
                  </div>
                )}
                <span className="text-xs text-muted-foreground ml-1">
                  vs. previous period
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Main charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Over Time</CardTitle>
              <CardDescription>
                Likes, comments, and shares over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={filteredData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
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
                      <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D6BCFA" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#D6BCFA" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), '']}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        });
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="likes" 
                      name="Likes"
                      stroke="#9b87f5" 
                      fillOpacity={1} 
                      fill="url(#colorLikes)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="comments" 
                      name="Comments"
                      stroke="#7E69AB" 
                      fillOpacity={1} 
                      fill="url(#colorComments)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="shares" 
                      name="Shares"
                      stroke="#D6BCFA" 
                      fillOpacity={1} 
                      fill="url(#colorShares)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
              <CardDescription>
                Follower count over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                      angle={-45}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis 
                      domain={['dataMin - 10', 'dataMax + 10']}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip 
                      formatter={(value: number) => [value.toLocaleString(), '']}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        });
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="followers" 
                      name="Followers"
                      stroke="#9b87f5"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Additional analytics */}
        <section>
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> Content Performance
              </TabsTrigger>
              <TabsTrigger value="platforms" className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" /> Platform Distribution
              </TabsTrigger>
              <TabsTrigger value="audience" className="flex items-center gap-2">
                <LineChartIcon className="h-4 w-4" /> Audience Demographics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                  <CardDescription>
                    Content with the highest engagement metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={contentPerformanceData}
                        layout="vertical"
                        margin={{ top: 10, right: 10, left: 100, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          tick={{ fontSize: 12 }}
                          width={100}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="likes" name="Likes" fill="#9b87f5" />
                        <Bar dataKey="comments" name="Comments" fill="#7E69AB" />
                        <Bar dataKey="shares" name="Shares" fill="#D6BCFA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="platforms">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>
                    Engagement breakdown by platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-80 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={platformData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [`${value} engagements`, '']}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Platform Insights</h3>
                      <div className="space-y-6">
                        {platformData.map((platform, index) => (
                          <div key={platform.name}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="font-medium">{platform.name}</span>
                              </div>
                              <span>{platform.value} engagements</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${(platform.value / Math.max(...platformData.map(p => p.value))) * 100}%`,
                                  backgroundColor: COLORS[index % COLORS.length] 
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audience">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>
                    Breakdown of your audience by age and gender
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={audienceData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="male" name="Male" fill="#3b82f6" />
                        <Bar dataKey="female" name="Female" fill="#ec4899" />
                        <Bar dataKey="other" name="Other" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </AppLayout>
  );
};

export default Analytics;
