import { useEffect, useState } from 'react';
import axios from 'axios';
import './CampReview.scss';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;

const CampReview = ({ review }) => {
  const [user, setUser] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

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
        <div className="review__imgName">
          <img
            src={userPhoto || 'default-image-url'}
            alt="people image"
            className="review__img"
          />
          <h4 className="review__name">{user.name}</h4>
        </div>
        <p className="review__comment">{review.review}</p>
        <hr />
      </div>
    );
  }
};

export default CampReview;
