import './TopCampOfYear.scss';

const TopCampOfYear = ({ allCamps }) => {
  const topCamp = allCamps.sort(
    (a, b) => b.ratingsAverage - a.ratingsAverage
  )[0];

  return (
    <div className="dashboardTopCamp">
      <h2>Top Camp Of The Year</h2>
      {topCamp ? (
        <>
          <img
            src={topCamp.imageCover}
            alt={topCamp.name}
            className="dashboardTopCamp__img"
          />
          <h3>{topCamp.name}</h3>
          <p>{topCamp.description}</p>
        </>
      ) : (
        <p>No camps available</p>
      )}
    </div>
  );
};

export default TopCampOfYear;
