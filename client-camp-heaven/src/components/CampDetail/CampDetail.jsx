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
const campUrl = `${BASE_URL}:${PORT}/api/v1/camps`;

const CampDetail = ({ camp, handleCloseDetail }) => {
  const [campReview, setCampReview] = useState();
  const [reviewForm, setReviewForm] = useState(false);
  const loggedInUserId = sessionStorage.userId;

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

  const handleDeleteReview = async (review) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this review?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}:${PORT}/api/v1/reviews/${review.id}`, {
          withCredentials: true,
        });
        fetchCampReviews();
      } catch (error) {
        console.error('Failed to delete the review:', error);
        alert('Failed to delete review. Please try again.');
      }
    }
  };

  const handleEditReview = async (reviewId, updatedContent) => {
    try {
      await axios.patch(
        `${BASE_URL}:${PORT}/api/v1/reviews/${reviewId}`,
        { review: updatedContent },
        {
          withCredentials: true,
        }
      );
      fetchCampReviews();
    } catch (error) {
      console.error('Failed to edit the review:', error);
      alert('Failed to edit review. Please try again.');
    }
  };

  const handleSubmitReview = async (event) => {
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
      );
      fetchCampReviews();
      event.target.reset();
      alert('Your review has been added successfully!');
      handleCloseForm();
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Please try again later.');
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
              handleDeleteReview={handleDeleteReview}
              handleEditReview={handleEditReview}
            />
          )}
        </div>
      </div>

      {reviewForm && (
        <div className="campFormContainer">
          (
          <CampReviewForm
            handleCloseForm={handleCloseForm}
            handleSubmitReview={handleSubmitReview}
          />
          )
        </div>
      )}
    </div>
  );
};
export default CampDetail;
