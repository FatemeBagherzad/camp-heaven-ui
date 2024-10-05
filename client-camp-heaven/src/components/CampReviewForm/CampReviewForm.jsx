import './CampReviewForm.scss';
import userImg from '../../assets/images/default.jpg';
import InputAllTextType from '../InputAllTextType/InputAllTextType';
import Button from '../Button/Button';
// import StarRating from '../StarRating/StarRating';
import close from '../../assets/Icons/close-24px.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const campUrl = `${BASE_URL}:${PORT}/api/v1/camps`;

const CampReviewForm = ({
  camp,
  handleCloseForm,
  campReview,
  setCampReview,
}) => {
  const navigate = useNavigate();

  const loggedInUserId = sessionStorage.userId;
  const loggedInUserName = sessionStorage.userName;

  const token = sessionStorage.getItem('JWTtoken');
  if (!token) {
    setIsLoggedIn(false);
    navigate('/notLogedIn');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let idMatch = campReview.find((rev) => {
      rev.user_id === loggedInUserId;
    });
    if (idMatch) {
      alert('You have a review on this camp!');
    }

    const newReview = {
      review: event.target.review.value,
      rating: 0,
      user_id: loggedInUserId,
      camp_id: camp.id,
      likes: 0,
    };
    try {
      const response = await axios.post(
        `${campUrl}/${camp.id}/reviews`,
        newReview,
        {
          withCredentials: true,
        }
      ); // Update camp ID
      const allReviewsAfterPost = await axios.get(
        `${BASE_URL}:${PORT}/api/v1/camps/${camp.id}/reviews`,
        {
          withCredentials: true,
        }
      );
      setCampReview(allReviewsAfterPost.data.data.data);
      event.target.reset();
      alert('Your review has been added successfully!');
      handleCloseForm();
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Please try again later.');
    }
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
        <p className="form__user-name">{loggedInUserName}</p>
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
