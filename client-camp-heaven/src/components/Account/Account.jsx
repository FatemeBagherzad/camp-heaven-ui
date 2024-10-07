import './Account.scss';
import Button from '../Button/Button';
import InputAllTextType from '../InputAllTextType/InputAllTextType';

const Account = () => {
  return (
    <div className="account">
      <p>Update your name and avatar?</p>
      <form className="form">
        {/* <div className="userForm__group">
        <p className="userForm__group-p">Email address</p>
        <InputAllTextType type="email" name="email" />
      </div> */}
        <div className="form__label-input-group">
          <p className="form__label">Full name</p>
          <InputAllTextType type="smallTxt" name="fullName" show={false} />
        </div>

        <div className="form__label-input-group">
          <p className="form__label">Avatar image</p>
          <InputAllTextType type="file" name="file" />
        </div>

        <div className="form__btn-group">
          <Button type="reset" btnTxt="Cancel" />
          <Button btnTxt="Update account" />
        </div>
      </form>

      <p>Update your password?</p>
      <form className="form">
        {/* onSubmit={handleSubmit(onSubmit)} */}
        <div className="form__label-input-group">
          <p className="form__label">New password </p>
          <InputAllTextType type="password" name="password" show={false} />
        </div>

        <div className="form__label-input-group">
          <p className="form__label">Confirm password</p>
          <InputAllTextType
            type="password"
            name="passwordConfirm"
            show={false}
          />
        </div>

        <div className="form__btn-group">
          <Button type="reset" btnTxt="Cancel" />
          {/* onClick={reset} */}
          <Button btnTxt="Update password" />
          {/* disabled={isUpdating} */}
        </div>
      </form>
    </div>
  );
};

export default Account;
