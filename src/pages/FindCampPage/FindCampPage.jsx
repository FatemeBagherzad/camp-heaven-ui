import { useState, useEffect } from 'react';
import axios from 'axios';
import TopNav from '../../components/TopNav/TopNav';
import FindCamp from '../../components/FindCamp/FindCamp';
import LeftNav from '../../components/LeftNav/LeftNav';
import './FindCampPage.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const campsUrl = `${BACKEND_URL}/api/v1/camps`;

const FindCampPage = () => {
  const [camps, setCamps] = useState();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const token = sessionStorage.getItem('JWTtoken');
  if (!token) {
    setIsLoggedIn(false);
    navigate('/notLogedIn');
  }

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get(campsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCamps(response.data.data.data);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };

    fetchCamps();
  }, [campsUrl]);

  return (
    <div className="background">
      <div className="findCampPage">
        <div className="findCampPage-body">
          {camps && <FindCamp camps={camps} />}
        </div>
      </div>
    </div>
  );
};
export default FindCampPage;
