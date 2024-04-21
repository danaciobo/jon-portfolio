import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/UserContext';


const PrivateRoute = () => {
  const { currentUser, authInitialized } = useAuth();

  if (!authInitialized) {
    return <div>Loading...</div>; // Or any loading indicator you prefer
  }

  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;

