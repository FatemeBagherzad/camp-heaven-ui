import Gear from '../Gear/Gear';
import './GearAll.scss';

const GearAll = ({ gears, onGearClick }) => {
  return (
    <ul className="gearAll">
      {gears.map((gear) => {
        return <Gear gear={gear} key={gear.id} onGearClick={onGearClick} />;
      })}
    </ul>
  );
};
export default GearAll;
