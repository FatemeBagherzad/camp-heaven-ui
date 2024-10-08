import './UserAccount.scss';
import TopNav from '../../components/TopNav/TopNav';
import LeftNav from '../../components/LeftNav/LeftNav';
import Account from '../../components/Account/Account';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserAccount = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const token = sessionStorage.getItem('JWTtoken');
  if (!token) {
    setIsLoggedIn(false);
    navigate('/notLogedIn');
  }

  return (
    <>
      <div className="userAccount">
        <div className="userAccount__body">
          <div className="userAccount__body-main">
            <Account />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserAccount;
