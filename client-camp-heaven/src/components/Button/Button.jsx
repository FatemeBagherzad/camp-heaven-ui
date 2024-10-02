import React from 'react';
import editIcn from '../../assets/Icons/edit-24px-white.svg';
import './Button.scss';
const Button = ({ btnTxt, onClick, type }) => {
  let classbtn;
  if (btnTxt === 'Cancel') {
    classbtn = 'button--cancel';
  } else if (btnTxt === 'Edit') {
    classbtn = 'button--edit';
  } else if (btnTxt === 'Delete') {
    classbtn = 'delete';
  } else if (!btnTxt) {
    classbtn = 'button--noshow';
  } else {
    classbtn = '';
  }
  return (
    <button className={`button ${classbtn}`} type={type} onClick={onClick}>
      {btnTxt === 'Edit' ? (
        <img
          src={editIcn}
          alt="pen as edit icon"
          className="button--edit-icon"
        />
      ) : null}
      {btnTxt}
    </button>
  );
};
export default Button;
