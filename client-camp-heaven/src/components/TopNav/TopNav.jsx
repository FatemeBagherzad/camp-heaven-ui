import './TopNav.scss';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import user from '../../assets/Icons/user-white.png';
import logOut from '../../assets/Icons/exit-white.png';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const logoutUrl = `${BASE_URL}:${PORT}/api/v1/users/logout`;

const TopNav = ({ userInfo }) => {
  const navigate = useNavigate();

  // const token = sessionStorage.getItem('JWTtoken');
  // if (!token) {
  //   navigate('/notLogedIn');
  // }

  const logout = async () => {
    try {
      await axios.get(logoutUrl, { withCredentials: true });
      sessionStorage.clear();
      // setIsLoggedIn(false);
      alert('You are logged out!');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('There was an error logging you out. Please try again.');
    }
  };

  return (
    <>
      <div className="navTop">
        <div className="navTop__right">
          <div className="navTop__right-txt">Welcome {userInfo}!</div>
          <div className="navTop__right-icons">
            <img
              src={user}
              alt="user icon"
              className="navTop__right-icons-icn"
              onClick={() => {
                navigate('/userAccount');
              }}
            />
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
