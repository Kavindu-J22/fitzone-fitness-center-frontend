import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = ({ component: Component }) => {
  const { authToken } = useAuth();

  return authToken ? <Component /> : <Navigate to="/" />;
};
