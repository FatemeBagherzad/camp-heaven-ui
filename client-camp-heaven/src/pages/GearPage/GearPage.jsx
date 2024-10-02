import './GearPage.scss';

import TopNav from '../../components/TopNav/TopNav';
import LeftNav from '../../components/LeftNav/LeftNav';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GearAll from '../../components/GearAll/GearAll';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const gearsUrl = `${BASE_URL}:${PORT}/api/v1/gears`;
const userUrl = `${BASE_URL}:${PORT}/api/v1/users`;
const userGearURL = `${BASE_URL}:${PORT}/api/v1/users`;

const GearPage = () => {
  const navigate = useNavigate();
  const [allGears, setGears] = useState();
  const [gearStatus, setGearStatus] = useState(true);
  const [gearHave, setGearHave] = useState();
  const [gearNotHave, setGearNotHave] = useState();
  const loggedInUserId = sessionStorage.userId;

  const token = sessionStorage.getItem('JWTtoken');
  if (!token || !loggedInUserId) {
    navigate('/notLogedIn');
  }

  useEffect(() => {
    axios.get(`${userGearURL}/${loggedInUserId}/gears`).then((response) => {
      const GearList = response.data.data.data;
      const notHaveList = GearList.filter((a) => a.have === 'no');
      setGearNotHave(notHaveList);
      const haveList = GearList.filter((a) => a.have === 'yes');
      setGearHave(haveList);
      setGears(GearList);
    });
  }, [gearStatus]);

  useEffect(() => {
    axios.get(`${userGearURL}/${loggedInUserId}`).then((response) => {
      console.log(response);
    });
  });

  const checkGear = (gear) => {
    const gearId = gear.id;
    console.log(gearId);
    axios
      .patch(`${userGearURL}/${loggedInUserId}/gears/${gearId}`, {
        gearName: gear.name,
        gearId: gear.id,
        userId: loggedInUserId,
      })
      .then((response) => {
        console.log(response);
        // return axios.get(`${userGearURL}/${loggedInUserId}`);
      })
      .catch((err) => console.log(err));
  };

  if (!gearHave && !gearNotHave) {
    console.log('Loading gears!!');
    return <h1>Loading gears!!</h1>;
  }

  return (
    <div className="background">
      <TopNav />

      <div className="body">
        <LeftNav />
        <div className="gears">
          <div className="gears__intro">
            <h2 className="gears__intro-heading">Gears</h2>
            <p className="gears__intro-p">
              Whether it’s your first time car camping or you’ve been at it for
              years, it never hurts to have a good checklist. To help you get
              out of the house with all of the essentials in tow, we’ve outlined
              everything you need including campsite and sleeping gear, camp
              kitchen essentials, outdoor clothing and footwear, health and
              hygiene products, and personal items and extras.
              <br /> You can make a list of what you have by clicking on each
              item.
            </p>

            <div className="gears__list">
              <div className="gears__list-all">
                <p className="gears__list-titr">Not in your list yet!!</p>
                {allGears && (
                  <GearAll gears={gearNotHave} checkGear={checkGear} />
                )}
              </div>
              <div className="gears__list-userHave">
                <p className="gears__list-titr">You have these!</p>
                {allGears && <GearAll gears={gearHave} checkGear={checkGear} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GearPage;
