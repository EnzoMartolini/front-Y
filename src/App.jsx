import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LandingPages from './pages/LandingPages.jsx'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'
  import { useEffect, useState } from 'react'
import LoginPage from './pages/Connexion'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import MessengerPage from './pages/Messenger'
import ProfilePage from './pages/Profil'

function App() {

  const location = useLocation()
  const [search, setSearch] = useState(location.search)

  useEffect(() => {
    setSearch(location.search)
    console.log(search)
    console.log(location.search)
  }, [location.search])

  return (
    <>
    {search === '?home' && <LandingPages />}
    {search === '?login' && <LoginPage />}
    {search === '?main' && <MainPage />}
    {search === '?register' && <RegisterPage />}
    {search === '?messenger' && <MessengerPage />}
    {search === '?profil' && <ProfilePage />}
    </>
  )
}

export default App
