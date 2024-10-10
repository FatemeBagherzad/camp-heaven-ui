import './TopNav.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import logOut from '../../assets/Icons/exit-white.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const logoutUrl = `${BACKEND_URL}/api/v1/users/logout`;

const TopNav = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const loggedInUserId = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('JWTtoken');

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      const userData = response.data.data.data;
      setUserInfo(userData);
      let imgUser = `${BACKEND_URL}/img/users/${userData.photo}`;
      setUserPhoto(imgUser);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else if (loggedInUserId) {
      fetchUserDetails(loggedInUserId);
    }
  }, [loggedInUserId, navigate, token]);

  const logout = async () => {
    try {
      await axios.get(logoutUrl, { withCredentials: true });
      sessionStorage.clear();
      setIsLoggedIn(false);
      setUserInfo(null);
      let imgUser = `${BACKEND_URL}/img/users/default.jpg`;
      setUserPhoto(imgUser);
      alert('You are logged out!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('There was an error logging you out. Please try again.');
    }
  };
  if (!userInfo) {
    return <p>loading</p>;
  }
  return (
    <>
      <div className="navTop">
        <div className="navTop__right">
          <div className="navTop__right-txt">Welcome {userInfo.name}!</div>
          <div className="navTop__right-icons">
            {userPhoto && (
              <img
                src={userPhoto}
                alt="user icon"
                className="navTop__right-icons-icn"
                onClick={() => {
                  navigate('/userAccount');
                }}
              />
            )}
            <img
              src={logOut}
              alt="exit icon"
              className="navTop__right-icons-icn"
              onClick={() => logout()}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default TopNav;
