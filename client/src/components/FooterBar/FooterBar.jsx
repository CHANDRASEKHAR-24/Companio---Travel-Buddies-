import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Plane, 
  MapPin, 
  Mail, 
  Phone, 
  Twitter, 
  Instagram, 
  Facebook, 
  Linkedin,
  Heart,
  ArrowRight
} from "lucide-react";

const FooterBar = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Safety", href: "/safety" },
      { name: "Community", href: "/community" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refunds" },
    ],
    social: [
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "Instagram", href: "#", icon: Instagram },
      { name: "Facebook", href: "#", icon: Facebook },
      { name: "LinkedIn", href: "#", icon: Linkedin },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl group-hover:shadow-glow transition-all duration-300">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-display font-bold">TravelBuddy</span>
              </Link>
              
              <p className="text-neutral-300 mb-6 leading-relaxed max-w-md">
                Discover amazing destinations, create unforgettable memories, and find your perfect travel companion. 
                Your next adventure starts here.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">hello@travelbuddy.com</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-300">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-neutral-700"
          >
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
              <p className="text-neutral-300 text-sm mb-4">
                Get the latest travel deals and destination inspiration delivered to your inbox.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl border border-neutral-600 bg-neutral-800 text-white placeholder-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium hover:shadow-glow transition-all duration-200 flex items-center"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm"
            >
              © {currentYear} TravelBuddy. All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 inline text-red-500" /> for travelers.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-4"
            >
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-neutral-800 hover:bg-primary-600 rounded-lg transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
