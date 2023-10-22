import { csrfFetch } from "./csrf";

export const LOAD_CARTITEMS = "/items/LOAD_CARTITEMS";
export const LOAD_ONE_CARTITEM = "/items/LOAD_ONE_CARTITEM";
export const DELETE_ONE_CARTITEM = "/items/DELETE_ONE_CARTITEM";

export const loadCartItems = (items) => ({
  type: LOAD_CARTITEMS,
  items,
});

export const loadOneCartItem = (restaurant) => ({
  type: LOAD_ONE_CARTITEM,
  restaurant,
});

export const deleteOneCartItem = (itemId) => ({
  type: DELETE_ONE_CARTITEM,
  itemId,
});

export const fetchCartItems = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/items");
    if (response.ok) {
      const responseData = await response.json();
      dispatch(loadCartItems(responseData.items));
    }
  } catch (error) {
    console.log("Error fetching items", error);
  }
};

export const postCartItem =
  (cartId, menuItemId, quantity) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/items/${menuItemId}/shopping-cart-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          menuItemId,
          quantity
        }),
      });

      if (!response.ok) {
        throw new Error("Error create item");
      }

      const responseData = await response.json();
      // dispatch(loadOneCartItem(responseData));
      return responseData.id;
    } catch (error) {
      console.log("Error create item", error);
    }
  };

export const updateCartItem =
  (itemId, quantity) =>
  async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity
        }),
      });

      if (!response.ok) {
        throw new Error("Error update item");
      }

      const responseData = await response.json();
      dispatch(loadOneCartItem(responseData));
    } catch (error) {
      console.log("Error update item", error);
    }
  };

export const deleteCartItem = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error delete item");
    }

    dispatch(deleteOneCartItem(id));
  } catch (error) {
    console.log("Error delete item", error);
  }
};

const initialState = {};

const itemReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_CARTITEMS:
      newState = {};
      action.items.forEach((item) => {
        newState[item.id] = item;
      });
      return newState;
    case LOAD_ONE_CARTITEM:
      return { ...state, [action.item.id]: action.item }
    case DELETE_ONE_CARTITEM:
      newState = { ...state };
      delete newState[action.itemId];
      return newState;
    default:
      return state;
  }
};

export default itemReducer;
