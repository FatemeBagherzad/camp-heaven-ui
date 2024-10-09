import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.scss';
import { useAuth } from '../../context/AuthContext';
import ResponsiveChart from '../../components/DashboardResponsiveChart/DashboardResponsiveChart';
import PieChart from '../../components/DashboardPieChart/DashboardPieChart';
import TopCampOfYear from '../../components/TopCampOfYear/TopCampOfYear';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const campsUrl = `${BACKEND_URL}/api/v1/camps`;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allCamps, setAllCamps] = useState();
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
        setAllCamps(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };

    fetchCamps();
  }, [campsUrl]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="background">
        <div className="dashboard__body">
          {allCamps && (
            <div className="dashboard__body--charts">
              <div className="dashboard__body--charts-top">
                <TopCampOfYear
                  allCamps={allCamps}
                  className="dashboard__body--charts-top-camp"
                />

                <PieChart
                  allCamps={allCamps}
                  className="dashboard__body--charts-top-pieChart"
                />
              </div>
              <ResponsiveChart
                allCamps={allCamps}
                className="dashboard__body--charts-areaChart"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Dashboard;
