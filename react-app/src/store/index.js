import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import restaurantReducer from "./restaurant";
import menuItemsReducer from "./menuItems";
import sessionReducer from "./session";
import cartReducer from "./cart";
import reviewReducer from "./reviews";
import alertReducer from "./alert";
import mapsReducer from "./maps";

const rootReducer = combineReducers({
  session: sessionReducer,
  restaurant: restaurantReducer,
  menuItems: menuItemsReducer,
  reviews: reviewReducer,
  cart: cartReducer,
  alert: alertReducer,
  maps: mapsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
