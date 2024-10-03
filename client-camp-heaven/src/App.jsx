// App.jsx

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './context/AuthContext';
import LoginSignUpPage from './pages/Login-SignUpPage/Login-SignUpPage';
import FindCampPage from './pages/FindCampPage/FindCampPage';
import Dashboard from './pages/Dashboard/Dashboard';
import GearPage from './pages/GearPage/GearPage';
import Home from './pages/Home/Home';
import NotLoggedIn from './pages/NotLoggedIn/NotLoggedIn';
import UserAccount from './pages/UserAccount/UserAccount';
import NewsPage from './pages/NewsPage/NewsPage';
import TopNav from './components/TopNav/TopNav';
import LeftNav from './components/LeftNav/LeftNav';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <TopNav />
          <div className="App__layout">
            <LeftNav />
            <Routes>
              <Route path="/" element={<LoginSignUpPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/find-camp" element={<FindCampPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/gears" element={<GearPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/notLogedIn" element={<NotLoggedIn />} />
              <Route path="/userAccount" element={<UserAccount />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
