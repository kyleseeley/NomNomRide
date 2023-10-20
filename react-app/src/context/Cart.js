import React, { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Cart.css"


const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const value = {
    isCartVisible,
    setIsCartVisible
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}

export function Cart() {
  const { isCartVisible, setIsCartVisible } = useCartContext()
  const cart = useSelector(state => state.cart)

  return (
    <>
      <div id='cart-background' className={isCartVisible ? '' : 'hidden'} onClick={() => setIsCartVisible(false)}>&nbsp;</div>
      <div className={`account-cart ${isCartVisible ? 'open' : ''}`}>
        <i
          onClick={() => setIsCartVisible(false)}
          className="fa-solid fa-x modal" />
        {cart ? <div className="cart-main">
          <div className="cart-restaurant-details">

          </div>
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

// Cart image
// https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/a023a017672c2488.svg
