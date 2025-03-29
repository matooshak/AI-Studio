
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
  Lightbulb,
  Linkedin,
} from 'lucide-react';
import { toast } from 'sonner';

const Creator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [contentType, setContentType] = useState('text');
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [creativity, setCreativity] = useState([50]);
  const [contentFormatType, setContentFormatType] = useState('post');
  const [imageGenerationType, setImageGenerationType] = useState('aiImage');
  const [viralIdeaPrompt, setViralIdeaPrompt] = useState('');
  const [viralIdeasGenerated, setViralIdeasGenerated] = useState('');
  
  const textPlatforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, formats: ['post', 'article'] },
    { id: 'instagram', name: 'Instagram', icon: Instagram, formats: ['post'] },
    { id: 'twitter', name: 'Twitter', icon: Twitter, formats: ['tweet', 'thread'] },
    { id: 'youtube', name: 'Youtube', icon: Youtube, formats: ['description', 'thumbnail', 'heading'] },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, formats: ['post', 'article'] },
  ];
  
  const imagePlatforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'pinterest', name: 'Pinterest', icon: PinIcon },
  ];
  
  const videoPlatforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'youtube', name: 'Youtube', icon: Youtube },
  ];
  
  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const getAvailableFormats = () => {
    if (selectedPlatforms.length === 0) return [];
    
    // If multiple platforms selected, find common formats
    if (selectedPlatforms.length > 1) {
      const platformsData = textPlatforms.filter(p => selectedPlatforms.includes(p.id));
      
      // For simplicity, just use the formats of the first selected platform
      return platformsData[0]?.formats || [];
    }
    
    // Single platform selected
    const platform = textPlatforms.find(p => p.id === selectedPlatforms[0]);
    return platform?.formats || [];
  };
  
  const handleGenerate = () => {
    if (!prompt) {
      toast.error('Please enter a prompt for the AI');
      return;
    }
    
    if (selectedPlatforms.length === 0 && contentType !== 'ideas') {
      toast.error('Please select at least one platform');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      let result = '';
      
      switch (contentType) {
        case 'text':
          result = `Here's your generated ${contentFormatType} for ${selectedPlatforms.join(', ')}:\n\n✨ ${prompt}\n\nOur team has been working hard to bring you the best experience possible. We can't wait to share more exciting updates with you soon! #Innovation #Growth #SocialMedia`;
          break;
        case 'image':
          if (imageGenerationType === 'aiImage') {
            result = 'AI-generated image would be displayed here';
          } else {
            result = `Here's a prompt to use on ${imageGenerationType}:\n\n"${prompt}" - Create a vibrant, professional image showing ${prompt} with natural lighting and engaging composition. Use colors that align with your brand identity.`;
          }
          break;
        case 'video':
          result = 'Video script and storyboard generated based on your prompt. Use this with video creation tools like Veed.io:\n\n' + 
                   'Scene 1: Intro - Brief overview of the topic\n' + 
                   'Scene 2: Problem statement\n' + 
                   'Scene 3: Solution reveal\n' + 
                   'Scene 4: Benefits showcase\n' +
                   'Scene 5: Call to action\n\n' +
                   'Recommended visuals: bright colors, minimal text overlays, authentic footage';
          break;
      }
      
      setGeneratedContent(result);
      setIsGenerating(false);
      toast.success('Content generated successfully!');
    }, 2000);
  };
  
  const handleGenerateViralIdeas = () => {
    if (!viralIdeaPrompt) {
      toast.error('Please enter a topic for viral content ideas');
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation for viral ideas
    setTimeout(() => {
      const result = 'Here are 5 viral content ideas based on your topic:\n\n' +
                 '1. "5 Surprising Facts About ' + viralIdeaPrompt + ' That Will Blow Your Mind"\n' +
                 '2. "The ' + viralIdeaPrompt + ' Challenge That\'s Taking Over Social Media"\n' +
                 '3. "How ' + viralIdeaPrompt + ' Is Changing The Way We Think About Business"\n' +
                 '4. "What Nobody Tells You About ' + viralIdeaPrompt + ' - Industry Secrets Revealed"\n' +
                 '5. "I Tried ' + viralIdeaPrompt + ' For 30 Days - Here\'s What Happened"';
      
      setViralIdeasGenerated(result);
      setIsGenerating(false);
      toast.success('Viral ideas generated successfully!');
    }, 2000);
  };
  
  const handleSaveContent = () => {
    toast.success('Content saved to your drafts!');
  };
  
  const handleScheduleContent = () => {
    toast.success('Redirecting to scheduler...');
    // In a real app, this would redirect to the scheduler with the content pre-filled
  };
  
  const getPlatformsList = () => {
    switch (contentType) {
      case 'text':
        return textPlatforms;
      case 'image':
        return imagePlatforms;
      case 'video':
        return videoPlatforms;
      default:
        return textPlatforms;
    }
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
        
        {/* Tips Card - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for better content</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Specify length and format for best results</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Main Content Area - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Viral Ideas Generator - Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" /> Generate Viral Ideas
                </CardTitle>
                <CardDescription>
                  Get winning content ideas for your niche
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="viral-topic">Enter a topic</Label>
                  <Textarea
                    id="viral-topic"
                    placeholder="E.g. Sustainable fashion, home workouts, digital marketing, etc."
                    value={viralIdeaPrompt}
                    onChange={(e) => setViralIdeaPrompt(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={handleGenerateViralIdeas} 
                  disabled={isGenerating} 
                  className="w-full"
                  variant="secondary"
                >
                  {isGenerating ? (
                    <>Generating<span className="animate-pulse">...</span></>
                  ) : (
                    <>Generate Viral Ideas</>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            {/* Viral Ideas Results */}
            {viralIdeasGenerated && (
              <Card>
                <CardHeader>
                  <CardTitle>Viral Content Ideas</CardTitle>
                  <CardDescription>
                    Use these ideas to inspire your content strategy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/30 min-h-[200px] whitespace-pre-line">
                    {viralIdeasGenerated}
                  </div>
                  
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => toast.success('Ideas saved!')}>
                      Save Ideas
                    </Button>
                    <Button variant="secondary" onClick={() => navigator.clipboard.writeText(viralIdeasGenerated)}>
                      Copy to Clipboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Content Creator - Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create new content</CardTitle>
                <CardDescription>
                  Use AI to generate content for your social media channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="text" onValueChange={(value) => {
                  setContentType(value);
                  setSelectedPlatforms([]);
                  setContentFormatType('post');
                  setImageGenerationType('aiImage');
                }}>
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
                    
                    {selectedPlatforms.length > 0 && getAvailableFormats().length > 0 && (
                      <div className="space-y-2">
                        <Label>Content Format</Label>
                        <div className="flex flex-wrap gap-2">
                          {getAvailableFormats().map(format => (
                            <Button
                              key={format}
                              type="button"
                              variant={contentFormatType === format ? "default" : "outline"}
                              onClick={() => setContentFormatType(format)}
                            >
                              {format === 'post' && 'Post Caption'}
                              {format === 'article' && 'Article'}
                              {format === 'tweet' && 'Single Tweet'}
                              {format === 'thread' && 'Thread'}
                              {format === 'description' && 'Video Description'}
                              {format === 'thumbnail' && 'Thumbnail Idea'}
                              {format === 'heading' && 'Video Heading'}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="image" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Image Generation Type</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant={imageGenerationType === 'aiImage' ? "default" : "outline"}
                          onClick={() => setImageGenerationType('aiImage')}
                        >
                          Generate AI Image
                        </Button>
                        <Button
                          type="button"
                          variant={imageGenerationType === 'canva' ? "default" : "outline"}
                          onClick={() => setImageGenerationType('canva')}
                        >
                          Canva Prompt
                        </Button>
                        <Button
                          type="button"
                          variant={imageGenerationType === 'midjourney' ? "default" : "outline"}
                          onClick={() => setImageGenerationType('midjourney')}
                        >
                          MidJourney Prompt
                        </Button>
                        <Button
                          type="button"
                          variant={imageGenerationType === 'freepik' ? "default" : "outline"}
                          onClick={() => setImageGenerationType('freepik')}
                        >
                          Freepik Prompt
                        </Button>
                      </div>
                    </div>
                    
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
                      <Label>Video Content Type</Label>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          Video Script
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          Veed.io Prompt
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          Other Video Tools
                        </Button>
                      </div>
                    </div>
                    
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
                
                {contentType !== 'ideas' && (
                  <div className="space-y-2">
                    <Label>Select platforms</Label>
                    <div className="flex flex-wrap gap-2">
                      {getPlatformsList().map((platform) => (
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
                )}
                
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
            
            {/* Generated Content Results */}
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
        </div>
      </div>
    </AppLayout>
  );
};

export default Creator;
