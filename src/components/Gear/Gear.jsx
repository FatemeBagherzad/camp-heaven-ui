import './Gear.scss';

const Gear = ({ gear, onGearClick, isMoving, symbol }) => {
  return (
    <div onClick={() => onGearClick(gear.id)}>
      <p className={`singleGear ${isMoving ? 'moving' : ''}`}>
        <span className="check">{symbol}</span> {gear.name}
      </p>
    </div>
  );
};
export default Gear;
