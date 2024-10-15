import Gear from '../Gear/Gear';
import './GearAll.scss';

const GearAll = ({ gears, onGearClick, movingGear, symbol }) => {
  return (
    <ul className="gearAll">
      {gears.map((gear) => {
        const isMoving = movingGear === gear.id;
        return (
          <Gear
            symbol={symbol}
            gear={gear}
            key={gear.id}
            onGearClick={onGearClick}
            isMoving={isMoving}
          />
        );
      })}
    </ul>
  );
};
export default GearAll;
