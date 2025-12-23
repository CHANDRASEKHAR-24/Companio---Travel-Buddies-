import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Heart, 
  Shield, 
  Star, 
  Award,
  MapPin,
  Plane,
  Camera,
  Compass
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Connect with like-minded travelers and build lasting friendships through shared adventures."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Discover destinations worldwide and explore cultures from every corner of the globe."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Travel",
      description: "We believe travel transforms lives and creates unforgettable memories that last forever."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Secure",
      description: "Your safety is our priority with verified users and secure payment processing."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Quality Experiences",
      description: "Curated trips and experiences that exceed expectations and create magical moments."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winning",
      description: "Recognized platform trusted by thousands of travelers worldwide."
    }
  ];

  const stats = [
    { number: "100+", label: "Happy Travelers" },
    { number: "10+", label: "Successful Trips" },
    { number: "1", label: "Countries Covered" },
    { number: "4.9/5", label: "User Rating" }
  ];

  const team = [
    {
      name: "Chandra Shekhar",
      role: "Team Lead",
      image: "https://res.cloudinary.com/dlwbk83ku/image/upload/v1763355755/chanduphoto_dfnfn0.jpg",
      description: "Responsible for leading the team, overseeing project planning, coordinating tasks, and ensuring the project is completed on time with high quality."
    },
    {
      name: "OmkarReddyg",
      role: "Team Member",
      image: "https://res.cloudinary.com/dlwbk83ku/image/upload/v1739268237/IMG-20240902-WA0046_bt8ycd.jpg",
      description: "TeHandled the technical development of the project, including front-end implementation, UI logic, and ensuring a responsive and user-friendly experience.ch innovator passionate about creating seamless travel experiences."
    },
    {
      name: "Bhaskar",
      role: "Team Member",
      image: "https://res.cloudinary.com/dlwbk83ku/image/upload/v1763355755/bhaskarphoto_knq6xf.jpg",
      description: "OperManaged core operations, documentation, and quality checks to ensure smooth workflow and accurate project execution.ations expert ensuring every trip runs smoothly and safely."
    },
     {
      name: "Hari Charan",
      role: "Team Member",
      image: "https://res.cloudinary.com/dlwbk83ku/image/upload/v1763355755/hariphoto_n5qkip.jpg",
      description: "Contributed to feature development, testing, and debugging while supporting backend logic and ensuring seamless integration across modules.Operations expert ensuring every trip runs smoothly and safely."
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
              About Travel Buddies
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8">
              Your ultimate platform for group travel planning, coordination, and unforgettable adventures
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

      {/* Mission Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  At Travel Buddies, we believe that the best adventures are shared. Our mission is to 
                  connect passionate travelers, facilitate meaningful group experiences, and make travel 
                  planning effortless and enjoyable for everyone.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  We're not just a platform; we're a community of explorers, dreamers, and adventure-seekers 
                  who understand that the journey is just as important as the destination.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-6 bg-white rounded-2xl shadow-soft"
                  >
                    <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
                    <div className="text-neutral-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-large">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center"
                  alt="Travel Mission"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose Travel Buddies
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              We're committed to providing the best possible travel experience for our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Team Section */}
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
              Meet Our Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              The passionate people behind Travel Buddies, dedicated to making your travel dreams come true
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-large group-hover:shadow-glow transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-neutral-600 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-large">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&crop=center"
                  alt="Our Values"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                  Our Values
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  We're guided by core values that shape everything we do and every experience we create.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Compass className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Adventure First
                    </h3>
                    <p className="text-neutral-600">
                      We believe in pushing boundaries and exploring the unknown, creating experiences that challenge and inspire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Community Spirit
                    </h3>
                    <p className="text-neutral-600">
                      Building connections and fostering friendships through shared experiences and mutual support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Camera className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Authentic Experiences
                    </h3>
                    <p className="text-neutral-600">
                      Creating genuine, meaningful experiences that connect you with local cultures and traditions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Ready to Start Your Journey?
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
                Explore Trips
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200"
              >
                <MapPin className="w-5 h-5 inline mr-2" />
                Create Trip
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;




