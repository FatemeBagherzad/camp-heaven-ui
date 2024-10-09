import './LeftNav.scss';
import InputAllTextType from '../InputAllTextType/InputAllTextType';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import menu from '../../assets/Icons/menu-white.png';

const LeftNav = () => {
  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const Navigate = useNavigate();

  const openLefNav = () => {
    if (!leftNavOpen) {
      setLeftNavOpen(true);
    } else {
      setLeftNavOpen(false);
    }
  };
  return (
    <>
      <img
        src={menu}
        alt="user icon"
        className="navLeft__menu"
        onClick={openLefNav}
      />

      <div className="navLeft">
        <img src={logo} className="navLeft__logo" />
        <div className="navLeft__searchBox">
          Find a camp:
          <InputAllTextType
            type="search"
            name="search"
            className="navLeft__searchBox-search"
          />
        </div>

        <div className="navLeft__menuList">
          <ul className="navLeft__menuList-ul">
            <li
              className="navLeft__menuList-ul-li"
              onClick={() => {
                Navigate('/home');
              }}
            >
              Home
            </li>
            <li
              className="navLeft__menuList-ul-li"
              onClick={() => {
                Navigate('/dashboard');
              }}
            >
              Dashboard
            </li>
            <li
              className="navLeft__menuList-ul-li"
              onClick={() => {
                Navigate('/find-camp');
              }}
            >
              Find a Camp{' '}
            </li>
            <li
              className="navLeft__menuList-ul-li"
              onClick={() => {
                Navigate('/gears');
              }}
            >
              Gears
            </li>
            <li
              className="navLeft__menuList-ul-li"
              onClick={() => {
                Navigate('/news');
              }}
            >
              Check the news
            </li>
          </ul>
        </div>
      </div>

      {leftNavOpen && (
        <div className="navLeftforMobile">
          <img src={logo} className="navLeft__logo" />
          <div className="navLeft__searchBox">
            Find a camp:
            <InputAllTextType
              type="search"
              name="search"
              className="navLeft__searchBox-search"
            />
          </div>

          <div className="navLeft__menuList">
            <ul className="navLeft__menuList-ul">
              <li
                className="navLeft__menuList-ul-li"
                onClick={() => {
                  Navigate('/home');
                  setLeftNavOpen(false);
                }}
              >
                Home
              </li>
              <li
                className="navLeft__menuList-ul-li"
                onClick={() => {
                  Navigate('/dashboard');
                  setLeftNavOpen(false);
                }}
              >
                Dashboard
              </li>
              <li
                className="navLeft__menuList-ul-li"
                onClick={() => {
                  Navigate('/find-camp');
                  setLeftNavOpen(false);
                }}
              >
                Find a Camp{' '}
              </li>
              <li
                className="navLeft__menuList-ul-li"
                onClick={() => {
                  Navigate('/gears');
                  setLeftNavOpen(false);
                }}
              >
                Gears
              </li>
              <li
                className="navLeft__menuList-ul-li"
                onClick={() => {
                  Navigate();
                  setLeftNavOpen(false);
                }}
              >
                Check the weather
              </li>
              <li
                className="navLeft__menuList-ul-li"
                onClick={() => {
                  Navigate();
                  setLeftNavOpen(false);
                }}
              >
                Check the news
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
export default LeftNav;
