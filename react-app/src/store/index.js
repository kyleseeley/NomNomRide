import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import restaurantReducer from './restaurant';
import menuItemsReducer from "./menuItems"
import sessionReducer from './session';
// import shoppingCartReducer from './shoppingCart';
// import shoppingCartItemReducer from './shoppingCartItems';
// import reviewReducer from './reviews';
const rootReducer = combineReducers({
  session: sessionReducer,
  restaurant: restaurantReducer,
  menuItems: menuItemsReducer,
  // shoppingCart: shoppingCartReducer,
  // shoppingCartItems: shoppingCartItemsReducer
  // reviews: reviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
