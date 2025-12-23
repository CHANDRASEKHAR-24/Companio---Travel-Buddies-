import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Plane,
  Globe,
  Shield,
  Heart,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { Card } from "../components";
import { features } from "../constants";
import { getAllTrips } from "../services/tripApi";
import { Button } from "../components/ui/Button";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch trips if user is logged in
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser || user) {
      fetchTrips();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const allTrips = await getAllTrips();
      console.log("Home - Fetched trips:", allTrips);
      if (Array.isArray(allTrips)) {
        // Transform trips to match Card component expectations
        const transformedTrips = allTrips.slice(0, 8).map((trip) => ({
          ...trip,
          location: trip.destination,
          tripDays: trip.totalDays,
          image: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center&q=80`,
        }));
        setTrips(transformedTrips);
      } else {
        console.error("Home - Invalid trips data:", allTrips);
        setTrips([]);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedTrips = trips;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop&crop=center"
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/75 via-primary-800/55 to-secondary-900/75" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Welcome Message for Logged-in Users */}
            {(user || JSON.parse(localStorage.getItem("user") || "null")) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-8"
              >
                <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                  <p className="text-lg md:text-xl text-white">
                    Welcome back,{" "}
                    <span className="font-bold text-accent-300">
                      {(
                        user?.name ||
                        JSON.parse(localStorage.getItem("user") || "{}")?.name
                      )?.split(" ")[0] || "Traveler"}
                    </span>
                    ! 👋
                  </p>
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-4xl font-display font-bold mb-6 leading-tight"
            >
              Discover Your Next
              <span className="block bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                Adventure
              </span>
              With Companio-travelBuddies
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-1xl text-neutral-200 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Explore breathtaking destinations, create unforgettable memories,
              and find your perfect travel companion.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => navigate("/trips")}
                className="bg-white text-600 hover:bg-neutral-100 font-semibold shadow-large hover:shadow-glow px-6 py-3 border-0 border-2 border-white/50"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              {(user || JSON.parse(localStorage.getItem("user") || "null")) && (
                <Button
                  size="lg"
                  onClick={() => navigate("/create-trip")}
                  className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold shadow-large hover:shadow-glow px-8 py-4 border-0"
                >
                  <Plane className="w-5 h-5" />
                  <span>Create Trip</span>
                </Button>
              )}
              {!(
                user || JSON.parse(localStorage.getItem("user") || "null")
              ) && (
                <Button
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="bg-white/20 backdrop-blur-md border-2 border-white/50 text-white hover:bg-white/30 hover:border-white/70 font-semibold shadow-large px-6 py-3"
                >
                  <span>Get Started</span>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-12 h-12 bg-accent-400/20 rounded-full backdrop-blur-sm"
        />
      </section>

      {/* Popular Destinations Section - Only show if logged in */}
      {(user || JSON.parse(localStorage.getItem("user") || "null")) && (
        <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                Popular Destinations
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Discover amazing places around the world and create
                unforgettable memories
              </p>
            </motion.div>

            {/* Trip Cards Grid */}
            {isLoading ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-600">Loading amazing trips...</p>
              </div>
            ) : displayedTrips.length === 0 ? (
              <div className="text-center py-20">
                <Plane className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-neutral-600 mb-2">
                  No trips available yet
                </h3>
                <p className="text-neutral-500 mb-6">
                  Be the first to create an amazing trip!
                </p>
                {user && (
                  <Button
                    onClick={() => navigate("/create-trip")}
                    size="lg"
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                  >
                    <span>Create Trip</span>
                  </Button>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {displayedTrips.map((trip, index) => (
                  <div
                    key={trip._id || index}
                    onClick={() => trip._id && navigate(`/trips/${trip._id}`)}
                    className="cursor-pointer"
                  >
                    <Card trip={trip} index={index} />
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              About Travel Buddies
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Your ultimate platform for group travel planning, coordination,
              and unforgettable adventures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-large">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center"
                  alt="About Travel Buddies"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-large"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Star className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">4.9</p>
                    <p className="text-sm text-neutral-600">Rating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-display font-bold text-neutral-900 mb-6">
                  Connect, Plan, and Explore Together
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Travel Buddies is more than just a travel platform - it's your
                  gateway to meaningful connections and shared adventures.
                  Whether you're planning a weekend getaway or an epic
                  international journey, we bring people together to create
                  unforgettable memories.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Our platform combines smart trip planning tools, real-time
                  communication, and community features to make group travel
                  seamless and enjoyable for everyone involved.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    10+
                  </div>
                  <div className="text-neutral-600">Happy Travelers</div>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    5+
                  </div>
                  <div className="text-neutral-600">Successful Trips</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-200"
              >
                <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              Why Choose Travel Buddies
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Experience the difference with our comprehensive travel planning
              platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Global Reach
              </h3>
              <p className="text-neutral-600">
                Discover destinations worldwide and connect with travelers from
                every corner of the globe.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Safe & Secure
              </h3>
              <p className="text-neutral-600">
                Your safety is our priority with verified users and secure
                payment processing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Community First
              </h3>
              <p className="text-neutral-600">
                Build lasting friendships through shared experiences and common
                interests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Easy Planning
              </h3>
              <p className="text-neutral-600">
                Streamlined tools make trip planning effortless and enjoyable
                for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Have questions or want to share your travel stories? We'd love to
              hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-large"
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Send us a message
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
                    placeholder="Tell us about your travel plans or ask any questions..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-4 rounded-xl shadow-large hover:shadow-glow transition-all duration-200"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                <p className="text-primary-100 text-lg leading-relaxed mb-8">
                  Ready to start your next adventure? Reach out to us and let's
                  make your travel dreams come true!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Office Address
                    </h4>
                    <p className="text-primary-100">
                      123 Travel Street
                      <br />
                      Adventure City, AC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Email Us
                    </h4>
                    <p className="text-primary-100">
                      hello@travelbuddies.com
                      <br />
                      support@travelbuddies.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Call Us
                    </h4>
                    <p className="text-primary-100">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri 9AM-6PM EST
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  <div className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-200 cursor-pointer">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-200 cursor-pointer">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors duration-200 cursor-pointer">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
