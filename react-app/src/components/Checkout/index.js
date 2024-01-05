import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeUserOrder } from "../../store/session";
import { getCartThunk } from "../../store/cart";
import { deleteCartThunk } from "../../store/cart";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Checkout.css";
import Toast from "./toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const shoppingCart = useSelector((state) => state.cart);
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const cartIdsToDelete = Object.keys(shoppingCart);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setToastMessage("");
    }, 3000);
  };

  const getTotal = () => {
    let total = 0;
    for (const cart of Object.values(shoppingCart)) {
      total += parseFloat(cart?.cart?.total);
    }
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    const cartKeys = Object.keys(shoppingCart);

    if (cartKeys.length > 0) {
      cartKeys.forEach((cartKey) => {
        const restaurantId = shoppingCart[cartKey]?.cart?.restaurantId;
        const userId = user?.id;
        const cartItems = shoppingCart[cartKey]?.items;

        const orderData = {
          restaurantId,
          userId,
          items: cartItems,
        };
        dispatch(placeUserOrder(orderData));
        displayToast("Order placed successfully!");
        cartIdsToDelete.forEach((cartId) => {
          dispatch(deleteCartThunk(cartId));
        });
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Order Summary</h1>
      <div className="items-list">
        {Object.values(shoppingCart).map((item) => (
          <div key={item.cart.id} className="checkout-item">
            {item.items.map((cartItem) => (
              <div key={cartItem.id}>
                {/* <p className="restaurant-name">{item.restaurant.name}</p>
                <p className="item-name">{cartItem.name}</p>
                <p className="item-quantity">Quantity: {cartItem.quantity}</p>
                <p className="item-price">
                  Price: $
                  {parseFloat(cartItem.quantity * cartItem.price).toFixed(2)}
                </p> */}
                <div className="item-details">
                  <p className="restaurant-name">{item.restaurant.name}</p>
                  <p className="item-name">{cartItem.name}</p>
                </div>
                <p className="item-quantity">Quantity: {cartItem.quantity}</p>
                <p className="item-price">
                  Price: $
                  {parseFloat(cartItem.quantity * cartItem.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        ))}
        {shoppingCart[1] && <p className="total-cost">Total: ${getTotal()}</p>}
      </div>
      <button className="checkout-button" onClick={handleCheckout}>
        Place Order
      </button>
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Checkout;
