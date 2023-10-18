export const FETCH_MENU_ITEMS = "menuItems/FETCH_MENU_ITEMS";
export const CREATE_MENU_ITEM = "menuItems/CREATE_MENU_ITEM";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";

// action creators
export function fetchMenuItems(menuItems) {
  return {
    type: FETCH_MENU_ITEMS,
    payload: menuItems,
  };
}

export const remove = (itemId, restaurantId) => ({
  type: REMOVE_ITEM,
  itemId,
  restaurantId,
});

// Thunks
export const fetchMenuItemsThunk = (restaurantId) => async (dispatch) => {
  const response = await fetch(`/api/restaurants/${restaurantId}/items`);
  if (response.ok) {
    const data = await response.json();
    dispatch(fetchMenuItems(data.menuItems));
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

export const editMenuItem = (item) => async (dispatch) => {
  const url = `/api/items/${item.id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (response.ok) {
    const updatedItem = await response.json();
    dispatch({ type: CREATE_MENU_ITEM, menuItem: updatedItem });
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

export const deleteItem = (item, restaurantId) => async (dispatch) => {
  const url = `/api/items/${item.id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });
  await response.json();

  dispatch(remove(item.id, restaurantId));
};

const initialState = { items: {}, fetchPending: true };

export default function menuItemsReducer(state = initialState, action) {
  const newItems = { items: { ...state.items } };
  switch (action.type) {
    case CREATE_MENU_ITEM:
      const newlyCreatedItem = action.menuItem;
      newItems.items[newlyCreatedItem.id] = newlyCreatedItem;
      return newItems;
    case FETCH_MENU_ITEMS:
      return { ...action.payload };
    default:
      return state;
  }
}
