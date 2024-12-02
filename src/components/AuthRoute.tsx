import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  const isAuthenticated = useSelector(selectIsAuth);

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export default AuthRoute;
