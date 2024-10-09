import React from 'react';
import './StarRating.scss';

const StarRating = ({ rating, setRating }) => {
  const handleRatingChange = (event) => {
    const selectedRating = Number(event.target.value);
    setRating(selectedRating);
  };

  return (
    <div className="rate">
      {/* Star 5 */}
      <input
        type="radio"
        id="star5"
        name="rate"
        value="5"
        checked={rating === 5}
        onChange={handleRatingChange}
      />
      <label htmlFor="star5" title="5 stars">
        5 stars
      </label>

      {/* Star 4 */}
      <input
        type="radio"
        id="star4"
        name="rate"
        value="4"
        checked={rating === 4}
        onChange={handleRatingChange}
      />
      <label htmlFor="star4" title="4 stars">
        4 stars
      </label>

      {/* Star 3 */}
      <input
        type="radio"
        id="star3"
        name="rate"
        value="3"
        checked={rating === 3}
        onChange={handleRatingChange}
      />
      <label htmlFor="star3" title="3 stars">
        3 stars
      </label>

      {/* Star 2 */}
      <input
        type="radio"
        id="star2"
        name="rate"
        value="2"
        checked={rating === 2}
        onChange={handleRatingChange}
      />
      <label htmlFor="star2" title="2 stars">
        2 stars
      </label>

      {/* Star 1 */}
      <input
        type="radio"
        id="star1"
        name="rate"
        value="1"
        checked={rating === 1}
        onChange={handleRatingChange}
      />
      <label htmlFor="star1" title="1 star">
        1 star
      </label>
    </div>
  );
};

export default StarRating;
