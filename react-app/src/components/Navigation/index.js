import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { useCartContext } from '../../context/Cart';
import { useSidebarContext } from '../../context/Sidebar';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const location = useLocation()
  const { setIsSidebarVisible } = useSidebarContext()
  const { setIsCartVisible } = useCartContext()

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
        {sessionUser && <button
          onClick={() => setIsCartVisible(true)}
          className='cart-button'>
          <i className="fa-solid fa-cart-shopping" />Cart <b>·</b>
        </button>}
        {!sessionUser && <>
          <NavLink to='/login' className="login-button">
            <i className="fas fa-user-circle" />Log In
          </NavLink>
          <NavLink to='/signup' className="signup-button">Sign Up</NavLink>
        </>}
      </li>
    </ul>
  )
}

export default Navigation;
