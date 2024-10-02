import './TopCampOfYear.scss';

const TopCampOfYear = ({ allCamps }) => {
  return (
    <div className="dashboardTopCamp">
      <h2>Top Camp Of Year</h2>
      <img
        src={allCamps[0].imageCover}
        alt=""
        className="dashboardTopCamp__img"
      />
      <p>{allCamps[0].description}</p>
    </div>
  );
};
export default TopCampOfYear;
