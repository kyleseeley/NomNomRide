export const FETCH_MENU_ITEMS = "menuItems/FETCH_MENU_ITEMS";
export const FETCH_ONE_MENU_ITEM = "menuItems/FETCH_ONE_MENU_ITEM";
export const CREATE_OR_EDIT_MENU_ITEM = "menuItems/CREATE_OR_EDIT_MENU_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";

// action creators
export const fetchMenuItems = (menuItems) => ({
  type: FETCH_MENU_ITEMS,
  menuItems,
});

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
    const payload = data.menuItems.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
    dispatch(fetchMenuItems(payload));
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
      dispatch({ type: CREATE_OR_EDIT_MENU_ITEM, menuItem: data });
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
    dispatch({ type: CREATE_OR_EDIT_MENU_ITEM, menuItem: updatedItem });
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

export const deleteMenuItem = (itemId, restaurantId) => async (dispatch) => {
  const url = `/api/items/${itemId}`;

  const response = await fetch(url, {
    method: "DELETE",
  });
  await response.json();

  dispatch(remove(itemId, restaurantId));
};

const initialState = {};

export default function menuItemsReducer(state = initialState, action) {
  const newItems = { ...state };
  switch (action.type) {
    case CREATE_OR_EDIT_MENU_ITEM:
      const newOrEditedItem = action.menuItem;
      newItems[newOrEditedItem.id] = newOrEditedItem;
      return newItems;
    case FETCH_MENU_ITEMS:
      return { ...action.menuItems };
    case REMOVE_ITEM:
      delete newItems[action.itemId];
      return newItems;
    default:
      return state;
  }
}
