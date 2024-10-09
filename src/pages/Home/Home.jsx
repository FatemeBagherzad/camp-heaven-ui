import './Home.scss';
import CarouselPage from '../../components/Carousel/Carousel';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import campImg from '../../assets/images/screen-shot/camp.jpg';
import dashboaerImg from '../../assets/images/screen-shot/dash.jpg';
import gearPageImg from '../../assets/images/screen-shot/account.jpg';
import accountPageImg from '../../assets/images/screen-shot/camp.jpg';
import newPageImg from '../../assets/images/screen-shot/news.jpg';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const navigate = useNavigate();

  const token = sessionStorage.getItem('JWTtoken');

  useEffect(() => {
    if (!token) {
      navigate('/notLogedIn');
    }
  }, [token]);

  const cardData = [
    {
      title: 'Select Camp',
      image: campImg, // replace with actual path
      link: '/find-camp',
    },
    {
      title: 'Gear Page',
      image: gearPageImg, // replace with actual path
      link: '/gears',
    },
    {
      title: 'News Page',
      image: newPageImg, // replace with actual path
      link: '/news',
    },
    {
      title: 'User Account',
      image: accountPageImg, // replace with actual path
      link: '/userAccount',
    },
    {
      title: 'Dashboard',
      image: dashboaerImg, // replace with actual path
      link: '/dashboard',
    },
  ];

  const handleCardClick = (link) => {
    navigate(link);
  };

  if (!token) return null;

  return (
    <div className="home">
      <div className="home__body">
        <div className="home__body__main">
          <div className="home__body__main-text">
            Welcome to <span>Camp Heaven</span>, your go-to resource for
            seamless camping experiences.
            <br /> Our platform is designed to empower outdoor enthusiasts with
            the knowledge and tools needed to choose the perfect campsite.
            <br />
            <br /> We understand that the key to a memorable adventure lies in
            the details, and that's why we offer a combination of peer reviews
            and price comparison charts to help you make informed decisions.
            <br />
            Whether you're a budget-conscious backpacker or a luxury camper, we
            cater to all preferences. At Camp Heaven, we believe in the
            transformative power of nature.
            <br />
            <br /> Our mission is to simplify the camping experience, from
            selecting the right campsite based on real user experiences to
            providing essential gear checklists.
            <br /> Explore with confidence, knowing that you have a community of
            fellow explorers and a wealth of information at your fingertips.
            Join us in creating lasting memories under the open sky, because
            your next great adventure starts here.
          </div>

          <div className="cardContainer">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="card"
                onClick={() => handleCardClick(card.link)}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="card__image"
                />
                <h2 className="card__title">{card.title}</h2>
              </div>
            ))}
          </div>

          <div className="home__body__main-carasoul">
            <CarouselPage />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
