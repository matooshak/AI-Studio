
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockPosts, PlatformType, getPlatformColor } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  PinIcon,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  FileImage,
  Video,
  Upload,
  Send,
  Linkedin,
  MessageSquare,
  PlaySquare,
  Eye,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const getPlatformIcon = (platform: PlatformType) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'twitter':
      return <Twitter className="h-4 w-4" />;
    case 'youtube':
      return <Youtube className="h-4 w-4" />;
    case 'pinterest':
      return <PinIcon className="h-4 w-4" />;
    case 'linkedin':
      return <Linkedin className="h-4 w-4" />;
  }
};

const getPlatformName = (platform: PlatformType) => {
  return platform.charAt(0).toUpperCase() + platform.slice(1);
};

const Scheduler = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedPlatformsForPost, setSelectedPlatformsForPost] = useState<string[]>([]);
  const [postType, setPostType] = useState<string>('text');
  
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'youtube', name: 'Youtube', icon: Youtube },
    { id: 'pinterest', name: 'Pinterest', icon: PinIcon },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
  ];
  
  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatformsForPost(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const handleApprove = (postId: string) => {
    toast.success('Post approved successfully!');
  };
  
  const handleReject = (postId: string) => {
    toast.error('Post rejected');
  };
  
  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setIsDialogOpen(true);
  };
  
  const handleDeleteClick = (postId: string) => {
    toast.success('Post deleted successfully!');
  };
  
  const handleCreatePost = () => {
    if (!postContent) {
      toast.error('Please enter content for your post');
      return;
    }
    
    if (selectedPlatformsForPost.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    
    // Show preview before final posting
    setIsPreviewOpen(true);
  };
  
  const handlePostNow = () => {
    if (!postContent) {
      toast.error('Please enter content for your post');
      return;
    }
    
    if (selectedPlatformsForPost.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    
    // Show preview before final posting
    setIsPreviewOpen(true);
  };
  
  const handleConfirmPost = () => {
    toast.success(`Post published immediately to ${selectedPlatformsForPost.length} platforms!`);
    setIsPreviewOpen(false);
    setIsCreatePostOpen(false);
    setPostContent('');
    setSelectedPlatformsForPost([]);
  };
  
  const handleConfirmSchedule = () => {
    toast.success('Post scheduled successfully!');
    setIsPreviewOpen(false);
    setIsCreatePostOpen(false);
    setPostContent('');
    setSelectedPlatformsForPost([]);
  };
  
  const filteredPosts = mockPosts.filter(post => {
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
    return matchesStatus && matchesPlatform;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending approval</Badge>;
      case 'scheduled':
        return <Badge className="bg-primary">Scheduled</Badge>;
      case 'published':
        return <Badge variant="default" className="bg-green-500">Published</Badge>;
      default:
        return null;
    }
  };
  
  const selectedPost = mockPosts.find(post => post.id === selectedPostId);
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Content Scheduler</h1>
            <p className="text-muted-foreground">
              Schedule, manage, and approve your social media posts
            </p>
          </div>
          
          <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Create New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Create and schedule a new post for your social platforms
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <Tabs defaultValue="text" className="w-full" onValueChange={(value) => setPostType(value)}>
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      Image
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="thread" className="flex items-center gap-2">
                      X Thread
                    </TabsTrigger>
                    <TabsTrigger value="youtube" className="flex items-center gap-2">
                      YouTube
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-content">Post content</Label>
                      <Textarea
                        id="post-content"
                        placeholder="Write your post content here..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={5}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="image" className="space-y-4 mt-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileImage className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop an image here, or click to select
                      </p>
                      <Button variant="outline" className="mt-4">
                        Upload Image
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image-caption">Image caption</Label>
                      <Textarea
                        id="image-caption"
                        placeholder="Write a caption for your image..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video" className="space-y-4 mt-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Video className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop a video here, or click to select
                      </p>
                      <Button variant="outline" className="mt-4">
                        Upload Video
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="video-description">Video description</Label>
                      <Textarea
                        id="video-description"
                        placeholder="Write a description for your video..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="thread" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="thread-content">X Thread Content</Label>
                      <p className="text-xs text-muted-foreground">Each paragraph will be a separate tweet in the thread</p>
                      <Textarea
                        id="thread-content"
                        placeholder="Write your thread content here. Separate tweets with a new line..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={8}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="add-images" className="text-sm">Add images to thread?</Label>
                      <Button variant="outline" size="sm">
                        <FileImage className="h-4 w-4 mr-2" /> Add Images
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="youtube" className="space-y-4 mt-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <PlaySquare className="h-10 w-10 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Upload your YouTube video or enter a YouTube link
                      </p>
                      <div className="mt-4 flex flex-col space-y-2">
                        <Button variant="outline">
                          Upload Video
                        </Button>
                        <p className="text-xs text-muted-foreground">Or</p>
                        <Label htmlFor="youtube-link">YouTube Link</Label>
                        <input 
                          id="youtube-link" 
                          type="text" 
                          placeholder="https://youtube.com/watch?v=..." 
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="youtube-title">Video Title</Label>
                      <input 
                        id="youtube-title" 
                        type="text" 
                        placeholder="Enter your video title..." 
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="youtube-description">Video Description</Label>
                      <Textarea
                        id="youtube-description"
                        placeholder="Write a detailed description for your YouTube video..."
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        rows={5}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="youtube-tags">Tags (comma separated)</Label>
                      <input 
                        id="youtube-tags" 
                        type="text" 
                        placeholder="tag1, tag2, tag3..." 
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="space-y-2">
                  <Label>Select platforms</Label>
                  <div className="flex flex-wrap gap-2">
                    {platforms
                      .filter(platform => {
                        // Only show relevant platforms based on post type
                        if (postType === 'thread') return platform.id === 'twitter';
                        if (postType === 'youtube') return platform.id === 'youtube';
                        return true;
                      })
                      .map((platform) => (
                        <Button
                          key={platform.id}
                          type="button"
                          variant={selectedPlatformsForPost.includes(platform.id) ? "default" : "outline"}
                          className="flex items-center gap-2"
                          onClick={() => handlePlatformToggle(platform.id)}
                        >
                          <platform.icon className="h-4 w-4" />
                          {platform.name}
                        </Button>
                      ))
                    }
                  </div>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setIsCreatePostOpen(false)} className="sm:mr-auto">
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handlePostNow}>
                    <Send className="h-4 w-4 mr-2" /> Post Now
                  </Button>
                  <Button onClick={handleCreatePost}>
                    <Clock className="h-4 w-4 mr-2" /> Schedule
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Preview Dialog */}
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="sm:max-w-[650px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" /> Preview Post
                </DialogTitle>
                <DialogDescription>
                  Review how your post will appear on different platforms
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-6">
                <Tabs defaultValue={selectedPlatformsForPost[0] || 'facebook'}>
                  <TabsList className="flex flex-wrap">
                    {selectedPlatformsForPost.map(platformId => {
                      const platform = platforms.find(p => p.id === platformId);
                      return (
                        <TabsTrigger key={platformId} value={platformId} className="flex items-center gap-2">
                          {platform && <platform.icon className="h-4 w-4" />}
                          {platform?.name}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                  
                  {selectedPlatformsForPost.map(platformId => (
                    <TabsContent key={platformId} value={platformId} className="mt-4 border rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                        {(() => {
                          const PlatformIcon = platforms.find(p => p.id === platformId)?.icon as React.ElementType;
                          return PlatformIcon ? <PlatformIcon className="h-5 w-5" /> : null;
                        })()}
                        <span className="font-medium">{platforms.find(p => p.id === platformId)?.name} Preview</span>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-md min-h-[200px]">
                        {postType === 'thread' && platformId === 'twitter' ? (
                          <div className="space-y-4">
                            {postContent.split('\n\n').map((tweet, index) => (
                              <div key={index} className="border p-3 rounded-md bg-white">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                  <div>
                                    <p className="font-bold">Your Name</p>
                                    <p className="text-sm text-gray-500">@yourusername</p>
                                  </div>
                                </div>
                                <p>{tweet}</p>
                                <p className="text-sm text-gray-500 mt-2">Tweet {index + 1} of {postContent.split('\n\n').length}</p>
                              </div>
                            ))}
                          </div>
                        ) : postType === 'youtube' && platformId === 'youtube' ? (
                          <div className="border p-3 rounded-md bg-white">
                            <div className="aspect-video bg-gray-200 mb-3 rounded flex items-center justify-center">
                              <PlaySquare className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="font-bold mb-1">Your YouTube Video Title</h3>
                            <p className="text-sm text-gray-700 line-clamp-3">{postContent}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                              <p className="text-sm text-gray-500">Your Channel • Views • Time</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                              <div>
                                <p className="font-bold">Your Page Name</p>
                                <p className="text-xs text-gray-500">Just now</p>
                              </div>
                            </div>
                            <p className="mb-3">{postContent}</p>
                            {postType === 'image' && (
                              <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                                <FileImage className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                            {postType === 'video' && (
                              <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                                <Video className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)} className="mr-auto">
                  Back to Edit
                </Button>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={handleConfirmPost}>
                    <Send className="h-4 w-4 mr-2" /> Post Now
                  </Button>
                  <Button onClick={handleConfirmSchedule}>
                    <Clock className="h-4 w-4 mr-2" /> Schedule
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar view */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Select date</CardTitle>
              <CardDescription>
                Choose a date to view scheduled posts
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full rounded-md border"
              />
              
              <div className="p-4 border-t">
                <h3 className="font-medium mb-2">Posts on {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                <div className="space-y-2">
                  {filteredPosts
                    .filter(post => {
                      const postDate = new Date(post.scheduledFor);
                      return date && 
                        postDate.getDate() === date.getDate() &&
                        postDate.getMonth() === date.getMonth() &&
                        postDate.getFullYear() === date.getFullYear();
                    })
                    .map(post => (
                      <div 
                        key={post.id} 
                        className="p-2 rounded-md border bg-muted/30 cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handlePostClick(post.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            <span className="text-sm font-medium truncate max-w-[100px]">
                              {post.title}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.scheduledFor).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  
                  {filteredPosts.filter(post => {
                    const postDate = new Date(post.scheduledFor);
                    return date && 
                      postDate.getDate() === date.getDate() &&
                      postDate.getMonth() === date.getMonth() &&
                      postDate.getFullYear() === date.getFullYear();
                  }).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No posts scheduled for this date
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Posts list */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Content schedule</CardTitle>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
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
              </div>
              <CardDescription>
                View, edit, and approve your scheduled content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list" className="space-y-4">
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No posts match your filter criteria</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredPosts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center space-x-4 min-w-0">
                            <div 
                              className="w-1 h-12 rounded-full" 
                              style={{ backgroundColor: getPlatformColor(post.platform) }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                {getPlatformIcon(post.platform)}
                                <span className="ml-2 font-medium">{post.title}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate max-w-md">
                                {post.content}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="hidden md:flex flex-col items-end min-w-[140px]">
                              <div className="text-sm">
                                {new Date(post.scheduledFor).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(post.scheduledFor).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {getStatusBadge(post.status)}
                              
                              {post.status === 'pending' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleApprove(post.id)}
                                    className="h-8 w-8 text-green-500"
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleReject(post.id)}
                                    className="h-8 w-8 text-destructive"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handlePostClick(post.id)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="text-destructive"
                                    onClick={() => handleDeleteClick(post.id)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="calendar">
                  <div className="p-4 text-center border rounded-md bg-muted/30">
                    <p className="text-muted-foreground">Calendar view is available in the premium plan</p>
                    <Button className="mt-2">Upgrade to Premium</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Post detail dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedPost && getPlatformIcon(selectedPost.platform)}
              <span className="ml-2">
                {selectedPost?.title}
              </span>
            </DialogTitle>
            <DialogDescription>
              {selectedPost && getPlatformName(selectedPost.platform)} post
              {selectedPost?.status === 'scheduled' ? ' scheduled for ' : ' '}
              {selectedPost && new Date(selectedPost.scheduledFor).toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPost && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Status</h4>
                  <div>
                    {getStatusBadge(selectedPost.status)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Content</h4>
                  <div className="p-4 rounded-md border bg-muted/30 whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>
                
                {selectedPost.image && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Image</h4>
                    <div className="rounded-md border overflow-hidden bg-muted/30 h-48">
                      <img 
                        src={selectedPost.image} 
                        alt={selectedPost.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {selectedPost.status === 'pending' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Approval</h4>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          handleApprove(selectedPost.id);
                          setIsDialogOpen(false);
                        }}
                        className="w-full"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleReject(selectedPost.id);
                          setIsDialogOpen(false);
                        }}
                        className="w-full"
                      >
                        <XCircle className="mr-2 h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
                
                <div className="flex gap-2">
                  {selectedPost.status !== 'published' && (
                    <Button variant="default">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  )}
                  
                  {selectedPost.status === 'scheduled' && (
                    <Button>
                      <Clock className="mr-2 h-4 w-4" /> Reschedule
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Scheduler;
