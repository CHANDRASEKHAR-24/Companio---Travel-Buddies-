import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  MessageCircle, 
  Calendar, 
  Shield, 
  Star,
  Plane,
  Camera,
  Compass,
  Heart,
  Globe,
  Award
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Trip Planning",
      description: "Plan and organize group trips with ease. Create detailed itineraries, manage budgets, and coordinate with all participants.",
      features: ["Custom Itineraries", "Budget Management", "Group Coordination", "Real-time Updates"]
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Communication",
      description: "Stay connected with your travel companions through our integrated chat system. Share updates, photos, and memories instantly.",
      features: ["Group Chats", "Private Messaging", "Photo Sharing", "Location Sharing"]
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Destination Discovery",
      description: "Explore amazing destinations worldwide. Get recommendations, read reviews, and discover hidden gems from fellow travelers.",
      features: ["Destination Guides", "Local Recommendations", "Travel Tips", "Community Reviews"]
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Event Coordination",
      description: "Coordinate activities, bookings, and schedules for your group. Keep everyone informed and organized throughout the trip.",
      features: ["Activity Booking", "Schedule Management", "Reminder System", "Group Notifications"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety & Security",
      description: "Travel with confidence knowing your safety is our priority. Verified users, secure payments, and 24/7 support.",
      features: ["User Verification", "Secure Payments", "Emergency Support", "Travel Insurance"]
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Experiences",
      description: "Access exclusive travel experiences, premium accommodations, and curated activities designed for memorable adventures.",
      features: ["Exclusive Deals", "Premium Accommodations", "Curated Activities", "VIP Services"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Create Your Trip",
      description: "Set up your trip with destination, dates, and group size. Customize your itinerary and invite friends to join.",
      icon: <Plane className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Connect & Plan",
      description: "Use our chat system to coordinate with your group. Share ideas, make decisions, and plan activities together.",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Book & Organize",
      description: "Book accommodations, activities, and transportation. Our platform helps you manage all bookings in one place.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Travel & Enjoy",
      description: "Embark on your adventure with confidence. Stay connected, share memories, and create unforgettable experiences.",
      icon: <Camera className="w-6 h-6" />
    }
  ];

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for small groups and casual travelers",
      features: [
        "Up to 5 group members",
        "Basic trip planning",
        "Group chat",
        "Basic support"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "/month",
      description: "Ideal for regular travelers and larger groups",
      features: [
        "Up to 20 group members",
        "Advanced trip planning",
        "Real-time chat & calls",
        "Priority support",
        "Exclusive deals",
        "Travel insurance"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For travel agencies and large organizations",
      features: [
        "Unlimited group members",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "Analytics dashboard",
        "API access"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Everything you need for the perfect group travel experience
            </p>
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

      {/* Services Grid */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              What We Offer
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Comprehensive services designed to make your group travel seamless and unforgettable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-300 group"
              >
                <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-neutral-600">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              How It Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Simple steps to create your perfect group travel experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-soft">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Flexible pricing options to suit every type of traveler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-large transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {plan.price}
                    {plan.period && <span className="text-lg text-neutral-600">{plan.period}</span>}
                  </div>
                  <p className="text-neutral-600">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      </div>
                      <span className="text-neutral-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Join thousands of travelers who have discovered their perfect adventure with Travel Buddies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl shadow-large hover:shadow-glow transition-all duration-200"
              >
                <Plane className="w-5 h-5 inline mr-2" />
                Start Your Journey
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;




