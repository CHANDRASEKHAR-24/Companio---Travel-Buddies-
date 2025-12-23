import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Edit,
  Trash2,
  ArrowLeft,
  Plane,
  Mail
} from "lucide-react";
import { getTripById, deleteTrip, joinTrip, leaveTrip } from "../services/tripApi";
import { Button } from "../components/ui/Button";
import CalendarComponent from "../components/CalendarComponent";

const TripDetails = () => {
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTripDetails();
  }, [id]);

  const fetchTripDetails = async () => {
    try {
      setIsLoading(true);
      const tripData = await getTripById(id);
      setTrip(tripData);
    } catch (error) {
      setError("Failed to load trip details. Please try again later.");
      console.error("Error fetching trip details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (trip?.createdBy === user?._id || trip?.createdBy?._id === user?._id) {
      navigate(`/trips/${id}/edit`);
    } else {
      alert("You don't have permission to edit this trip");
    }
  };

  const handleDelete = async () => {
    if (trip?.createdBy === user?._id || trip?.createdBy?._id === user?._id) {
      if (window.confirm("Are you sure you want to delete this trip? This action cannot be undone.")) {
        try {
          await deleteTrip(id);
          navigate("/trips");
        } catch (error) {
          alert("Failed to delete trip. Please try again.");
          console.error("Error deleting trip:", error);
        }
      }
    } else {
      alert("You don't have permission to delete this trip");
    }
  };

  const handleJoinTrip = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setIsJoining(true);
      await joinTrip(id);
      await fetchTripDetails(); // Refresh trip data
      alert("Successfully joined the trip!");
    } catch (error) {
      alert(error.message || "Failed to join trip. You may already be a member.");
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeaveTrip = async () => {
    if (!user) return;

    if (window.confirm("Are you sure you want to leave this trip?")) {
      try {
        await leaveTrip(id);
        await fetchTripDetails(); // Refresh trip data
        alert("Successfully left the trip");
      } catch (error) {
        alert(error.message || "Failed to leave trip.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isUserMember = () => {
    if (!user || !trip) return false;
    return trip.members?.some(
      (member) =>
        member.user?._id === user._id ||
        member.user === user._id ||
        member.user?.toString() === user._id?.toString()
    );
  };

  const isCreator = () => {
    if (!user || !trip) return false;
    return (
      trip.createdBy === user._id ||
      trip.createdBy?._id === user._id ||
      trip.createdBy?.toString() === user._id?.toString()
    );
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
          <p className="text-neutral-600">Loading trip details...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <Plane className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-neutral-600 mb-2">
            {error || "Trip not found"}
          </h2>
          <Button onClick={() => navigate("/trips")} size="sm" className="mt-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Trips</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20 py-12 px-4">
      <div className="container-custom max-w-7xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/trips")}
          className="mb-6 flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Trips
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
                    {trip.name}
                  </h1>
                  <div className="flex items-center text-neutral-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                    <span className="text-lg font-medium">{trip.destination}</span>
                  </div>
                </div>
                {isCreator() && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDelete}
                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-lg text-neutral-700 leading-relaxed">
                {trip.description}
              </p>
            </motion.div>

            {/* Trip Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8"
            >
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Trip Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-primary-50 rounded-xl">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Start Date</p>
                    <p className="text-lg font-semibold text-neutral-900">
                      {formatDate(trip.startDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-secondary-50 rounded-xl">
                  <div className="p-3 bg-secondary-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">End Date</p>
                    <p className="text-lg font-semibold text-neutral-900">
                      {formatDate(trip.endDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-accent-50 rounded-xl">
                  <div className="p-3 bg-accent-100 rounded-xl">
                    <DollarSign className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Cost per Person</p>
                    <p className="text-lg font-semibold text-neutral-900">₹{trip.cost}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-primary-50 rounded-xl">
                  <div className="p-3 bg-primary-100 rounded-xl">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Total Days</p>
                    <p className="text-lg font-semibold text-neutral-900">
                      {trip.totalDays || "N/A"} days
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Members */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8"
            >
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Trip Members ({trip.members?.length || 1})
              </h2>
              <div className="space-y-3">
                {trip.members?.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {member.user?.name?.[0] || "U"}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-900">
                        {member.user?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Joined {new Date(member.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8"
            >
              <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6">
                Trip Duration
              </h2>
              <CalendarComponent
                startDate={trip.startDate}
                endDate={trip.endDate}
              />
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8"
            >
              {user ? (
                <div className="space-y-4">
                  {isCreator() ? (
                    <div className="text-center p-4 bg-primary-50 rounded-xl">
                      <p className="text-primary-700 font-semibold">
                        You are the trip creator
                      </p>
                    </div>
                  ) : isUserMember() ? (
                    <Button
                      onClick={handleLeaveTrip}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <span>Leave Trip</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleJoinTrip}
                      disabled={isJoining}
                      size="sm"
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                    >
                      <span>{isJoining ? "Joining..." : "Join Trip"}</span>
                      <Users className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate("/chat")}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Chat with Members</span>
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="text-neutral-600 mb-4">
                    Login to join this trip and chat with members
                  </p>
                  <Button
                    onClick={() => navigate("/login")}
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
                  >
                    <span>Login to Join</span>
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
