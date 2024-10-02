import UpdatePasswordForm from '../UpdatePasswordForm/UpdatePasswordForm';
import UpdateUserDataForm from '../UpdateUserDataForm/UpdateUserDataForm';
import './Account.scss';

const Account = () => {
  return (
    <>
      <h1 as="h1">Update your account</h1>
      <div className="account">
        <h2 className="account__formHeader">Update user data</h2>
        <UpdateUserDataForm />

        <h2 className="account__formHeader">Update password</h2>
        <UpdatePasswordForm />
      </div>
    </>
  );
};

export default Account;
