import './GearPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GearAll from '../../components/GearAll/GearAll';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const GearPage = () => {
  const navigate = useNavigate();
  const [gearHave, setGearHave] = useState();
  const [gearNotHave, setGearNotHave] = useState();
  const [movingGear, setMovingGear] = useState(null);
  const loggedInUserId = sessionStorage.userId;
  const { setIsLoggedIn } = useAuth();

  const token = sessionStorage.getItem('JWTtoken');
  if (!token || !loggedInUserId) {
    setIsLoggedIn(false);
    navigate('/notLogedIn');
  }

  const fetchGears = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/users/${loggedInUserId}/gears`,
        {
          withCredentials: true,
        }
      );
      setGearHave(response.data.data.have);
      setGearNotHave(response.data.data.notHave);
    } catch (err) {
      console.error('Error fetching gears for logged in user:', err);
    }
  };
  useEffect(() => {
    fetchGears();
  }, [loggedInUserId]);

  const toggleGearStatus = async (gearId) => {
    try {
      setMovingGear(gearId);
      const gearResponse = await axios.get(
        `${BACKEND_URL}/api/v1/gears/${gearId}`,
        { withCredentials: true }
      );
      const gearData = gearResponse.data.data.data;
      let usersArray = gearData.usersid;
      const userHasGear = usersArray.includes(loggedInUserId);

      let updatedUsersArray;
      if (userHasGear) {
        updatedUsersArray = usersArray.filter(
          (userId) => userId !== loggedInUserId
        );
      } else {
        updatedUsersArray = [...usersArray, loggedInUserId];
      }

      const updatedGear = await axios.patch(
        `${BACKEND_URL}/api/v1/gears/${gearId}`,
        { usersid: JSON.stringify(updatedUsersArray) },
        { withCredentials: true }
      );

      if (userHasGear) {
        setGearHave((prevGearHave) =>
          prevGearHave.filter((gear) => gear.id !== gearId)
        );
        setGearNotHave((prevGearNotHave) => [
          ...prevGearNotHave,
          { ...gearData, usersid: JSON.stringify(updatedUsersArray) },
        ]);
      } else {
        setGearNotHave((prevGearNotHave) =>
          prevGearNotHave.filter((gear) => gear.id !== gearId)
        );
        setGearHave((prevGearHave) => [
          ...prevGearHave,
          { ...gearData, usersid: JSON.stringify(updatedUsersArray) },
        ]);
      }

      setTimeout(() => {
        setMovingGear(null);
      }, 500);
    } catch (err) {
      console.error('Error updating gear status:', err);
      setMovingGear(null);
    }
  };

  if (!gearHave && !gearNotHave) {
    return <h1>Loading gears!!</h1>;
  }

  return (
    <div className="background">
      <div className="gears">
        <div className="gears__intro">
          <h2 className="gears__intro-heading">Gears</h2>
          <p className="gears__intro-p">
            Whether it’s your first time car camping or you’ve been at it for
            years, it never hurts to have a good checklist. To help you get out
            of the house with all of the essentials in tow, we’ve outlined
            everything you need including campsite and sleeping gear, camp
            kitchen essentials, outdoor clothing and footwear, health and
            hygiene products, and personal items and extras.
            <br /> You can make a list of what you have by clicking on each
            item.
          </p>
        </div>
        <div className="gears__list">
          <div className="gears__list-all">
            <p className="gears__list-titr">Not in your list yet!! 📝</p>
            {gearNotHave && (
              <GearAll
                gears={gearNotHave}
                onGearClick={(gearId) => toggleGearStatus(gearId)}
                movingGear={movingGear}
              />
            )}
          </div>
          <div className="gears__list-userHave">
            <p className="gears__list-titr">You have these!⏬</p>
            {gearHave && (
              <GearAll
                gears={gearHave}
                onGearClick={(gearId) => toggleGearStatus(gearId)}
                movingGear={movingGear}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default GearPage;
