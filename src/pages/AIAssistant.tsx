
import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ArrowDown,
  Plus,
  Type,
  FileImage,
  Video,
  SquarePen,
  Zap,
  Calendar,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Studio assistant. How can I help you today with your social media management?',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I'd recommend posting at 7:00 PM on Tuesdays and Thursdays for your target audience. That's when engagement rates are highest.",
        "Based on your recent analytics, image posts with questions in the caption are performing 42% better than other content. Would you like me to help create some?",
        "Your audience demographics show a trend toward 25-34 year old professionals. Your content should focus on career growth and lifestyle balance.",
        "I've analyzed your competitors and noticed they're using more video content. Would you like me to help develop a video content strategy?",
        "Your engagement rate is 3.2% higher than the industry average. Great job! To further improve, try posting more consistently.",
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };
  
  const quickPrompts = [
    {
      icon: TrendingUp,
      text: "Analyze my last post's performance",
    },
    {
      icon: Calendar,
      text: "When is the best time to post?",
    },
    {
      icon: FileImage,
      text: "Create an Instagram post about our new product",
    },
    {
      icon: Type,
      text: "Write a tweet about industry trends",
    },
    {
      icon: Video,
      text: "Generate ideas for a YouTube series",
    },
  ];
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get AI-powered help and insights for your social media strategy
          </p>
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat interface */}
          <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-220px)]">
            <CardHeader className="pb-3">
              <CardTitle>AI Studio Assistant</CardTitle>
              <CardDescription>
                Powered by GPT-4o with advanced social media knowledge
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto flex flex-col space-y-4 mb-2">
              <div className="flex-1 overflow-y-auto px-1">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex items-start gap-3 mb-4 ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div 
                      className={`px-4 py-3 rounded-lg max-w-[80%] ${
                        message.role === 'assistant' 
                          ? 'bg-muted/50 text-foreground' 
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm">{message.content}</p>
                      <div 
                        className={`text-xs mt-1 ${
                          message.role === 'assistant' ? 'text-muted-foreground' : 'text-primary-foreground/75'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="px-4 py-3 rounded-lg bg-muted/50">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            <div className="px-4 pb-4">
              <div className="relative">
                <Textarea
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pr-12 resize-none"
                  rows={3}
                />
                <Button 
                  size="icon"
                  className="absolute bottom-3 right-3"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                {quickPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2 whitespace-nowrap"
                    onClick={() => handleQuickPrompt(prompt.text)}
                  >
                    <prompt.icon className="h-4 w-4" />
                    <span className="text-xs">{prompt.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          </Card>
          
          {/* AI features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Features</CardTitle>
                <CardDescription>
                  What you can do with AI Studio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Content Creation</h3>
                    <p className="text-sm text-muted-foreground">Generate posts, captions, hashtags, and more</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <SquarePen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Content Improvement</h3>
                    <p className="text-sm text-muted-foreground">Get suggestions to enhance your content</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Analytics Insights</h3>
                    <p className="text-sm text-muted-foreground">Understand your performance data</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Scheduling Advice</h3>
                    <p className="text-sm text-muted-foreground">Get optimal posting time recommendations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Quick Responses</h3>
                    <p className="text-sm text-muted-foreground">Generate replies to comments and messages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Claude</CardTitle>
                <CardDescription>
                  Get access to Claude 3.5 Sonnet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock advanced AI capabilities with Claude 3.5 Sonnet for more creative and nuanced content.
                </p>
                <Button className="w-full">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIAssistant;
