import './CampReviewForm.scss';
import userImg from '../../assets/images/default.jpg';
import InputAllTextType from '../InputAllTextType/InputAllTextType';
import Button from '../Button/Button';
// import StarRating from '../StarRating/StarRating';
import close from '../../assets/Icons/close-24px.svg';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const reviewUrl = `${BASE_URL}:${PORT}/api/v1/camps`;

const CampReviewForm = ({ camp, handleCloseForm, campReview }) => {
  const loggedInUserId = sessionStorage.userId;
  console.log(`${reviewUrl}/${camp._id}/reviews`);

  const token = sessionStorage.getItem('JWTtoken');
  if (!token) {
    navigate('/notLogedIn');
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let idMatch = campReview.find((rev) => {
      rev.user === loggedInUserId;
    });
    if (idMatch) {
      alert('You have a review on this camp!');
    }

    const newReview = {
      review: event.target.review.value,
      user: loggedInUserId,
      camp: camp._id,
    };
    axios
      .post(`${reviewUrl}/${camp._id}/reviews`, newReview)
      .then((response) => {
        event.target.reset();
        alert('Your Review added successfully!');
        handleCloseForm();
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <img
        src={close}
        alt=""
        className="form__closeIcn"
        onClick={handleCloseForm}
      />
      <h2 className="form__campName">camp name</h2>
      <div className="form__user">
        <img src={userImg} alt="" className="form__user-img" />
        <p className="form__user-name">user name</p>
      </div>

      {/* <div className="form__star">
        <StarRating />
      </div> */}
      <InputAllTextType type="description" name="review" show={false} />

      <div className="form__addPhotoBtn">
        <Button type="" btnTxt="Add photos" />
      </div>

      <div className="form__cancelPostBtn-container">
        <div className="form__cancelPostBtn">
          <Button type="cancel" btnTxt="Cancel" onClick={handleCloseForm} />{' '}
          <Button type="submit" btnTxt="Post" />
        </div>
      </div>
    </form>
  );
};
export default CampReviewForm;
