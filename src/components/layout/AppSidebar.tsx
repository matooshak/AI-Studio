
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  PenTool, 
  Calendar, 
  BarChart3, 
  Settings, 
  MessageSquareText,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Content Creator', path: '/creator', icon: PenTool },
    { name: 'Scheduler', path: '/scheduler', icon: Calendar },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'AI Assistance', path: '/ai-assistant', icon: MessageSquareText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-30 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo and Collapse Button */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center">
            {!isCollapsed && (
              <span className="text-xl font-bold gradient-text">AI Studio</span>
            )}
            {isCollapsed && (
              <span className="text-xl font-bold">AI</span>
            )}
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nav Items */}
        <nav className="p-2 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors group",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center py-2 px-3 w-full justify-start rounded-md hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground text-sidebar-foreground",
              isCollapsed && "justify-center"
            )}
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppSidebar;
