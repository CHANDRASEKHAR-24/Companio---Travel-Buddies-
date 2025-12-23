import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold">
                Travel<span className="text-primary-400">Buddy</span>
              </h2>
            </div>
            <p className="text-neutral-300 leading-relaxed mb-6">
              We are a passionate team of travel enthusiasts dedicated to providing unforgettable experiences and helping you create lifelong memories.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trips" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Trips
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-neutral-300">1234 TripPlanner, Vadodara, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@tripplanner.com" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  info@tripplanner.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+919327616273" className="text-neutral-300 hover:text-primary-400 transition-colors">
                  +91 9327616273
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-neutral-700 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-neutral-700 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-neutral-700 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-neutral-700 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-700 mt-12 pt-8 text-center">
          <p className="text-neutral-400">
            © {new Date().getFullYear()} TravelBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
