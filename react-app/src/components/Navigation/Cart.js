import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useHistory } from 'react-router-dom'
import CartItemList from '../CartItems/CartItemList'
import { deleteCartThunk, getCartThunk } from "../../store/cart"
import './Cart.css'

const Cart = ({ isCartVisible, setIsCartVisible }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const carts = useSelector(state => state.cart)
  const [cart, setCart] = useState({})
  const user = useSelector(state => state.session.user)
  const [numItems, setNumItems] = useState(0)
  const [refresh, setRefresh] = useState(true)
  const [numCarts, setNumCarts] = useState(0)
  const [showCarts, setShowCarts] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const optionsRef = useRef()
  const cartsRef = useRef()

  useEffect(() => {
    if (refresh) {
      setCart(Object.values(carts)[0])
      setNumCarts(Object.values(carts).length)
    }
  }, [carts])

  useEffect(() => setRefresh(true), [isCartVisible])

  useEffect(() => {
    setNumItems(cart?.items ? cart?.items.length : 0)
  }, [cart])

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

  useEffect(() => {
    if (!showCarts) return;
    const closeCarts = (e) => {
      if (cartsRef.current && !cartsRef.current.contains(e.target)) {
        setShowCarts(false);
      }
    }

    document.addEventListener('click', closeCarts);
    return () => document.removeEventListener("click", closeCarts);
  }, [showCarts]);

  const openOptions = () => {
    if (showOptions) return;
    setShowOptions(true);
  };

  const openCarts = () => {
    if (showCarts) return
    setShowCarts(true)
  }

  const switchCarts = (id) => {
    setCart(carts[id])
    setShowCarts(false)
    setRefresh(true)
  }

  const handleAddItems = () => {
    setIsCartVisible(false)
    history.push(`/${cart.cart.restaurantId}`)
  }

  const handleDeleteCart = () => {
    setIsCartVisible(false)
    dispatch(deleteCartThunk(cart.cart.id))
  }

  return (
    <>
      <div id='cart-background' className={isCartVisible ? '' : 'hidden'} onClick={() => setIsCartVisible(false)}>&nbsp;</div>
      <div className={`cart-sidebar ${isCartVisible ? 'open' : ''}`}>
        <i
          onClick={() => setIsCartVisible(false)}
          className="fa-solid fa-x modal" />
        {numCarts > 1 &&
        <div
          onClick={openCarts}
          className="switch-carts-button">
          {`Carts (${numCarts})`} <i className="fa-solid fa-chevron-down carts" />
        </div>}
        <div
          ref={cartsRef}
          className={`carts-dropdown ${showCarts ? '' : 'hidden'}`}>
          {openCarts && Object.values(carts).map((cart, idx) => (
            <div
              className="carts-dropdown-button"
              onClick={() => switchCarts(cart.cart.id)}
              key={idx}>
              {cart?.restaurant?.name}
            </div>
            ))}
        </div>
        {numItems ? <div className="cart-main">
          <div className="cart-restaurant-details">
            <span>
              <h1 className="cart-restaurant-name">{`${cart?.restaurant?.name} (${cart?.restaurant?.address})`}</h1>
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
          {cart && <CartItemList cart={cart} numItems={numItems} setNumItems={setNumItems} setRefresh={setRefresh} />}
          <div className="cart-buttons">
            <NavLink
              to='/checkout'
              onClick={() => setIsCartVisible(false)}
              className='cart-sidebar-button checkout'>
              Go to checkout
            </NavLink>
            <div
              onClick={handleAddItems}
              className='cart-sidebar-button add-items'>
              Add items
            </div>
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
