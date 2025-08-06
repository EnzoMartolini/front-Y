import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LandingPages from './pages/LandingPages.jsx';
import LoginPage from './pages/Connexion';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import MessengerPage from './pages/Messenger';
import ProfilePage from './pages/Profil';

function App() {
  console.log("app")
  return (
    <Routes>
      <Route path="/" element={<LandingPages />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/messenger" element={<MessengerPage />} />
      <Route path="/profil" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
