// Mock data for AI Studio

export type PlatformType = 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'pinterest' | 'linkedin';

export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  platform: PlatformType;
  scheduledFor: Date;
  status: 'draft' | 'pending' | 'scheduled' | 'published';
  stats?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

export interface AnalyticsData {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  followers: number;
}

// Mock posts
export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'New Product Launch',
    content: 'Excited to announce our new product line! Coming soon to stores near you.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06',
    platform: 'instagram',
    scheduledFor: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // Tomorrow
    status: 'scheduled',
    stats: {
      likes: 125,
      comments: 23,
      shares: 12,
      views: 1200,
    },
  },
  {
    id: '2',
    title: 'Customer Testimonial',
    content: 'Our customers love our services! Check out this testimonial from Jane D.',
    platform: 'facebook',
    scheduledFor: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    status: 'draft',
  },
  {
    id: '3',
    title: 'Weekly Tips',
    content: 'Here are 5 tips to improve your productivity this week!',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
    platform: 'twitter',
    scheduledFor: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    status: 'pending',
  },
  {
    id: '4',
    title: 'Tutorial Video',
    content: 'Watch our new tutorial on how to use our product effectively.',
    platform: 'youtube',
    scheduledFor: new Date(),
    status: 'published',
    stats: {
      likes: 85,
      comments: 12,
      shares: 5,
      views: 750,
    },
  },
  {
    id: '5',
    title: 'Inspirational Design',
    content: 'Get inspired by these beautiful designs for your next project.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    platform: 'pinterest',
    scheduledFor: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // Yesterday
    status: 'published',
    stats: {
      likes: 210,
      comments: 15,
      shares: 45,
      views: 2300,
    },
  },
];

// Mock analytics data
export const mockAnalyticsData: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 29 + i);
  return {
    date: date.toISOString().split('T')[0],
    likes: Math.floor(50 + Math.random() * 100 * (1 + i / 20)),
    comments: Math.floor(10 + Math.random() * 40 * (1 + i / 30)),
    shares: Math.floor(5 + Math.random() * 20 * (1 + i / 40)),
    followers: 500 + Math.floor(i * (3 + Math.random() * 5)),
  };
});

// Get platform color
export const getPlatformColor = (platform: PlatformType): string => {
  switch (platform) {
    case 'facebook':
      return '#1877F2';
    case 'instagram':
      return '#E1306C';
    case 'twitter':
      return '#1DA1F2';
    case 'youtube':
      return '#FF0000';
    case 'pinterest':
      return '#E60023';
    case 'linkedin':
      return '#0077B5';
    default:
      return '#9b87f5'; // Default to primary purple
  }
};

// Get platform icon name
export const getPlatformIcon = (platform: PlatformType): string => {
  switch (platform) {
    case 'facebook':
      return 'Facebook';
    case 'instagram':
      return 'Instagram';
    case 'twitter':
      return 'Twitter';
    case 'youtube':
      return 'Youtube';
    case 'pinterest':
      return 'PinIcon';
    case 'linkedin':
      return 'Linkedin';
    default:
      return 'Globe';
  }
};

// Get AI model name and description
export const aiModels = [
  {
    id: 'gpt4o',
    name: 'GPT-4o',
    description: 'Most powerful model for diverse content creation',
    isDefault: true,
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    description: 'Excellent for nuanced, creative, and factual content',
    isDefault: false,
  },
];
