import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignInSignUpPage from './components/SignInSignUpPage';
import FormPage from './components/FormPage';
import InactivityDetector from './components/InactivityDetector';
import HomePage from './components/HomePage'
import AboutUs from './components/AboutUs';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    // Clear authentication tokens or perform any necessary logout tasks
    setIsAuthenticated(false);

    // Redirect to the login page
    navigate('/');
  };

  return (
    <InactivityDetector logout={logout}>
      <Routes>
        <Route
          path="/"
          element={
           <HomeAndSignUpLayout
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
           />
          }
        />
        <Route
          path="/form"
          element={
            <FormPage isAuthenticated={isAuthenticated} />
          }
        />
      </Routes>

    </InactivityDetector>
  );
}

function HomeAndSignUpLayout({ isAuthenticated, setIsAuthenticated }) {
  const [showAbout, setShowAbout] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowAbout(scrollY > 200); // Show About Us section when user scrolls down 200 pixels
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
        <div className="flex-container" style={{"display": "flex", "justifyContent": "space-between", "align-items": "center", "height": "100vh", "padding": "20px"}}>
          <HomePage />
          <div className="vertical-line" style={{"width": "1px", "height": "80%", "background-color": "#ccc", "margin": "0 20px"}}/>
          <SignInSignUpPage
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
        </div>
        <AboutUs />
    </div>
  );
}

export default App;
