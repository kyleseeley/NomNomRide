import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import RestaurantDetails from "./components/RestaurantDetails";
import MenuItemForm from "./components/RestaurantManagement/MenuItemForm";
import RestaurantManagement from "./components/RestaurantManagement";
import RestaurantForm from "./components/RestaurantManagement/RestaurantForm";
// import Checkout from ./components/Checkout

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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route exact path="/checkout">
            {/* <Checkout /> */}
          </Route>
          <Route exact path="/new">
            <RestaurantForm />
          </Route>
          <Route exact path="/search">
            {/* <SearchResults /> */}
          </Route>
          <Route path="/:restaurantId/manage">
            <RestaurantManagement />
          </Route>
          <Route exact path="/:restaurantId/menuItems/new">
            <MenuItemForm />
          </Route>
          <Route exact path="/:restaurantId/menuItems/:itemId/edit">
            <MenuItemForm />
          </Route>
          <Route exact path="/:restaurantId">
            <RestaurantDetails />
          </Route>
        </Switch>
      )}
      <Navigation isLoaded={isLoaded} />
    </>
  );
}

export default App;
