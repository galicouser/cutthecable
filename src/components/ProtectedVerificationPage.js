import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedVerificationPage = ({ children }) => {
  const location = useLocation();

  if (!location.state || !location.state.fromVerification) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedVerificationPage;