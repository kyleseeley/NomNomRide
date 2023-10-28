import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeUserOrder } from "../../store/session";
import { getCartThunk } from "../../store/cart";
import {
  Redirect,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.cart);
  const history = useHistory();
  console.log("shoppingCart", shoppingCart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  const handleCheckout = () => {
    const restaurantId = shoppingCart.restaurantId;
    const userId = shoppingCart.userId;
    const cartItems = shoppingCart.items;

    if (!restaurantId || !userId || !cartItems || cartItems.length === 0) {
      // Handle invalid data or show an error message to the user
      return;
    }

    const orderData = {
      restaurantId,
      userId,
      items: cartItems,
    };

    dispatch(placeUserOrder(orderData));
    history.push("/");
  };

  const totalCost = shoppingCart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="items-list">
        {shoppingCart.map((item) => (
          <div key={item.id} className="checkout-item">
            <p className="item-name">{item.name}</p>
            <p className="item-quantity">Quantity: {item.quantity}</p>
            <p className="item-price">Price: ${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <p className="total-cost">Total: ${totalCost.toFixed(2)}</p>
      <button className="checkout-button" onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
