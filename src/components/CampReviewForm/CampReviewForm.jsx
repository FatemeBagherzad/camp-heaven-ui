import './CampReviewForm.scss';
import userImg from '../../assets/images/default.jpg';
import InputAllTextType from '../InputAllTextType/InputAllTextType';
import Button from '../Button/Button';
import close from '../../assets/Icons/close-24px.svg';
import { useNavigate } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';

const CampReviewForm = ({
  handleCloseForm,
  handleSubmitReview,
  userRating,
  setUserRating,
}) => {
  const navigate = useNavigate();
  const loggedInUserName = sessionStorage.userName;

  const token = sessionStorage.getItem('JWTtoken');
  if (!token) {
    setIsLoggedIn(false);
    navigate('/notLogedIn');
  }

  return (
    <form className="form-review" onSubmit={handleSubmitReview}>
      <img
        src={close}
        alt=""
        className="form-review__closeIcn"
        onClick={handleCloseForm}
      />
      <h2 className="form-review__campName">camp name</h2>
      <div className="form-review__user">
        <img src={userImg} alt="" className="form-review__user-img" />
        <p className="form-review__user-name">{loggedInUserName}</p>
      </div>{' '}
      <StarRating rating={userRating} setRating={setUserRating} />
      <InputAllTextType type="description" name="review" show={false} />
      <div className="form-review__addPhotoBtn">
        <Button type="" btnTxt="Add photos" />
      </div>
      <div className="form-review__cancelPostBtn-container">
        <div className="form-review__cancelPostBtn">
          <Button type="cancel" btnTxt="Cancel" onClick={handleCloseForm} />{' '}
          <Button type="submit" btnTxt="Post" />
        </div>
      </div>
    </form>
  );
};
export default CampReviewForm;
