import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/main-page/MainPage'
import ServicePage from '../../pages/service-page/ServicePage'
import NotFound from '../../pages/not-found-page/not_found'
import LoginPage from '../../pages/login-page/LoginPage'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element= { <MainPage/> } />
        <Route path='/services' element = { <ServicePage/> } />
        <Route path='/login' element = { <LoginPage/> } />
        <Route path='*' element={ <NotFound/> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App