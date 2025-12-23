import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Search,
  Plus,
  Plane,
  ArrowRight,
  MessageCircle,
  X
} from "lucide-react";
import { getAllTrips, joinTrip, searchTrips } from "../services/tripApi";
import { createGroupChat, createPrivateChat } from "../services/chatApi";
import Chat from "../components/Chat/Chat";
import { Button } from "../components/ui/Button";
import { Card } from "../components";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");
  const [joiningTrip, setJoiningTrip] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedTripForChat, setSelectedTripForChat] = useState(null);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!storedUser && !user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchTrips();
  }, [location.pathname]); // Refresh when route changes

  useEffect(() => {
    filterTrips();
  }, [searchTerm, filterLocation, maxPrice, trips]);

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      setError("");
      const allTrips = await getAllTrips();
      console.log("Fetched trips:", allTrips);
      if (Array.isArray(allTrips)) {
        setTrips(allTrips);
        setFilteredTrips(allTrips);
      } else {
        console.error("Invalid trips data:", allTrips);
        setTrips([]);
        setFilteredTrips([]);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      setError("Failed to load trips. Please try again later.");
      setTrips([]);
      setFilteredTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTrips = async () => {
    try {
      setIsLoading(true);
      const searchParams = {};
      if (searchTerm) searchParams.search = searchTerm;
      if (filterLocation) searchParams.destination = filterLocation;
      if (maxPrice) searchParams.maxPrice = maxPrice;
      
      if (Object.keys(searchParams).length > 0) {
        const results = await searchTrips(searchParams);
        setFilteredTrips(results);
      } else {
        setFilteredTrips(trips);
      }
    } catch (error) {
      console.error("Error filtering trips:", error);
      // Fallback to client-side filtering
      let filtered = [...trips];
      if (searchTerm) {
        filtered = filtered.filter(trip =>
          trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filterLocation) {
        filtered = filtered.filter(trip =>
          trip.destination.toLowerCase().includes(filterLocation.toLowerCase())
        );
      }
      if (maxPrice) {
        filtered = filtered.filter(trip => trip.cost <= parseInt(maxPrice));
      }
      setFilteredTrips(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChat = async (trip) => {
    try {
      const chat = await createGroupChat(trip._id);
      setSelectedTripForChat({ ...chat, tripName: trip.name });
      setShowChat(true);
    } catch (error) {
      console.error("Error opening chat:", error);
      alert("Failed to open chat. Please try again.");
    }
  };

  const handleChatWithCreator = async (trip) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // Get creator ID - handle both populated and non-populated cases
      const creatorId = trip.createdBy?._id || trip.createdBy;
      
      if (!creatorId) {
        alert("Creator information not available.");
        return;
      }

      // Don't allow chatting with yourself
      if (creatorId === user._id) {
        alert("You cannot chat with yourself.");
        return;
      }

      // Create or get private chat with creator
      const chat = await createPrivateChat(creatorId);
      
      // Navigate to chat page with the chat ID
      navigate(`/chat?chatId=${chat._id}`);
    } catch (error) {
      console.error("Error opening chat with creator:", error);
      alert(error.message || "Failed to open chat. Please try again.");
    }
  };

  const handleJoinTrip = async (tripId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setJoiningTrip(tripId);
      await joinTrip(tripId);
      // Refresh trips after joining
      await fetchTrips();
      alert("Successfully joined the trip!");
    } catch (error) {
      alert(error.message || "Failed to join trip. You may already be a member.");
    } finally {
      setJoiningTrip(null);
    }
  };

  const isUserMember = (trip) => {
    if (!user) return false;
    return trip.members?.some(member => 
      member.user?._id === user._id || member.user === user._id
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading amazing trips...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-secondary-600/10"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
              Discover Your Next
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
              Join fellow travelers on amazing journeys around the world. Connect, explore, and create unforgettable memories together.
            </p>
            {user && (
              <Button
                size="lg"
                onClick={() => navigate("/create-trip")}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-large"
              >
                <Plus className="w-5 h-5" />
                <span>Create Your Trip</span>
              </Button>
            )}
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-large border border-white/20 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search trips..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                />
              </div>
              
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                />
              </div>

              <Button
                onClick={filterTrips}
                size="sm"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white"
              >
                <Search className="w-5 h-5" />
                <span>Filter</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="container-custom pb-20">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
            {error}
          </div>
        )}

        {filteredTrips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Plane className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-neutral-600 mb-2">
              No trips found
            </h3>
            <p className="text-neutral-500 mb-6">
              {trips.length === 0 
                ? "Be the first to create a trip!" 
                : "Try adjusting your search filters"}
            </p>
            {user && (
              <Button
                onClick={() => navigate("/create-trip")}
                size="sm"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
              >
                <Plus className="w-5 h-5" />
                <span>Create Trip</span>
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTrips.map((trip, index) => {
              const isMember = isUserMember(trip);
              const isCreator = user && trip.createdBy === user._id;
              
              return (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center&q=80`}
                      alt={trip.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center text-primary-600 font-semibold text-sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {trip.cost}
                      </div>
                    </div>

                    {/* Member Count */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center text-neutral-700 font-semibold text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        {trip.members?.length || 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-neutral-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm font-medium">{trip.destination}</span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {trip.name}
                    </h3>

                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                      {trip.description}
                    </p>

                    <div className="flex items-center text-neutral-500 mb-4 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                    </div>

                    <div className="flex items-center text-neutral-500 mb-6 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{trip.totalDays || "N/A"} days</span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 min-w-0"
                          onClick={() => navigate(`/trips/${trip._id}`)}
                        >
                          View Details
                        </Button>
                        {user && !isCreator && (
                          <Button
                            size="sm"
                            onClick={() => handleJoinTrip(trip._id)}
                            disabled={isMember || joiningTrip === trip._id}
                            className={`flex-1 min-w-0 ${
                              isMember 
                                ? "bg-secondary-500 hover:bg-secondary-600 text-white border-0" 
                                : ""
                            }`}
                          >
                            {joiningTrip === trip._id ? (
                              "Joining..."
                            ) : isMember ? (
                              "Joined"
                            ) : (
                              <>
                                <Users className="w-4 h-4" />
                                <span>Join</span>
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      
                      {/* Chat with Creator Button - Show for non-creators */}
                      {user && !isCreator && (
                        <Button
                          onClick={() => handleChatWithCreator(trip)}
                          variant="outline"
                          size="sm"
                          className="w-full border-primary-200 text-primary-600 hover:bg-primary-50"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat with Creator</span>
                        </Button>
                      )}
                      
                      {/* Chat with Members Button - Show for members */}
                      {user && isMember && (
                        <Button
                          onClick={() => handleOpenChat(trip)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat with Members</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Chat Modal */}
      {showChat && selectedTripForChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full md:w-4/5 md:h-5/6 lg:w-3/4 lg:h-4/5 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-gradient-to-r from-primary-500 to-secondary-500">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">
                  {selectedTripForChat.tripName || selectedTripForChat.name} - Chat
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowChat(false);
                  setSelectedTripForChat(null);
                }}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Chat 
                chat={selectedTripForChat}
                onBack={() => {
                  setShowChat(false);
                  setSelectedTripForChat(null);
                }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Trips;
