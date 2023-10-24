import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useHistory } from 'react-router-dom'
import CartItemList from '../CartItems/CartItemList'
import { noCartThunk } from "../../store/cart"
import './Cart.css'

const Cart = ({ isCartVisible, setIsCartVisible }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.session.user)
  const [numItems, setNumItems] = useState(cart.cart ? cart.items.length : 0)
  const [showOptions, setShowOptions] = useState(false)
  const optionsRef = useRef()

  const openOptions = () => {
    if (showOptions) return;
    setShowOptions(true);
  };

  useEffect(() => {
    if (!showOptions) return;

    const closeOptions = (e) => {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', closeOptions);

    return () => document.removeEventListener("click", closeOptions);
  }, [showOptions]);

  const handleAddItems = () => {
    setIsCartVisible(false)
    history.push(`/${cart.cart.restaurantId}`)
  }

  const handleDeleteCart = () => {
    setIsCartVisible(false)
    dispatch(noCartThunk())
  }

  return (
    <>
      <div id='cart-background' className={isCartVisible ? '' : 'hidden'} onClick={() => setIsCartVisible(false)}>&nbsp;</div>
      <div className={`cart-sidebar ${isCartVisible ? 'open' : ''}`}>
        <i
          onClick={() => setIsCartVisible(false)}
          className="fa-solid fa-x modal" />
        {numItems ? <div className="cart-main">
          <div className="cart-restaurant-details">
            <span>
              <h1 className="cart-restaurant-name">{`${cart.restaurant.name} (${cart.restaurant.address})`}</h1>
              <p className="cart-user-address">Deliver to {user?.address}</p>
            </span>
            <span>
              <i
                onClick={openOptions}
                className="fa-solid fa-ellipsis cart" />
              <div
                ref={optionsRef}
                className={`options-dropdown ${showOptions ? '' : 'hidden'}`}>
                  <div
                    onClick={handleAddItems}
                    className="cart-options-button">
                    <i className="fa-solid fa-plus cart-options-button-icon" />
                    <span className="cart-options-button-text">Add Items</span>
                  </div>
                  <div
                    onClick={handleDeleteCart}
                    className="cart-options-button delete">
                    <i className="fa-solid fa-trash cart-options-button-icon" />
                    <span className="cart-options-button-text delete">Clear Cart</span>
                  </div>
              </div>
            </span>
          </div>
          <CartItemList cart={cart} numItems={numItems} setNumItems={setNumItems} />
          <div className="cart-buttons">
            <NavLink
              to='/checkout'
              onClick={() => setIsCartVisible(false)}
              className='cart-sidebar-button checkout'>
              Go to checkout
            </NavLink>
            <NavLink
              to='/checkout'
              onClick={() => setIsCartVisible(false)}
              className='cart-sidebar-button add-items'>
              Add items
            </NavLink>
          </div>
        </div> : <div className="cart-main center">
          <img src='https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/a023a017672c2488.svg'/>
          <p><b>Add items to start a cart</b></p>
          <p className="empty-cart-text">Once you add items from a restaurant or store, your cart will appear here.</p>
          <NavLink
            to="/"
            className='cart-start-shopping'
            onClick={() => setIsCartVisible(false)}>
            Start Shopping
          </NavLink>
        </div>}
      </div>
    </>
  )
}

export default Cart
