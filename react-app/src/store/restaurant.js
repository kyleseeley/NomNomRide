import { csrfFetch } from "./csrf";

export const LOAD_RESTAURANTS = "/restaurants/LOAD_RESTAURANTS";
export const LOAD_ONE_RESTAURANT = "/restaurants/LOAD_ONE_RESTAURANT";
export const DELETE_ONE_RESTAURANT = "/restaurants/DELETE_ONE_RESTAURANT";

export const loadRestaurants = (restaurants) => ({
  type: LOAD_RESTAURANTS,
  restaurants,
});

export const loadOneRestaurant = (restaurant) => ({
  type: LOAD_ONE_RESTAURANT,
  restaurant,
});

export const deleteOneRestaurant = (restaurantId) => ({
  type: DELETE_ONE_RESTAURANT,
  restaurantId,
});

export const fetchRestaurants = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/restaurants/");

    if (!response.ok) {
      throw new Error("Error fetching restaurants");
    }

    const responseData = await response.json();
    dispatch(loadRestaurants(responseData.restaurants));
  } catch (error) {
    console.log("Error fetching restaurants", error);
  }
};

export const fetchOneRestaurant = (restaurantId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/restaurants/${restaurantId}`);

    if (!response.ok) {
      throw new Error("Error fetching restaurant");
    }

    const responseData = await response.json();
    dispatch(loadOneRestaurant(responseData));
  } catch (error) {
    console.log("Error fetching restaurant", error);
  }
};

export const createNewRestaurant =
  (address, city, state, lat, lng, name, type, image) => async (dispatch) => {
    try {
      const response = await csrfFetch("/api/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          city,
          state,
          lat,
          lng,
          name,
          type,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Error create restaurant");
      }

      const responseData = await response.json();
      dispatch(loadOneRestaurant(responseData));
    } catch (error) {
      console.log("Error create restaurant", error);
    }
  };

export const updateRestaurant =
  (address, city, state, lat, lng, name, type, image) => async (dispatch) => {
    try {
      const response = await csrfFetch("/api/restaurants", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          city,
          state,
          lat,
          lng,
          name,
          type,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Error update restaurant");
      }

      const responseData = await response.json();
      dispatch(loadOneRestaurant(responseData));
    } catch (error) {
      console.log("Error update restaurant", error);
    }
  };

export const deleteRestaurant = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/restaurants/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error delete restaurant");
    }

    dispatch(deleteOneRestaurant(id));
  } catch (error) {
    console.log("Error delete restaurant", error);
  }
};

const initialState = {
  allRestaurants: {},
};

const restaurantReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_RESTAURANTS:
      newState.allRestaurants = {};
      action.restaurants.forEach((restaurant) => {
        newState.allRestaurants[restaurant.id] = restaurant;
      });
      return newState;
    case LOAD_ONE_RESTAURANT:
      newState.allRestaurants = { ...state.allRestaurants };
      newState.allRestaurants[action.restaurant.id] = action.restaurant;
      return newState;
    case DELETE_ONE_RESTAURANT:
      newState.allRestaurants = { ...state.allRestaurants };
      delete newState.allRestaurants[action.restaurantId];
      return newState;
    default:
      return state;
  }
};

export default restaurantReducer;
