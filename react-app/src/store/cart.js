// constants
const GET_CART = "session/GET_CART";
const REMOVE_CART = "session/REMOVE_CART";

const getCart = (cart) => ({
	type: GET_CART,
	payload: cart,
});

const removeCart = () => ({
	type: REMOVE_CART,
});

const initialState = { cart: null };

export const getCartThunk = userId => async dispatch => {
  const response = await fetch(`/api/shopping-cart/${userId}`)
  if (response.ok) {
    const cart = await response.json()
    dispatch(getCart(cart))
  }
}

export const removeCartThunk = cartId => async dispatch => {
  const response = await fetch(`/api/shopping-cart/${cartId}`)
  if (response.ok) {
    const cart = await response.json()
    dispatch(removeCart(cart))
  }
}

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART:
			return { cart: action.payload };
		case REMOVE_CART:
			return { cart: null };
		default:
			return state;
	}
}
