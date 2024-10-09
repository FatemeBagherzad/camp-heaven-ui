import Button from '../../components/Button/Button';
import './NotLoggedIn.scss';
import { useNavigate } from 'react-router-dom';

const NotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="loginFirst__background">
      <div className="loginFirst">
        <h2>Please Login first!</h2>
        <Button
          type="submit"
          btnTxt="LOGIN"
          onClick={() => {
            navigate('/');
          }}
        ></Button>
      </div>{' '}
    </div>
  );
};
export default NotLoggedIn;
