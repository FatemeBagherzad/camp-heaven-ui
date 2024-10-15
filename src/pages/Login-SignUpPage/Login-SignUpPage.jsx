import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login-SignUpPage.scss';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import logo from '../../assets/images/logo.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const loginUrl = `${BACKEND_URL}/api/v1/users/login`;
const signupUrl = `${BACKEND_URL}/api/v1/users/signup`;

const Home = () => {
  const [showSignedUp, setShowSignedUp] = useState(false);
  const [showLoggin, setShowLoggin] = useState(true);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(
        signupUrl,
        {
          name: e.target.name.value,
          email: e.target.email.value,
          password: e.target.password.value,
          passwordConfirm: e.target.passwordConfirm.value,
        },
        { withCredentials: true }
      )
      .then(() => {
        setShowSignedUp(false);
        setShowLoggin(true);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        alert('Provided email is incorrect or Passwords does not match ');
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        loginUrl,
        {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        let userId = response.data.data.user.id;
        sessionStorage.setItem('JWTtoken', response.data.token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userName', response.data.data.user.name);
        sessionStorage.setItem('userPhoto', response.data.data.user.photo);

        setIsLoggedIn(true);
        setIsLoginError(false);
        setErrorMessage('');
        navigate(`/home`);
      })
      .catch((error) => {
        setIsLoginError(true);
        setErrorMessage(error.response.data.error?.message);
        alert('Provided email or password are incorrect');
      });
  };

  return (
    <>
      <div className="login">
        <div className="login__formWelcome">
          <div className="login__formWelcome-txt">
            <img src={logo} className="login__formWelcome-txt-logo" />
            <h1 className="login__formWelcome-txt-header">
              Welcome to Camp Heaven
            </h1>
            <p className="login__formWelcome-txt-p">
              let's be honest - who can better decide which campsites are the
              most beautiful, cleanest, quietest or closest to nature than the
              campers themselves? We firmly believe that only through the amount
              of different and independent reviews from young and old, from tall
              and short, from thick and thin, a truly authentic picture of a
              place can be shown.
            </p>
          </div>
          <div className="login__formWelcome-form">
            {showSignedUp && <SignUpForm handleSignup={handleSignup} />}

            {showLoggin && (
              <LoginForm
                handleLogin={handleLogin}
                isLoginError={isLoginError}
                errorMessage={errorMessage}
              />
            )}

            <div className="login__formWelcome-form-links">
              <p>
                Don't have an account ? -
                <span
                  onClick={() => {
                    setShowSignedUp(true);
                    setShowLoggin(false);
                  }}
                  className="login__formWelcome-form-links-link"
                >
                  Signup now
                </span>
              </p>
              <div className="login__formWelcome-form-links-loginForgot">
                <p
                  className="login__formWelcome-form-links-link"
                  onClick={() => {
                    setShowSignedUp(false);
                    setShowLoggin(true);
                  }}
                >
                  login
                </p>
                <p className="login__formWelcome-form-links-link">
                  Forgot password?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
