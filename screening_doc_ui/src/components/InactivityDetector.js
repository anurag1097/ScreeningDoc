import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const InactivityDetector = ({ children, logout }) => {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleInteraction = () => {
      setLastActivityTime(Date.now());
    };

    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  useEffect(() => {
    const inactivityTimeout = setTimeout(() => {
      logout();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    return () => clearTimeout(inactivityTimeout);
  }, [lastActivityTime, logout]);

  return <>{children}</>;
};

export default InactivityDetector;
