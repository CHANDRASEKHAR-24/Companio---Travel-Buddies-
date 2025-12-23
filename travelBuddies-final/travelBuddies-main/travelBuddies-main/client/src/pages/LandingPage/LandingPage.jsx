import React from 'react'
import { useSelector } from "react-redux";
import { useState , useEffect} from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  ArrowRight,
  Filter,
  Plus
} from "lucide-react";

import { Card, Header } from "../../components";
import { trips, images, features } from "../../constants";
import {getAllTrips} from "../../services/tripApi"
import { Button } from "../../components/ui/Button";

const LandingPage = () => {
  const user = useSelector((state) => state.user.user);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const getAllTrip = async() => {
    try {
      setLoading(true);
      const tripsData = await getAllTrips();
      setTrips(tripsData || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllTrip();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
  };

  const filteredTrips = trips?.filter((trip) => {
    const destinationMatch = trip?.destination?.toLowerCase().includes(filter.toLowerCase()) || 
                           trip?.name?.toLowerCase().includes(filter.toLowerCase());
    const searchMatch = search === "" || 
                       trip?.name?.toLowerCase().includes(search.toLowerCase()) ||
                       trip?.description?.toLowerCase().includes(search.toLowerCase());
    const priceMatch = priceRange === "" || trip?.cost <= parseInt(priceRange);
    
    return destinationMatch && searchMatch && priceMatch;
  });

  const displayedTrips = filteredTrips || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Discover Amazing
              <span className="block bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                Travel Adventures
              </span>
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Join exciting group trips, meet fellow travelers, and create unforgettable memories together.
            </p>
            
            {user && (
              <Link to="/create-trip">
                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-neutral-100 font-semibold px-8 py-4 rounded-xl shadow-large hover:shadow-glow transition-all duration-200 group"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Trip
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b border-neutral-200">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search trips..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Destination"
                    value={filter}
                    onChange={handleFilterChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  />
                </div>
                
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="number"
                    placeholder="Max price"
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  />
                </div>
                
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-large hover:shadow-glow transition-all duration-200"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trips Grid Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              Available Trips
            </h2>
            <p className="text-neutral-600">
              {displayedTrips.length} trip{displayedTrips.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : displayedTrips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">No trips found</h3>
              <p className="text-neutral-600 mb-8">
                {filter || search || priceRange 
                  ? "Try adjusting your search criteria" 
                  : "Be the first to create an amazing trip!"
                }
              </p>
              {user && (
                <Link to="/create-trip">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-8 py-4 rounded-xl shadow-large hover:shadow-glow transition-all duration-200"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Trip
                  </Button>
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {displayedTrips.map((trip, index) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/trips/${trip._id}`}>
                    <div className="bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&crop=center"
                          alt={trip.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-sm font-semibold text-neutral-900">
                            ${trip.cost}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                          {trip.name}
                        </h3>
                        <p className="text-neutral-600 mb-4 line-clamp-2">
                          {trip.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <MapPin className="w-4 h-4" />
                            <span>{trip.destination}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <Users className="w-4 h-4" />
                            <span>{trip.members?.length || 0} member{(trip.members?.length || 0) !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary-600">
                            ${trip.cost}
                          </span>
                          <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default LandingPage;