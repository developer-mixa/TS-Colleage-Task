import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth, login, logout } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const checkToken = (token: string) => {
  const dispatch = useDispatch()
  return new Promise((resolve) => {
    
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.ok) {
        dispatch(login());
      } else {
        dispatch(logout());
      }
      resolve(true);
    })
    .catch(error => {
      console.error('Ошибка при проверке токена:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
      resolve(false);
    });
  });
};

const AuthRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('accessToken');

  if(!token){
    return <Navigate to="/login" />;
  }

  console.log(token);

  checkToken(token);

  const isAuthenticated = useSelector(selectIsAuth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

export default AuthRoute;
