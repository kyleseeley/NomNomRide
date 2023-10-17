import { csrfFetch } from "./csrf";

export const LOAD_RESTAURANTS = "/restaurants/LOAD_RESTAURANTS";

export const loadRestaurants = (restaurants) => ({
    type: LOAD_RESTAURANTS,
    restaurants
});

export const fetchRestuarants = () => async (dispatch) => {
    try {
        const response = await fetch("/api/restaurants/")

        if (!response.ok) {
            throw new Error("Error fetching restaurants");
          }
        
        const resonseData = await response.json();
        
        dispatch(loadRestaurants(resonseData))
    }
    catch (error) {
        console.log("Error fetching restaurants", error)
    }
}

const initialState = {
    allRestaurants: []
}

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RESTAURANTS:
            return { ...state, allRestaurants: Object.values(action.restaurants)}
        default:
            return state;
    }
}

export default restaurantReducer;