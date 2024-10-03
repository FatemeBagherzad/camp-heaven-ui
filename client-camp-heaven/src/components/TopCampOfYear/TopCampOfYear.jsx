import './TopCampOfYear.scss';

const TopCampOfYear = ({ allCamps }) => {
  const topCamp = allCamps.sort(
    (a, b) => b.ratingsAverage - a.ratingsAverage
  )[0];

  return (
    <div className="dashboardTopCamp">
      <h2>Top Camp Of The Year</h2>
      {topCamp ? ( // Check if topCamp exists to avoid errors
        <>
          <img
            src={topCamp.imageCover}
            alt={topCamp.name} // Provide a meaningful alt text
            className="dashboardTopCamp__img"
          />
          <h3>{topCamp.name}</h3>
          <p>{topCamp.description}</p>
        </>
      ) : (
        <p>No camps available</p> // Fallback if no camp data is present
      )}
    </div>
  );
};

export default TopCampOfYear;
