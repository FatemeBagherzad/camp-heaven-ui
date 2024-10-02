import Gear from '../Gear/Gear';
import './GearAll.scss';
import axios from 'axios';

const GearAll = ({ gears, checkGear }) => {
  return (
    <ul className="gearAll">
      {gears.map((gear) => {
        return <Gear gear={gear} key={gear._id} checkGear={checkGear} />;
      })}
    </ul>
  );
};
export default GearAll;
