import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users,
  Search,
  Plus,
  LogOut,
  Edit,
  Plane,
  Trash2
} from "lucide-react";
import { getUserTrips, deleteTrip } from "../services/tripApi";
import { logoutUser } from "../services/userApi";
import { setUser } from "../store/reducers/userSlice";
import { Button } from "../components/ui/Button";
import { Card } from "../components";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = userData;

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetchUserTrips();
    }
  }, [user?._id, location.pathname]);

  useEffect(() => {
    const filtered = trips.filter((trip) =>
      trip.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrips(filtered);
  }, [trips, searchTerm]);

  const fetchUserTrips = async () => {
    try {
      setIsLoading(true);
      const userTrips = await getUserTrips(user._id);
      setTrips(userTrips || []);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setTrips([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      localStorage.clear();
      dispatch(setUser(null));
      navigate("/login");
    }
  };

  const handleDeleteTrip = async (tripId) => {
    if (window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
      try {
        await deleteTrip(tripId);
        await fetchUserTrips();
        alert("Trip deleted successfully");
      } catch (error) {
        alert("Failed to delete trip. Please try again.");
        console.error("Error deleting trip:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <User className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-neutral-600 mb-2">
            Please login to view your profile
          </h2>
          <Button onClick={() => navigate("/login")} size="lg" className="mt-4">
            <span>Go to Login</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
      <div className="container-custom py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-large">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              
              {/* User Info */}
              <div>
                <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                  {user.name}
                </h1>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Plane className="w-4 h-4" />
                      <span>{trips.length} Trips</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/create-trip")}
              >
                <Plus className="w-4 h-4" />
                <span>Create Trip</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Your Trips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                Your Trips
              </h2>
              <p className="text-neutral-600">
                Manage and view all your created trips
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Trips Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-600">Loading your trips...</p>
              </div>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-20">
              <Plane className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-neutral-600 mb-2">
                {searchTerm ? "No trips found" : "No trips yet"}
              </h3>
              <p className="text-neutral-500 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Start your journey by creating your first trip!"
                }
              </p>
              {!searchTerm && (
                <Button
                  onClick={() => navigate("/create-trip")}
                  size="lg"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Trip</span>
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTrips.map((trip, index) => (
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

                    {/* Delete Button */}
                    <div className="absolute top-4 left-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTrip(trip._id);
                        }}
                        className="bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700 hover:bg-white border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-neutral-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="text-sm font-medium">{trip.destination}</span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
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
                      <Users className="w-4 h-4 mr-2" />
                      <span>{trip.members?.length || 1} members</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 min-w-0"
                        onClick={() => navigate(`/trips/${trip._id}`)}
                      >
                        <span>View Details</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 min-w-0"
                        onClick={() => navigate(`/trips/${trip._id}/edit`)}
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
