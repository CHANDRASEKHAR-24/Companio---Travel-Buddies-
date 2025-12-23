import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Mail, 
  Plus, 
  X,
  Plane,
  ArrowRight
} from "lucide-react";
import { createTrip } from "../services/tripApi";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const CreateTrip = () => {
  const userData = useSelector((state) => state.user);
  const { user } = userData;
  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
    name: "",
    cost: "",
  });

  const [invitationEmails, setInvitationEmails] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInvitationChange = (index, value) => {
    const updatedEmails = [...invitationEmails];
    updatedEmails[index] = value;
    setInvitationEmails(updatedEmails);
  };

  const handleAddMore = () => {
    setInvitationEmails([...invitationEmails, ""]);
  };

  const handleRemoveEmail = (index) => {
    if (invitationEmails.length > 1) {
      const updatedEmails = invitationEmails.filter((_, i) => i !== index);
      setInvitationEmails(updatedEmails);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!tripData.name || !tripData.destination || !tripData.startDate || !tripData.endDate || !tripData.cost) {
      setError("Please fill in all required fields");
      return;
    }

    if (new Date(tripData.startDate) >= new Date(tripData.endDate)) {
      setError("End date must be after start date");
      return;
    }

    setIsLoading(true);

    try {
      const updatedTripData = {
        ...tripData,
        cost: parseFloat(tripData.cost),
        invitations: invitationEmails.filter((email) => email.trim() !== ""),
      };

      const createdTrip = await createTrip(updatedTripData);
      console.log("Trip created successfully:", createdTrip);
      
      // Navigate to trips page - it will automatically refresh
      navigate("/trips", { replace: true });
    } catch (error) {
      console.error("Error creating trip:", error);
      setError(error.message || "Failed to create trip. Please try again.");
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <Plane className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-neutral-600 mb-2">
            Please login to create a trip
          </h2>
          <Button onClick={() => navigate("/login")} size="lg" className="mt-4">
            <span>Go to Login</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-24 pb-12 px-4">
      <div className="container-custom max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="p-5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl shadow-large"
            >
              <Plane className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
            Create Your Trip
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Plan your next adventure and invite friends to join you on an unforgettable journey
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 md:p-10 lg:p-12"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200">
                <h2 className="text-2xl font-display font-semibold text-neutral-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Plane className="w-4 h-4 text-primary-600" />
                  </div>
                  Basic Information
                </h2>
                <p className="text-sm text-neutral-500 mt-1 ml-10">Tell us about your trip</p>
              </div>

              {/* Trip Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Trip Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Summer Beach Getaway, Mountain Adventure, City Explorer"
                  name="name"
                  value={tripData.name}
                  onChange={handleInputChange}
                  icon={Plane}
                  className="w-full"
                  required
                />
                <p className="text-xs text-neutral-500 ml-1">Choose a catchy name for your trip</p>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Destination <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Paris, France or Goa, India"
                  name="destination"
                  value={tripData.destination}
                  onChange={handleInputChange}
                  icon={MapPin}
                  className="w-full"
                  required
                />
                <p className="text-xs text-neutral-500 ml-1">Where are you going?</p>
              </div>
            </div>

            {/* Section 2: Dates & Budget */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200">
                <h2 className="text-2xl font-display font-semibold text-neutral-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-secondary-600" />
                  </div>
                  Dates & Budget
                </h2>
                <p className="text-sm text-neutral-500 mt-1 ml-10">When and how much?</p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-700">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    value={tripData.startDate}
                    onChange={handleInputChange}
                    icon={Calendar}
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-neutral-700">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    value={tripData.endDate}
                    onChange={handleInputChange}
                    icon={Calendar}
                    className="w-full"
                    required
                  />
                </div>
              </div>

              {/* Cost */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Estimated Cost per Person (₹) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Enter estimated cost in rupees"
                  name="cost"
                  value={tripData.cost}
                  onChange={handleInputChange}
                  icon={DollarSign}
                  className="w-full"
                  min="0"
                  step="0.01"
                  required
                />
                <p className="text-xs text-neutral-500 ml-1">Approximate budget per person</p>
              </div>
            </div>

            {/* Section 3: Description */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200">
                <h2 className="text-2xl font-display font-semibold text-neutral-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary-600" />
                  </div>
                  Trip Details
                </h2>
                <p className="text-sm text-neutral-500 mt-1 ml-10">Share more about your trip</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={tripData.description}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell us about your trip plans, activities, and what makes it special...&#10;&#10;Example:&#10;• What activities are planned?&#10;• What places will you visit?&#10;• What's the travel style (budget, luxury, adventure)?&#10;• Any special requirements or notes?"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none text-neutral-700 placeholder-neutral-400"
                  required
                />
                <p className="text-xs text-neutral-500 ml-1">Be descriptive to attract the right travel buddies!</p>
              </div>
            </div>

            {/* Section 4: Invitations */}
            <div className="space-y-6">
              <div className="pb-4 border-b border-neutral-200">
                <h2 className="text-2xl font-display font-semibold text-neutral-900 flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-secondary-600" />
                  </div>
                  Invite Friends (Optional)
                </h2>
                <p className="text-sm text-neutral-500 mt-1 ml-10">Invite people you know to join your trip</p>
              </div>

              <div className="space-y-3 bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                {invitationEmails.map((email, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="email"
                        placeholder={`Friend's email ${index + 1}`}
                        value={email}
                        onChange={(e) => handleInvitationChange(index, e.target.value)}
                        icon={Mail}
                        className="w-full bg-white"
                      />
                    </div>
                    {invitationEmails.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveEmail(index)}
                        className="px-4 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddMore}
                  className="w-full border-dashed border-2 hover:border-primary-400 hover:bg-primary-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Email</span>
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-neutral-200">
              <Button
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                size="xl"
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-large"
              >
                <span>{isLoading ? "Creating Trip..." : "Create My Trip"}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-xs text-center text-neutral-500 mt-3">
                By creating a trip, you agree to share it with the TravelBuddies community
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateTrip;
