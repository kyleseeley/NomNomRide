import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()

  return (
    <ul className='nav'>
      <li className='nav-left'>
        <NavLink exact to="/" className='logo-link'>
          {/* <img
            src={logo}
            alt='logo'
            className='logo'
          /> */}NomNomRide
        </NavLink>
        <i className="fa-solid fa-info">
          {location.pathname === '/' && <div className='page-info'>
            <h4>Home Page Functionalities</h4>
            <ul>
            </ul>
          </div>}
        </i>
      </li>
      <li className='search-bar-container'>
        <SearchBar />
      </li>

      {isLoaded && <li className='nav-right'>
        <div className='nav-right-profile'>
          {<ProfileButton user={sessionUser} />}
        </div>
      </li>}
    </ul>
  )
}

export default Navigation;
