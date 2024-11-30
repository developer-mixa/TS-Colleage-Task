import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  const checkToken = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include' 
      });

      if (!response.ok) {
        return <Navigate to="/login" />
      }

      const data = await response.json();
      console.log('Проверка токена прошла успешно:', data);
    } catch (error) {
      console.error('Ошибка при проверке токена:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return <Navigate to="/login" />
    }
  };

  checkToken();

  return <>{children}</>;
};

export default ProtectedRoute;
