import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.scss';

import ResponsiveChart from '../../components/DashboardResponsiveChart/DashboardResponsiveChart';
import PieChart from '../../components/DashboardPieChart/DashboardPieChart';
import TopNav from '../../components/TopNav/TopNav';
import LeftNav from '../../components/LeftNav/LeftNav';
import TopCampOfYear from '../../components/TopCampOfYear/TopCampOfYear';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const campsUrl = `${BASE_URL}:${PORT}/api/v1/camps`;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allCamps, setAllCamps] = useState();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('JWTtoken');
  if (!token) {
    navigate('/notLogedIn');
  }

  useEffect(() => {
    axios.get(campsUrl).then((response) => {
      setAllCamps(response.data.data.data);
    });
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="background">
        <div className="dashboard ">
          <TopNav className="dashboard__topNav" />
          <div className="dashboard__body">
            <LeftNav className="dashboard__body-leftNav" />
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
        ;
      </div>
    );
  }
};

export default Dashboard;
