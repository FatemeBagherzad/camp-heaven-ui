import { useState } from 'react';
import './UpdateUserDataForm.scss';
import Button from '../Button/Button';
import InputAllTextType from '../InputAllTextType/InputAllTextType';

const UpdateUserDataForm = () => {
  // const {
  //   user: {
  //     email,
  //     user_metadata: { fullName: currentFullName },
  //   },
  // } = useUser();

  // const { updateUser, isUpdating } = useUpdateUser();

  // const [fullName, setFullName] = useState(currentFullName);
  // const [avatar, setAvatar] = useState(null);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!fullName) return;
  //   updateUser(
  //     { fullName, avatar },
  //     {
  //       onSuccess: () => {
  //         setAvatar(null);
  //         e.target.reset();
  //       },
  //     }
  //   );
  // }

  // function handleCancel() {
  //   setFullName(currentFullName);
  //   setAvatar(null);
  // }

  return (
    <form className="userForm">
      <div className="userForm__group">
        <p className="userForm__group-p">Email address</p>
        <InputAllTextType type="email" name="email" />
      </div>
      <div className="userForm__group">
        <p className="userForm__group-p">Full name</p>
        <InputAllTextType type="smallTxt" name="fullName" show={false} />
      </div>

      <div className="userForm__group">
        <p className="userForm__group-p">Avatar image</p>
        <InputAllTextType type="file" name="file" />
      </div>

      <div className="userForm__groupBtn">
        <Button type="reset" btnTxt="Cancel" />
        <Button btnTxt="Update account" />
      </div>
    </form>
  );
};

export default UpdateUserDataForm;
