import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Star } from "lucide-react";
import { Card as UICard, CardContent } from "./ui/Card";

const Card = ({ trip, index = 0 }) => {
  const { name, destination, tripDays, cost, image, location, totalDays } = trip;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <UICard 
        hover 
        className="overflow-hidden max-w-sm mx-auto bg-white/80 backdrop-blur-sm border-0 shadow-soft hover:shadow-large transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <motion.img
            src={image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center"}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Price Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-medium"
          >
            <div className="flex items-center text-primary-600 font-semibold text-sm">
              <DollarSign className="w-4 h-4 mr-1" />
              {cost}
            </div>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-medium"
          >
            <div className="flex items-center text-accent-600 font-semibold text-sm">
              <Star className="w-3 h-3 mr-1 fill-current" />
              4.8
            </div>
          </motion.div>
        </div>

        <CardContent className="p-6">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center text-neutral-600 mb-3"
          >
            <MapPin className="w-4 h-4 mr-2 text-primary-500" />
            <span className="text-sm font-medium">{destination || location}</span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="text-xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200"
          >
            {name}
          </motion.h3>

          {/* Duration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center text-neutral-500 mb-4"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {tripDays || totalDays} days
            </span>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-4 rounded-xl font-medium text-sm shadow-medium hover:shadow-large transition-all duration-200 group-hover:from-primary-600 group-hover:to-primary-700 cursor-pointer"
            >
              View Details
            </motion.button>
          </motion.div>
        </CardContent>
      </UICard>
    </motion.div>
  );
};

Card.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string.isRequired,
    destination: PropTypes.string,
    tripDays: PropTypes.number,
    cost: PropTypes.number.isRequired,
    image: PropTypes.string,
    location: PropTypes.string,
    totalDays: PropTypes.number,
  }),
  index: PropTypes.number,
};

export default Card;
