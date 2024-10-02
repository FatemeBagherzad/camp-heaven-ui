import InputAllTextType from '../InputAllTextType/InputAllTextType';
import './SignUpForm.scss';

const renderSignUp = ({ handleSignup }) => {
  return (
    <div className="signUpForm">
      <h1 className="signUpForm-header">Sign Up</h1>

      <form onSubmit={handleSignup} className="signUpForm-body">
        <InputAllTextType
          type="smallTxt"
          label="Username:"
          name="name"
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
        <InputAllTextType
          type="password"
          label="Confirm Password:"
          name="passwordConfirm"
          show={true}
        />

        <button className="button signUpForm-btn " type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};
export default renderSignUp;
