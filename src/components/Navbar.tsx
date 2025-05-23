
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blueprint" />
          <span className="font-semibold text-xl">ArchViz 3D</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blueprint font-medium">
              Home
            </Link>
            <Link to="/models" className="text-gray-700 hover:text-blueprint font-medium">
              My Projects
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blueprint font-medium">
              About
            </Link>
            <Button variant="default" className="ml-4">
              Get Started
            </Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobile && mobileMenuOpen && (
        <div className="container mx-auto px-4 py-4 bg-white border-t border-gray-200 flex flex-col gap-4 animate-fade-in">
          <Link 
            to="/" 
            className="block py-2 text-gray-700 hover:text-blueprint font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/models" 
            className="block py-2 text-gray-700 hover:text-blueprint font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            My Projects
          </Link>
          <Link 
            to="/about" 
            className="block py-2 text-gray-700 hover:text-blueprint font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Button variant="default" className="w-full mt-2">
            Get Started
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
