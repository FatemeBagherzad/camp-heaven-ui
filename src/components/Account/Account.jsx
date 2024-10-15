import React, { useState } from 'react';
import './Account.scss';
import Button from '../Button/Button';
import InputAllTextType from '../InputAllTextType/InputAllTextType';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Account = () => {
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState('');
  const { userInfo, setUserInfo } = useAuth();

  const token = sessionStorage.getItem('JWTtoken');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile);
    setAvatar(selectedFile);
  };

  const handleSubmitUserInfo = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', fullName);
      if (avatar) formData.append('photo', avatar);

      for (const pair of formData.entries()) {
        if (pair[0] === 'photo') {
          console.log(
            `${pair[0]}: ${pair[1].name}, Size: ${pair[1].size}, Type: ${pair[1].type}`
          );
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      }
      if (fullName || avatar) {
        const res = await axios.patch(
          `${BACKEND_URL}/api/v1/users/updateMe`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token here
            },
            withCredentials: true,
          }
        );
        console.log(res.data.data.user);
        const updatedUser = res.data.data.user;
        sessionStorage.setItem('userName', JSON.stringify(updatedUser.name));
        sessionStorage.setItem('userPhoto', JSON.stringify(updatedUser.photo));
        setFullName('');
        setAvatar(null);
        setUserInfo(res.data.data.user);
        setMessage('User info updated successfully!');
      } else {
        alert('Please fill in user name or avatar');
      }
      // setUserInfo(res.data.data.user);
    } catch (error) {
      setMessage('Error updating user info: ' + error.response.data.message);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (!password || !passwordConfirm) {
      alert('both fields must be filled!');
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      alert('passwords doesnt mathch!');
    }
    if (password && passwordConfirm) {
      try {
        const res = await axios.patch(
          `${BACKEND_URL}/api/v1/users/updateMyPassword`,
          {
            passwordCurrent: password,
            password: password,
            passwordConfirm: passwordConfirm,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPassword('');
        setPasswordConfirm('');
        setMessage('Password updated successfully!');
      } catch (error) {
        setMessage('Error updating password: ' + error.response.data.message);
      }
    } else {
      alert('some unknown error happend! please login again!');
    }
  };

  return (
    <div className="account">
      <p>Update your name and avatar?</p>
      <form className="form" onSubmit={handleSubmitUserInfo}>
        <div className="form__label-input-group">
          <p className="form__label">Full name</p>
          <InputAllTextType
            type="smallTxt"
            name="fullName"
            value={fullName}
            show={false}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form__label-input-group">
          <p className="form__label">Avatar image</p>
          <InputAllTextType
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>

        <div className="form__btn-group">
          <Button type="reset" btnTxt="Cancel" />
          <Button btnTxt="Update account" type="submit" />
        </div>
      </form>

      <p>Update your password?</p>
      <form className="form" onSubmit={handleSubmitPassword}>
        <div className="form__label-input-group">
          <p className="form__label">New password </p>
          <InputAllTextType
            type="password"
            name="password"
            value={password}
            show={false}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__label-input-group">
          <p className="form__label">Confirm password</p>
          <InputAllTextType
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            show={false}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <div className="form__btn-group">
          <Button type="reset" btnTxt="Cancel" />
          <Button btnTxt="Update password" type="submit" />
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Account;
