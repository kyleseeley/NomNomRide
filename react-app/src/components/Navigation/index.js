import { useEffect, useState, React } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { useSidebarContext } from '../../context/Sidebar';
import { getCartItemsThunk } from '../../store/cartItems';
import { getCartThunk } from '../../store/cart';
import Cart from './Cart'

function Navigation(){
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const cart = useSelector(state => state.cart)
  const location = useLocation()
  const { setIsSidebarVisible } = useSidebarContext()
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (sessionUser) {
      dispatch(getCartThunk())
      .then(dispatch(getCartItemsThunk()))
      .then(setIsLoaded(true))
    }
    else setIsLoaded(true)
  }, [sessionUser, dispatch])

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
        {isLoaded && <>
          {sessionUser && <button
            onClick={() => setIsCartVisible(true)}
            className='cart-button'>
            <i className="fa-solid fa-cart-shopping" />Cart
          </button>}
          {!sessionUser && <>
            <NavLink to='/login' className="login-button">
              <i className="fas fa-user-circle" />Log In
            </NavLink>
            <NavLink to='/signup' className="signup-button">Sign Up</NavLink>
          </>}
          <Cart isCartVisible={isCartVisible} setIsCartVisible={setIsCartVisible} />
        </>}
      </li>
    </ul>
  )
}

export default Navigation;
