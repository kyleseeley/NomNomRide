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

    dispatch(placeUserOrder(orderData)).then((response) => {
      if (!response.error) {
        // Handle successful order placement
        history.push("/"); // Redirect to the homepage or another page
      } else {
        // Handle errors or display error messages
        // You can update your Redux store with error information if needed
      }
    });
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Order Summary</h1>
      <div className="items-list">
        {Object.values(shoppingCart).map((item) => (
          <div key={item.cart.id} className="checkout-item">
            <p className="item-name">{item.items[0].name}</p>
            <p className="item-quantity">Quantity: {item.items[0].quantity}</p>
            <p className="item-price">
              Price: ${parseFloat(item.items[0].price).toFixed(2)}
            </p>
            <p className="total-cost">Total: ${item.cart.total}</p>
          </div>
        ))}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
