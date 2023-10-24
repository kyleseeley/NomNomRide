import { csrfFetch } from "./csrf";

// export const LOAD_CARTITEMS = "/shopping-cart-items/LOAD_CARTITEMS";
// export const LOAD_ONE_CARTITEM = "/shopping-cart-items/LOAD_ONE_CARTITEM";
// export const DELETE_ONE_CARTITEM = "/shopping-cart-items/DELETE_ONE_CARTITEM";

// export const loadCartItems = (items) => ({
//   type: LOAD_CARTITEMS,
//   items,
// });

// export const loadOneCartItem = (item) => ({
//   type: LOAD_ONE_CARTITEM,
//   item,
// });

// export const deleteOneCartItem = (itemId) => ({
//   type: DELETE_ONE_CARTITEM,
//   itemId,
// });

export const getCartItemsThunk = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/session/shopping-cart");
    if (response.ok) {
      // const responseData = await response.json();
      // if (responseData.message) {
      //   dispatch(loadCartItems({}))
      // }
      // else {
      //   dispatch(loadCartItems(responseData.items));
      // }
    }
  } catch (error) {
    console.log("Error fetching items", error);
  }
};

export const postCartItemThunk =
  (menuItemId, quantity) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/items/${menuItemId}/shopping-cart-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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

export const updateCartItemThunk = (itemId, quantity) => async (dispatch) => {
  try {
    await fetch(`/api/shopping-cart-items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity
      }),
    });

    // const responseData = await response.json();
    // dispatch(loadOneCartItem(responseData));
  } catch (error) {
    console.log("Could not update item", error);
  }
};

export const deleteCartItemThunk = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/shopping-cart-items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error delete item");
    }

    // dispatch(deleteOneCartItem(id));
  } catch (error) {
    console.log("Error delete item", error);
  }
};

// const initialState = {};

// const cartItemReducer = (state = initialState, action) => {
//   let newState;
//   switch (action.type) {
//     case LOAD_CARTITEMS:
//       newState = {};
//       action.items.forEach((item) => {
//         newState[item.id] = item;
//       });
//       return newState;
//     case LOAD_ONE_CARTITEM:
//       return { ...state, [action.item.id]: action.item }
//     case DELETE_ONE_CARTITEM:
//       newState = { ...state };
//       delete newState[action.itemId];
//       return newState;
//     default:
//       return state;
//   }
// };

// export default cartItemReducer;
