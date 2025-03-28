
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  PinIcon,
  ArrowRight,
  CheckCircle,
  Circle,
} from 'lucide-react';

const Onboarding = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [aboutBusiness, setAboutBusiness] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-pulse text-primary-purple text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
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
  
  const handleContinue = () => {
    if (step === 1 && (!company || !industry)) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (step === 2 && !targetAudience) {
      toast.error('Please describe your target audience');
      return;
    }
    
    if (step === 3 && selectedPlatforms.length === 0) {
      toast.error('Please select at least one platform');
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      toast.success('Onboarding completed successfully!');
      navigate('/dashboard');
    }
  };
  
  const handleSkip = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-accent/30 dark:from-dark-purple dark:to-black">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-bold gradient-text">AI Studio</span>
        </div>
      </header>
      
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to AI Studio</h1>
          <p className="text-lg text-muted-foreground">
            Let's set up your account to get the most out of your social media management
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className="flex flex-col items-center"
                onClick={() => s < step && setStep(s)}
              >
                <div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                    s === step 
                      ? 'bg-primary text-primary-foreground' 
                      : s < step 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                <span className="text-xs mt-1">Step {s}</span>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-muted mt-4 max-w-xs mx-auto">
            <div 
              className="absolute h-1 bg-primary transition-all" 
              style={{ width: `${(step - 1) * 33.33}%` }}
            />
          </div>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm p-6 border">
          {/* Step 1: Business Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Tell us about your business</h2>
                <p className="text-muted-foreground">
                  This helps us tailor the experience to your needs
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company or Brand Name</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS / Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="travel">Travel & Hospitality</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="about">Tell us about your business (Optional)</Label>
                  <Textarea
                    id="about"
                    value={aboutBusiness}
                    onChange={(e) => setAboutBusiness(e.target.value)}
                    placeholder="What products or services do you offer?"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Target Audience */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Who is your target audience?</h2>
                <p className="text-muted-foreground">
                  This helps our AI create more relevant content for your audience
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="audience">Describe your target audience</Label>
                  <Textarea
                    id="audience"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="E.g., Young professionals aged 25-35 interested in fitness and wellness"
                    rows={6}
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Social Media Platforms */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Select your social media platforms</h2>
                <p className="text-muted-foreground">
                  Choose the platforms you want to manage with AI Studio
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-4 border rounded-lg cursor-pointer flex items-center gap-3 transition-colors ${
                      selectedPlatforms.includes(platform.id)
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedPlatforms.includes(platform.id) ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <platform.icon 
                        className={`h-6 w-6 ${
                          selectedPlatforms.includes(platform.id) ? 'text-primary-foreground' : 'text-foreground'
                        }`} 
                      />
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 4: AI Preferences */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Set your AI preferences</h2>
                <p className="text-muted-foreground">
                  Choose how you want the AI to create content for you
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Content Style</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button 
                      variant="outline" 
                      className="border-primary bg-primary/5"
                    >
                      Professional
                    </Button>
                    <Button variant="outline">Casual</Button>
                    <Button variant="outline">Educational</Button>
                    <Button variant="outline">Entertaining</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Content Types</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Button 
                      variant="outline" 
                      className="border-primary bg-primary/5"
                    >
                      Text Posts
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-primary bg-primary/5"
                    >
                      Image Posts
                    </Button>
                    <Button variant="outline">Video Ideas</Button>
                    <Button variant="outline">Stories</Button>
                    <Button variant="outline">Polls</Button>
                    <Button variant="outline">Q&A</Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">AI Model Preference</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-primary rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">GPT-4o (Default)</h4>
                        <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                          Recommended
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Versatile model good for diverse content types
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Claude 3.5 Sonnet</h4>
                        <div className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                          Premium
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Advanced model for creative and nuanced content
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <Button
                variant="ghost"
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
            
            <Button onClick={handleContinue}>
              {step < 4 ? (
                <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
              ) : (
                'Finish Setup'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
