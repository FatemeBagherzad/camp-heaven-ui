import './CampReview.scss';

const CampReview = ({ review }) => {
  let reviewImgUser = `${process.env.REACT_APP_BACKEND_URL}/img/users/${review.user.photo}`;
  return (
    <div className="review">
      <div className="review__imgName">
        <img src={reviewImgUser} alt="people image" className="review__img" />
        <h4 className="review__name">{review.user.name}</h4>
      </div>
      <p className="review__comment">{review.review}</p>
      <hr />
    </div>
  );
};
export default CampReview;
