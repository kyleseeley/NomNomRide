// constants
const GET_CART = "session/GET_CART";
const DELETE_CART = "session/REMOVE_CART";

const getCart = (cart) => ({
	type: GET_CART,
	cart,
});

const deleteCart = (restaurantId) => ({
	type: DELETE_CART,
	restaurantId
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
		if (Object.keys(responseData).length) {
			const formattedCarts = {}
			for (const data of responseData) {
				formattedCarts[data['cart']['id']] = data // fix? maybe not supposed to be restaurantId
			}
			dispatch(getCart(formattedCarts));
		}
	}
	else {
		throw new Error("getCartThunk failed to fetch")
	}
};

export const deleteCartThunk = cartId => async dispatch => {
	const response = await fetch(`/api/shopping-cart/${cartId}`, { // maybe supposed to be restaurantID
		method: 'DELETE'
	})
  if (response.ok) {
		dispatch(deleteCart(cartId))
  }
}

const initialState = {};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CART:
			return { ...action.cart };
		case DELETE_CART:
			const newState = {...state}
			delete newState[action.restaurantId]
			return newState
			default:
				return state;
			}
		}
