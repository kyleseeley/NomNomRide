import { csrfFetch } from "./csrf";

export const LOAD_RESTAURANTS = "/restaurants/LOAD_RESTAURANTS";
export const LOAD_ONE_RESTAURANT = '/restaurants/LOAD_ONE_RESTAURANT'

export const loadRestaurants = (restaurants) => ({
    type: LOAD_RESTAURANTS,
    restaurants
});

export const loadOneRestaurant = (restaurant) => ({
    type: LOAD_ONE_RESTAURANT,
    restaurant
});

export const fetchRestaurants = () => async (dispatch) => {
    try {
        const response = await fetch("/api/restaurants/")

        if (!response.ok) {
            throw new Error("Error fetching restaurants");
        }

        const responseData = await response.json();
        console.log("response data", responseData)
        dispatch(loadRestaurants(responseData))
    }
    catch (error) {
        console.log("Error fetching restaurants", error)
    }
}

export const fetchOneRestaurant = (restaurantId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/restaurants/${restaurantId}`)

        if (!response.ok) {
            throw new Error("Error fetching restaurant");
        }

        const responseData = await response.json();
        dispatch(loadOneRestaurant(responseData))
    }
    catch (error) {
        console.log("Error fetching restaurant", error)
    }
}

const initialState = {
    allRestaurants: []
}

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_RESTAURANTS:
            return { ...state, allRestaurants: action.restaurants}
        case LOAD_ONE_RESTAURANT:
            return { ...state, restaurant: action.restaurant}
        default:
            return state;
    }
}

export default restaurantReducer;
