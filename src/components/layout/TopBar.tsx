
import React from 'react';
import { 
  Bell, 
  UserCircle, 
  ChevronDown, 
  Moon, 
  Sun,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocation } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
  const pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/creator': 'Content Creator',
    '/scheduler': 'Scheduler',
    '/analytics': 'Analytics',
    '/ai-assistant': 'AI Assistant',
    '/settings': 'Settings',
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="h-16 px-4 border-b flex items-center justify-between bg-white dark:bg-dark-purple">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">
          {pageTitles[location.pathname] || 'AI Studio'}
        </h1>
        {location.pathname !== '/dashboard' && (
          <div className="flex items-center text-gray-500 ml-2">
            <span className="hidden sm:inline-block">Dashboard</span>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span>{pageTitles[location.pathname]}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="py-2 px-4 text-sm text-muted-foreground">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <UserCircle className="h-6 w-6" />
              <span className="hidden sm:inline-block">{user?.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Subscription
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
