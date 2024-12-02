import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main-page/MainPage'
import ServicePage from '../../pages/service-page/ServicePage'
import NotFound from '../../pages/not-found-page/not_found'
import LoginPage from '../../pages/login-page/LoginPage'
import ServiceDetailPage from '../../pages/service-detail-page/ServiceDetailPage'
import NavigationBar from '../NavigationBar'
import AuthRoute from '../AuthRoute'
import MainLayout from '../../layouts/MainLayout'
import { useEffect, useState } from 'react'
import { login, logout } from '../../store'
import { useDispatch } from 'react-redux'


const checkToken = async (token: string) => {
  console.log("asdasdasdasdasdasdasd");
  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return false;
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      checkToken(token).then((isValid) => {
        if (isValid) {
          dispatch(login());
        } else {
          dispatch(logout());
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);
  
  return (
    <>
      <BrowserRouter>
      <NavigationBar/>
        <Routes>
          <Route path='/' element= { <MainLayout/> }>
            <Route index element= { <MainPage/> } />
            <Route path='/services' element = { <AuthRoute> <ServicePage/> </AuthRoute> } />
            <Route path='/login' element = { <LoginPage/> } />
            <Route path='/services/:id' element = { <AuthRoute> <ServiceDetailPage/> </AuthRoute> } />
            <Route path='*' element={ <NotFound/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

function dispatch(arg0: any) {
  throw new Error('Function not implemented.')
}
function setIsLoading(arg0: boolean) {
  throw new Error('Function not implemented.')
}

