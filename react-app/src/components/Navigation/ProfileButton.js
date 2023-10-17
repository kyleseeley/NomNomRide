import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../Modals/loginForm";
// import SignupFormModal from "../Modals/signupForm";
import { useHistory } from "react-router-dom";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    closeMenu()
  };

  const handleButton = (e, path) => {
    e.preventDefault()
    history.push(path)
    closeMenu()
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <i className="fa-solid fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="user-info">Hello, {user.firstName}</li>
            <li className="user-info">{user.email}</li>
            <li className="dropdown-button-div">
              <button
                onClick={e => handleButton(e, '/spots/new')}
                className="dropdown-button hidden">
                Create a New Spot
              </button>
            </li>
            <li className="border" />
            <li className="dropdown-button-div">
              <button
                onClick={e => handleButton(e, '/spots/current')}
                className="dropdown-button">
                Manage Spots
              </button>
            </li>
            <li className="dropdown-button-div">
              <button
                onClick={e => handleButton(e, '/reviews/current')}
                className="dropdown-button">
                Manage Reviews
              </button>
            </li>
            <li className="border" />
            <li className="dropdown-button-div">
              <button
                onClick={e => handleButton(e, '/account')}
                className="dropdown-button">
                Account
              </button>
            </li>
            <li className="border" />
            <li className="logout-button-div">
              <button
                onClick={logout}
                className='logout-button'
                >
                Log Out
                </button>
            </li>
          </>
          ) : (
            <>
            <li className="dropdown-button-div">
              {/* <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                onButtonClick={closeMenu}
                className='login-button'
                /> */}
              <button className="login-button">Log In</button>
            </li>
            <li className="border" />
            <li className="dropdown-button-div">
              {/* <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                onButtonClick={closeMenu}
                className='signup-button'
              /> */}
              <button className="signup-button">Sign Up</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
