import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main-page/MainPage'
import ServicePage from '../../pages/service-page/ServicePage'
import NotFound from '../../pages/not-found-page/not_found'
import LoginPage from '../../pages/login-page/LoginPage'
import ServiceDetailPage from '../../pages/service-detail-page/ServiceDetailPage'
import NavigationBar from '../NavigationBar'
import AuthRoute from '../AuthRoute'

function App() {
  return (
    <>
    <BrowserRouter>
    <NavigationBar/>
      <Routes>
        <Route path='/' element= { <MainPage/> } />
        <Route path='/services' element = { <AuthRoute> <ServicePage/> </AuthRoute> } />
        <Route path='/login' element = { <LoginPage/> } />
        <Route path='/services/:id' element = { <AuthRoute> <ServiceDetailPage/> </AuthRoute> } />
        <Route path='*' element={ <NotFound/> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App