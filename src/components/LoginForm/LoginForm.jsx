import { useNavigate } from 'react-router-dom';
import InputAllTextType from '../InputAllTextType/InputAllTextType';
import './LoginForm.scss';

const LoginForm = ({ handleLogin, isLoginError, errorMessage }) => {
  const navigate = useNavigate();

  return (
    <div className="loginForm">
      <h1 className="loginForm-header">Login</h1>
      {isLoginError && <label style={{ color: 'red' }}>{errorMessage}</label>}

      <form onSubmit={handleLogin} className="loginForm-body">
        <InputAllTextType
          type="smallTxt"
          label="Username:"
          name="username"
          show={true}
        />
        <InputAllTextType
          type="smallTxt"
          label="Email"
          name="email"
          show={true}
        />
        <InputAllTextType
          type="password"
          label="Password:"
          name="password"
          show={true}
        />

        <button className="button loginForm-btn " type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
