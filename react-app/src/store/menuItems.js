const CREATE_MENU_ITEM = "menuItems/CREATE_MENU_ITEM";
const FETCH_MENU_ITEM_REQUEST = "menuItems/FETCH_MENU_ITEM_REQUEST";
const FETCH_MENU_ITEM_SUCCESS = "menuItems/FETCH_MENU_ITEM_SUCCESS";

export const fetchMenuItems = (restaurantId) => async (dispatch) => {
  dispatch({
    type: FETCH_MENU_ITEM_REQUEST,
  });

  const response = await fetch(`/api/restaurants/${restaurantId}/items`);
  if (response.ok) {
    const data = await response.json();
    dispatch({ type: FETCH_MENU_ITEM_SUCCESS, menuItems: data.menuItems });
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const createMenuItem =
  (restaurantId, name, type, price, description, image) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        price,
        description,
        image,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: CREATE_MENU_ITEM, menuItem: data });
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

const initialState = { items: {}, fetchPending: true };

export default function reducer(state = initialState, action) {
  const newItems = { items: { ...state.items } };
  switch (action.type) {
    case CREATE_MENU_ITEM:
      const newlyCreatedItem = action.menuItem;
      newItems.items[newlyCreatedItem.id] = newlyCreatedItem;
      return newItems;
    case FETCH_MENU_ITEM_REQUEST:
      newItems.fetchPending = true;
      return newItems;
    case FETCH_MENU_ITEM_SUCCESS:
      newItems.fetchPending = false;
      action.menuItems.forEach((item) => {
        newItems.items[item.id] = item;
      });
      return newItems;
    default:
      return state;
  }
}
