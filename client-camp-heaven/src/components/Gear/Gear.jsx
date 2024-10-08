import './Gear.scss';

const Gear = ({ gear, onGearClick, isMoving }) => {
  return (
    <div onClick={() => onGearClick(gear.id)}>
      <p className={`singleGear ${isMoving ? 'moving' : ''}`}>{gear.name}</p>
    </div>
  );
};
export default Gear;
