
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-accent/30 dark:from-dark-purple dark:to-black">
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-dark-purple/80 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">AI Studio</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="border-t bg-white dark:bg-dark-purple py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Studio</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Empower your social media presence with AI-driven content creation and analytics.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/#features" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/#pricing" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                support@aistudio.com
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AI Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
