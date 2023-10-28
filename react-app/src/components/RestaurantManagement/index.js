import React, { useEffect, useState } from "react";
import {
  useParams,
  Route,
  useRouteMatch,
  useHistory,
  Link,
} from "react-router-dom";
import { fetchOneRestaurant } from "../../store/restaurant";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenuItemsThunk } from "../../store/menuItems";
import GeneralTab from "./GeneralTab";
import MenuItemsTab from "./MenuItemsTab";
import "./Tabs.css";

const RestaurantManagement = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const history = useHistory();
  const isMatchedItems =
    useRouteMatch({ path: "/:restaurantId/manage/items" }) !== null;
  const restaurant = useSelector((state) => {
    return state.restaurant[restaurantId];
  });
  const restaurantItems = useSelector((state) => state.menuItems);
  const itemList = Object.values(restaurantItems);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(async () => {
    await dispatch(fetchOneRestaurant(restaurantId));
    await dispatch(fetchMenuItemsThunk(restaurantId));
  }, [dispatch, restaurantId]);
  if (restaurant === undefined)
    return <div className="page-container container-padding">loading...</div>;
  return (
    <div className="page-container container-padding">
      <h1>Manage your restaurant "{restaurant.name}"</h1>
      <tabs value={value} onChange={handleChange} centered>
        <tab className={isMatchedItems ? "" : "active"}>
          <button
            className="login-button"
            onClick={() => history.push(`/${restaurantId}/manage`)}
          >
            General
          </button>
        </tab>
        <tab className={isMatchedItems ? "active" : ""}>
          <button
            className="login-button"
            onClick={() => history.push(`/${restaurantId}/manage/items`)}
          >
            Items
          </button>
        </tab>
      </tabs>
      <Route exact path="/:restaurantId/manage">
        <GeneralTab restaurant={restaurant} />
      </Route>
      <Route exact path="/:restaurantId/manage/items">
        <MenuItemsTab itemList={itemList} />
      </Route>
    </div>
  );
};

export default RestaurantManagement;
