import { useEffect, useState } from 'react';
import axios from 'axios';
import './CampReview.scss';
import deleteIcn from '../../assets/Icons/delete_grey.png';
import editIcn from '../../assets/Icons/edit-grey.png';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;

const CampReview = ({ review, setCampReview }) => {
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  const loggedInUserId = sessionStorage.getItem('userId');

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}:${PORT}/api/v1/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      const userData = response.data.data.data;
      setUser(userData);
      let reviewImgUser = `${BASE_URL}:${PORT}/img/users/${userData.photo}`;
      setUserPhoto(reviewImgUser);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleDeleteReview = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this review?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${BASE_URL}:${PORT}/api/v1/reviews/${review.id}`, {
          withCredentials: true,
        });
        alert('Review deleted successfully.');
        const allReviewsAfterDelete = await axios.get(
          `${BASE_URL}:${PORT}/api/v1/camps/${review.camp_id}/reviews`,
          {
            withCredentials: true,
          }
        );
        setCampReview(allReviewsAfterDelete.data.data.data);
      } catch (error) {
        console.error('Failed to delete the review:', error);
        alert('Failed to delete review. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (review.user_id) {
      fetchUserDetails(review.user_id);
    }
  }, [review.user_id]);

  if (!user && !userPhoto) {
    return <p>Loading ...</p>;
  } else {
    return (
      <div className="review">
        <div className="review__id-and-icons">
          <div className="review__imgName">
            <img
              src={userPhoto || 'default-image-url'}
              alt="people image"
              className="review__img"
            />
            <h4 className="review__name">{user.name}</h4>
          </div>
          {review.user_id === loggedInUserId && (
            <div className="review__icons">
              <img
                src={editIcn}
                alt="edit icon"
                className="review__icon"
                // onClick={handleEditReview}
              />
              <img
                src={deleteIcn}
                alt="delete icon"
                className="review__icon"
                onClick={handleDeleteReview}
              />
            </div>
          )}
        </div>

        <p className="review__comment">{review.review}</p>
        <hr />
      </div>
    );
  }
};

export default CampReview;
