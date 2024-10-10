import { useEffect, useState } from 'react';
import axios from 'axios';
import './CampReview.scss';
import deleteIcn from '../../assets/Icons/delete_grey.png';
import editIcn from '../../assets/Icons/edit-grey.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CampReview = ({ review, handleDeleteReview, handleEditReview }) => {
  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(review.review);
  const loggedInUserId = sessionStorage.getItem('userId');

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
          withCredentials: true,
        }
      );
      const userData = response.data.data.data;
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEditReview(review.id, editContent);
    setIsEditing(false);
  };

  useEffect(() => {
    if (review.user_id) {
      fetchUserDetails(review.user_id);
    }
  }, [review.user_id]);

  if (!user) {
    return <p>Loading ...</p>;
  } else {
    return (
      <div className="review">
        <div className="review__id-and-icons">
          <div className="review__imgName">
            <img
              src={user.photo || 'default-image-url'}
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
                onClick={handleEditClick}
              />
              <img
                src={deleteIcn}
                alt="delete icon"
                className="review__icon"
                onClick={() => handleDeleteReview(review)}
              />
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="review__editForm">
            <textarea
              className="review__txtArea"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="review__editForm-btn-container">
              <button
                onClick={handleSaveClick}
                className="review__editForm-btn"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="review__editForm-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="review__comment">{review.review}</p>
        )}
        <hr />
      </div>
    );
  }
};

export default CampReview;
