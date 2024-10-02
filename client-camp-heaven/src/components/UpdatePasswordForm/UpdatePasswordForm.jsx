// import { useForm } from 'react-hook-form';
import './UpdatePasswordForm.scss';
import Button from '../Button/Button';
import InputAllTextType from '../InputAllTextType/InputAllTextType';

const UpdatePasswordForm = () => {
  // const { errors } = formState;

  // const { updateUser, isUpdating } = useUpdateUser();

  // function onSubmit({ password }) {
  //   updateUser({ password }, { onSuccess: reset });
  // }

  return (
    <form className="passwordForm">
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <div className="passwordForm__group">
        <p className="passwordForm__group-p">New password </p>
        <InputAllTextType type="password" name="password" show={false} />
      </div>

      <div className="passwordForm__group">
        <p className="passwordForm__group-p">Confirm password</p>
        <InputAllTextType type="password" name="passwordConfirm" show={false} />
      </div>

      <div className="passwordForm__groupBtn">
        <Button type="reset" btnTxt="Cancel" />
        {/* onClick={reset} */}
        <Button btnTxt="Update password" />
        {/* disabled={isUpdating} */}
      </div>
    </form>
  );
};

export default UpdatePasswordForm;
