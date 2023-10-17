import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import RestaurantDetails from './components/RestaurantDetails'
import NewMenuItem from "./components/MenuItems/NewMenuItem";
// import Checkout from ./components/Checkout
// import newRestaurant from ./components/newRestaurant
// import Search from ./components/Search

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/:restaurantId">
            <RestaurantDetails />
          </Route>
          <Route exact path="/:restaurantId/menuItems/new">
            <NewMenuItem />
          </Route>
          <Route exact path="/checkout">
            {/* <Checkout /> */}
          </Route>
          <Route exact path="/new">
            {/* <NewRestaurant /> */}
          </Route>
          <Route exact path="/search">
            {/* <SearchResults /> */}
          </Route>
        </Switch>
      )}
      <Navigation isLoaded={isLoaded} />
    </>
  );
}

export default App;
