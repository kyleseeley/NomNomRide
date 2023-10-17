const CREATE_MENU_ITEM = "menuItems/CREATE_MENU_ITEM";

export const createMenuItem =
  (name, type, price, description, image) => async (dispatch) => {
    const response = await fetch("/api/menuItems", {
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

const initialState = { items: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MENU_ITEM:
        const newItems = {...state.items}
        const newlyCreatedItem = action.menuItem
        newItems[newlyCreatedItem.id] = newlyCreatedItem
      return newItems;
    default:
      return state;
  }
}
