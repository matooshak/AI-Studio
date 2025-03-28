
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  CreditCard,
  Bell,
  User,
  Lock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  PinIcon,
  Plus,
  Check,
  PackageCheck,
  Sparkles,
  Save,
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifyOnPost, setNotifyOnPost] = useState(true);
  const [notifyOnComment, setNotifyOnComment] = useState(true);
  const [notifyOnSchedule, setNotifyOnSchedule] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Profile updated successfully');
    }, 1000);
  };
  
  const handleConnect = (platform: string) => {
    toast.success(`Connected to ${platform}`);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, notifications, and connected platforms
          </p>
        </section>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:w-[600px] mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" /> Connections
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> Billing
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Settings */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Enter your company name"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile} disabled={isLoading}>
                    {isLoading ? (
                      <>Saving<span className="animate-pulse">...</span></>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" /> Save changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Lock className="h-4 w-4" /> Change Password
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="two-factor">Two-factor Authentication</Label>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                      <Switch id="two-factor" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Customize when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-post">Post Published</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when your scheduled posts are published
                        </p>
                      </div>
                      <Switch
                        id="notify-post"
                        checked={notifyOnPost}
                        onCheckedChange={setNotifyOnPost}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-comment">Comments Received</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when someone comments on your posts
                        </p>
                      </div>
                      <Switch
                        id="notify-comment"
                        checked={notifyOnComment}
                        onCheckedChange={setNotifyOnComment}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-schedule">Post Scheduled</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when a team member schedules a new post
                        </p>
                      </div>
                      <Switch
                        id="notify-schedule"
                        checked={notifyOnSchedule}
                        onCheckedChange={setNotifyOnSchedule}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">WhatsApp Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="whatsapp-notify">Enable WhatsApp</Label>
                        <p className="text-sm text-muted-foreground">
                          Send important notifications to WhatsApp
                        </p>
                      </div>
                      <Switch id="whatsapp-notify" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
                      <Input
                        id="whatsapp-number"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Platform Connections */}
          <TabsContent value="connections">
            <Card>
              <CardHeader>
                <CardTitle>Connected Platforms</CardTitle>
                <CardDescription>
                  Connect your social media accounts to schedule and post content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Facebook */}
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1877F2] flex items-center justify-center">
                        <Facebook className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Facebook</h3>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConnect('Facebook')}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Connect
                    </Button>
                  </div>
                  
                  {/* Instagram */}
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E1306C] flex items-center justify-center">
                        <Instagram className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Instagram</h3>
                        <p className="text-sm text-muted-foreground">
                          Connected as @username
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      <Check className="h-4 w-4 mr-2" /> Connected
                    </Button>
                  </div>
                  
                  {/* Twitter */}
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1DA1F2] flex items-center justify-center">
                        <Twitter className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Twitter</h3>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConnect('Twitter')}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Connect
                    </Button>
                  </div>
                  
                  {/* YouTube */}
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#FF0000] flex items-center justify-center">
                        <Youtube className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">YouTube</h3>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConnect('YouTube')}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Connect
                    </Button>
                  </div>
                  
                  {/* Pinterest */}
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#E60023] flex items-center justify-center">
                        <PinIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">Pinterest</h3>
                        <p className="text-sm text-muted-foreground">
                          Not connected
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleConnect('Pinterest')}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Billing */}
          <TabsContent value="billing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Free Trial</h3>
                        </div>
                        <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                          Current Plan
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Basic content creation with GPT-4o</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Schedule up to 10 posts per month</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          <span>Basic analytics dashboard</span>
                        </li>
                      </ul>
                      
                      <p className="text-sm text-muted-foreground">
                        Your trial ends in 14 days on{" "}
                        {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Pro Plan</h3>
                          <div className="text-sm font-medium">
                            $29<span className="text-xs text-muted-foreground">/month</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Everything in Free</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Advanced content creation</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Unlimited scheduling</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Full analytics suite</span>
                          </li>
                        </ul>
                        
                        <Button className="w-full">
                          Upgrade to Pro
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">Business Plan</h3>
                          <div className="text-sm font-medium">
                            $79<span className="text-xs text-muted-foreground">/month</span>
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Everything in Pro</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Team collaboration (5 users)</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Approval workflows</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" />
                            <span>Claude 3.5 Sonnet access</span>
                          </li>
                        </ul>
                        
                        <Button variant="outline" className="w-full">
                          Contact Sales
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>
                    Add or update your payment information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Billing History</h3>
                    <p className="text-sm text-muted-foreground">
                      No billing history available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
