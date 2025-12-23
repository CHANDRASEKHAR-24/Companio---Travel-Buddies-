import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { SocketProvider } from './contexts/SocketContext';
import { setUser } from './store/reducers/userSlice';
import { logoutUser } from './services/userApi';

// Pages
import {
  Home,
  Login,
  Signup,
  CreateTrip,
  Trips,
  TripDetails,
  UpdateTrip,
  Profile,
  ChatPage,
  About,
  Services,
  Contact,
  NotFound,
  LandingPage
} from './pages';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to home if logged in)
const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return !user ? children : <Navigate to="/" replace />;
};

// App Content with logout handler
const AppContent = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      logoutUser();
      dispatch(setUser(null));
      window.location.href = '/login';
    } catch (error) {
      // Force logout
      localStorage.clear();
      dispatch(setUser(null));
      window.location.href = '/login';
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar logOut={handleLogout} />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/create-trip" 
              element={
                <ProtectedRoute>
                  <CreateTrip />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trips" 
              element={
                <ProtectedRoute>
                  <Trips />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trips/:id" 
              element={<TripDetails />} 
            />
            <Route 
              path="/trips/:id/edit" 
              element={
                <ProtectedRoute>
                  <UpdateTrip />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <SocketProvider>
        <AppContent />
      </SocketProvider>
    </Provider>
  );
}

export default App;
