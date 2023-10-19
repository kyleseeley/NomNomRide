import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { useSidebarContext } from '../../context/Sidebar';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const { setIsSidebarVisible } = useSidebarContext()

  return (
    <ul className='nav'>
      <li className='nav-left'>
        <i
          onClick={() => setIsSidebarVisible(true)}
          className={`fa-solid fa-bars toggle-sidebar`} />
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

      <li className='nav-right'>
        <button className='cart-button'><i className="fa-solid fa-cart-shopping" />Cart <b>·</b> </button>
        {!sessionUser && <>
          <button className="login-button">
            <i className="fas fa-user-circle" />Log In
          </button>
          <button className="signup-button">Sign Up</button>
        </>}
      </li>
    </ul>
  )
}

export default Navigation;
