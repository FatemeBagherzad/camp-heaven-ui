import './Gear.scss';

const Gear = ({ gear, checkGear }) => {
  const checkGearStatus = () => {
    checkGear(gear);
  };

  return (
    <>
      <p className="singleGear" onClick={checkGearStatus}>
        {gear.name}
      </p>
    </>
  );
};
export default Gear;
