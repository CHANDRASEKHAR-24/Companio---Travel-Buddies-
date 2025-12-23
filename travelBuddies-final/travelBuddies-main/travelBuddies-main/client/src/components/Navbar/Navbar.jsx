import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  User, 
  LogIn, 
  UserPlus, 
  Menu, 
  X,
  Plane,
  MessageCircle,
  LogOut,
  Globe
} from "lucide-react";
import { Button } from "../ui/Button";

const Navbar = ({ logOut }) => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Plane },
    { name: 'About', path: '/about', icon: User },
    { name: 'Services', path: '/services', icon: Globe },
    { name: 'Trips', path: '/trips', icon: MapPin },
    { name: 'Contact', path: '/contact', icon: MessageCircle },
  ];

  const userNavItems = user ? [
    { name: 'Chat', path: '/chat', icon: MessageCircle },
    { name: 'Profile', path: '/profile', icon: User },
  ] : [
    { name: 'Login', path: '/login', icon: LogIn },
    { name: 'Sign Up', path: '/signup', icon: UserPlus },
  ];

  const handleLogout = async () => {
    if (logOut) {
      logOut();
    } else {
      // Fallback logout
      localStorage.clear();
      window.location.href = '/login';
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-neutral-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl group-hover:shadow-glow transition-all duration-300">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-display font-bold hero-text-gradient">
                TravelBuddy
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {userNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  {item.name === 'Login' || item.name === 'Sign Up' ? (
                    <Button
                      variant={item.name === 'Sign Up' ? 'primary' : 'outline'}
                      size="sm"
                      asChild
                    >
                      <Link to={item.path} className="flex items-center">
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    </Button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              );
            })}
            {user && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/50"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.name}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item.path}
                        className={`mobile-nav-item ${
                          isActive ? 'mobile-nav-item-active' : ''
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
                
                <div className="border-t border-neutral-200 pt-4 space-y-3">
                  {userNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.name === 'Login' || item.name === 'Sign Up' ? (
                          <Button
                            variant={item.name === 'Sign Up' ? 'primary' : 'outline'}
                            size="sm"
                            className="w-full justify-start"
                            asChild
                          >
                            <Link to={item.path} className="flex items-center">
                              <Icon className="w-4 h-4 mr-2" />
                              {item.name}
                            </Link>
                          </Button>
                        ) : (
                          <Link
                            to={item.path}
                            className={`mobile-nav-item ${
                              isActive ? 'mobile-nav-item-active' : ''
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Icon className="w-5 h-5 mr-3" />
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                  {user && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span>Logout</span>
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
