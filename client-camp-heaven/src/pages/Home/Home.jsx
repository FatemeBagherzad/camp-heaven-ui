import './Home.scss';
import TopNav from '../../components/TopNav/TopNav';
import LeftNav from '../../components/LeftNav/LeftNav';
import CarouselPage from '../../components/Carousel/Carousel';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PORT = import.meta.env.VITE_PORT;

const Home = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('JWTtoken');
  if (!token) {
    navigate('/notLogedIn');
  }
  return (
    <div className="home">
      <TopNav />
      <div className="home__body">
        <LeftNav />
        <div className="home__body__main">
          <div className="home__body__main-carasoul">
            <CarouselPage />
          </div>
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
        </div>
      </div>
    </div>
  );
};
export default Home;
