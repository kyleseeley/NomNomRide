// constants
const GET_CART = "session/GET_CART";
const NO_CART = "session/REMOVE_CART";

const getCart = (cart) => ({
	type: GET_CART,
	payload: cart,
});

const noCart = () => ({
	type: NO_CART,
});


export const postCartThunk = restaurantId => async dispatch => {
	const response = await fetch(`/api/restaurants/${restaurantId}/shopping-cart`, {
	method: "POST"
 })

 if (response.ok) {
	 const responseData = await response.json()
	 dispatch(getCart(responseData));
	 return responseData
	}
}

export const getCartThunk = () => async (dispatch) => {
	const response = await fetch("/api/session/shopping-cart");
	if (response.ok) {
		const responseData = await response.json()
		if (responseData.message) {
			dispatch(noCart())
		}
		else {
			dispatch(getCart(responseData));
		}
	}
};

export const noCartThunk = () => async dispatch => {
	const response = await fetch(`/api/shopping-cart/`, {
		method: 'DELETE'
	})
  if (response.ok) {
		dispatch(noCart())
  }
}

const initialState = { cart: null };

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART:
			return { [action.payload.cart.id]: action.payload.cart, restaurant: action.payload.restaurant, items: action.payload.items };
		case NO_CART:
			return { cart: null };
			default:
				return state;
			}
		}
