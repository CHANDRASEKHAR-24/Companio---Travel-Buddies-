import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Plane, ArrowRight, Check } from "lucide-react";
import { setUser, setLoading, setError } from "../store/reducers/userSlice";
import { registerUser } from "../services/userApi";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) {
      dispatch(setError("Please agree to the terms and conditions"));
      return;
    }
    
    try {
      dispatch(setLoading(true));
      const { user, token } = await registerUser(formData);
      dispatch(setUser(user));
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl shadow-large">
              <Plane className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            Join TravelBuddy
          </h1>
          <p className="text-neutral-600">
            Create your account and start your adventure today
          </p>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-large border border-white/20 p-8"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
            >
              <p className="mb-2">{error}</p>
              {(error.includes('already exists') || error.includes('Please login')) && (
                <p className="text-sm">
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-medium underline"
                  >
                    Click here to login
                  </Link>
                </p>
              )}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleInput}
                icon={User}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                icon={Mail}
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  name="password"
                  value={formData.password}
                  onChange={handleInput}
                  icon={Lock}
                  className="w-full pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 text-primary-600 bg-neutral-100 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2"
                  />
                  {agreedToTerms && (
                    <Check className="absolute top-0 left-0 w-4 h-4 text-white pointer-events-none" />
                  )}
                </div>
                <span className="text-sm text-neutral-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary-600 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              loading={isLoading}
              className="w-full"
              size="lg"
            >
              <span>{isLoading ? "Creating account..." : "Create Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <div className="p-4 bg-white/50 rounded-xl">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Plane className="w-4 h-4 text-primary-600" />
            </div>
            <p className="text-xs text-neutral-600 font-medium">Easy Booking</p>
          </div>
          <div className="p-4 bg-white/50 rounded-xl">
            <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Check className="w-4 h-4 text-secondary-600" />
            </div>
            <p className="text-xs text-neutral-600 font-medium">Verified Trips</p>
          </div>
          <div className="p-4 bg-white/50 rounded-xl">
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <User className="w-4 h-4 text-accent-600" />
            </div>
            <p className="text-xs text-neutral-600 font-medium">Community</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
