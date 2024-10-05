import { useEffect, useState } from 'react';
import axios from 'axios';
import CampReviewAll from '../CampReviewAll/CampReviewAll';
import './CampDetail.scss';
import close from '../../assets/Icons/close-24px.svg';
import StarRating from '../StarRating/StarRating';
import CampReviewForm from '../CampReviewForm/CampReviewForm';
import Button from '../Button/Button';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;

const CampDetail = ({ camp, handleCloseDetail }) => {
  const [campReview, setCampReview] = useState();
  const [reviewForm, setReviewForm] = useState(false);

  const handleCloseForm = () => {
    if (reviewForm) {
      setReviewForm(false);
    }
  };

  const fetchCampReviews = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}:${PORT}/api/v1/camps/${camp.id}/reviews`,
        {
          withCredentials: true,
        }
      );
      setCampReview(response.data.data.data);
      return response.data.data.data;
    } catch (error) {
      console.error('Failed to fetch camp reviews:', error);
    }
  };

  useEffect(() => {
    fetchCampReviews();
  }, [camp.id]);

  return (
    <div>
      <div className="campDetail">
        <img
          src={close}
          alt="closeIcn"
          className="campDetail__closeIcn"
          onClick={handleCloseDetail}
        />
        <img
          src={camp.imageCover}
          alt="nature Photo"
          className="campDetail__coverImg"
        />
        <h3>{camp.name}</h3>
        <p>Rating: {camp.ratingsAverage} out of 5</p>
        <hr />
        <p>Address:{camp.address}</p>
        <hr />
        <div className="campDetail__imgs">
          <img
            src={camp.images[0]}
            alt="nature Photo"
            className="campDetail__imgs-img"
          />
          <img
            src={camp.images[1]}
            alt="nature Photo"
            className="campDetail__imgs-img"
          />
          <img
            src={camp.images[2]}
            alt="nature Photo"
            className="campDetail__imgs-img"
          />
        </div>

        <div className="campDetail__star">
          <hr />
          <h2>Review summary</h2>
          <StarRating />
          <Button
            btnTxt="Write a review"
            type="{}"
            onClick={() => setReviewForm(true)}
          />
        </div>
        <div className="campDetail__comments">
          <h3>Reviews:</h3>
          {campReview && (
            <CampReviewAll
              campReview={campReview}
              setCampReview={setCampReview}
            />
          )}
        </div>
      </div>

      {reviewForm && (
        <div className="campFormContainer">
          (
          <CampReviewForm
            camp={camp}
            handleCloseForm={handleCloseForm}
            campReview={campReview}
            setCampReview={setCampReview}
          />
          )
        </div>
      )}
    </div>
  );
};
export default CampDetail;
