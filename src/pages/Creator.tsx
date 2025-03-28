
import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  FileImage, 
  Type, 
  Video, 
  Sparkles, 
  Send, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  PinIcon,
} from 'lucide-react';
import { aiModels } from '@/lib/data';
import { toast } from 'sonner';

const Creator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [creativity, setCreativity] = useState([50]);
  const [useAdvancedAI, setUseAdvancedAI] = useState(false);
  
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'youtube', name: 'Youtube', icon: Youtube },
    { id: 'pinterest', name: 'Pinterest', icon: PinIcon },
  ];
  
  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error('Please enter a prompt for the AI');
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let result = '';
      
      switch (contentType) {
        case 'text':
          result = `Here's your generated post for ${selectedPlatforms.join(', ')}:\n\n✨ ${prompt}\n\nOur team has been working hard to bring you the best experience possible. We can't wait to share more exciting updates with you soon! #Innovation #Growth #SocialMedia`;
          break;
        case 'image':
          // In a real app, this would be a URL to a generated image
          result = 'Image description would be generated here, and the actual image would be displayed';
          break;
        case 'video':
          result = 'Video script and storyboard would be generated here, along with a preview of the video';
          break;
      }
      
      setGeneratedContent(result);
      setIsGenerating(false);
      toast.success('Content generated successfully!');
    }, 2000);
  };
  
  const handleSaveContent = () => {
    toast.success('Content saved to your drafts!');
  };
  
  const handleScheduleContent = () => {
    toast.success('Redirecting to scheduler...');
    // In a real app, this would redirect to the scheduler with the content pre-filled
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold">Content Creator</h1>
          <p className="text-muted-foreground">
            Create engaging content for your social media channels
          </p>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content creation panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create new content</CardTitle>
                <CardDescription>
                  Use AI to generate content for your social media channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="text" onValueChange={(value) => setContentType(value)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <Type className="h-4 w-4" /> Text
                    </TabsTrigger>
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <FileImage className="h-4 w-4" /> Image
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Video className="h-4 w-4" /> Video
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-prompt">Describe your post</Label>
                      <Textarea
                        id="text-prompt"
                        placeholder="E.g. Write a post announcing our new product launch for fitness enthusiasts"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="image" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-prompt">Describe the image</Label>
                      <Textarea
                        id="image-prompt"
                        placeholder="E.g. A stylish fitness watch on a person's wrist while jogging in a park at sunrise"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-prompt">Describe the video</Label>
                      <Textarea
                        id="video-prompt"
                        placeholder="E.g. A short testimonial video showing how our product has helped customers achieve their fitness goals"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="space-y-2">
                  <Label>Select platforms</Label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.id}
                        type="button"
                        variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => handlePlatformToggle(platform.id)}
                      >
                        <platform.icon className="h-4 w-4" />
                        {platform.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Creativity</Label>
                      <p className="text-sm text-muted-foreground">
                        Adjust how creative the AI should be
                      </p>
                    </div>
                    <div className="w-1/2">
                      <Slider
                        value={creativity}
                        onValueChange={setCreativity}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="use-advanced-ai"
                      checked={useAdvancedAI}
                      onCheckedChange={setUseAdvancedAI}
                    />
                    <Label htmlFor="use-advanced-ai">
                      Use Claude 3.5 Sonnet (GPT-4o is default)
                    </Label>
                  </div>
                  
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>Generating<span className="animate-pulse">...</span></>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" /> Generate content
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {generatedContent && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated content</CardTitle>
                  <CardDescription>
                    Review and edit your content before saving
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30 min-h-[200px] whitespace-pre-line">
                    {generatedContent}
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleSaveContent}>
                      Save draft
                    </Button>
                    <Button onClick={handleScheduleContent}>
                      <Clock className="mr-2 h-4 w-4" /> Schedule
                    </Button>
                    <Button variant="secondary">
                      <Send className="mr-2 h-4 w-4" /> Post now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI settings</CardTitle>
                <CardDescription>
                  Choose your preferred AI model
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiModels.map((model) => (
                  <div
                    key={model.id}
                    className={`p-4 rounded-lg border-2 ${model.id === (useAdvancedAI ? 'claude' : 'gpt4o') ? 'border-primary' : 'border-border'} cursor-pointer transition-all hover:border-primary hover:shadow-sm`}
                    onClick={() => setUseAdvancedAI(model.id === 'claude')}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{model.name}</h3>
                      {model.id === (useAdvancedAI ? 'claude' : 'gpt4o') && (
                        <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Active
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {model.description}
                    </p>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-2">
                  Claude 3.5 Sonnet is available for paid plans.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tips for better content</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Be specific in your prompts for better results</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Include details about your target audience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Mention any specific tone or style you want</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Include keywords you want to target</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>Ask for variations to choose from</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Creator;
