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
import AccountSettings from "./components/AccountSettingsPage";
import RestaurantList from "./components/RestaurantManagement/RestaurantList";
import Alert from "./components/Alert";
import Checkout from "./components/Checkout";
import SearchResults from "./components/SearchResults";

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
            <Checkout />
          </Route>
          <Route exact path="/new">
            <RestaurantForm />
          </Route>
          <Route path="/search">
            <SearchResults />
          </Route>
          <Route exact path="/account">
            <AccountSettings />
          </Route>
          <Route exact path="/manageRestaurants">
            <RestaurantList />
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
      <Alert />
    </>
  );
}

export default App;
