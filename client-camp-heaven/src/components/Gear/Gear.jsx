import './Gear.scss';

const Gear = ({ gear, onGearClick }) => {
  return (
    <div onClick={() => onGearClick(gear.id)}>
      <p className="singleGear">{gear.name}</p>
    </div>
  );
};
export default Gear;
