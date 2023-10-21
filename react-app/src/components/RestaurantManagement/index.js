import React, { useEffect, useState } from "react";
import { useParams, Link, Route, Switch } from "react-router-dom";
import { fetchOneRestaurant } from "../../store/restaurant";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenuItemsThunk } from "../../store/menuItems";
import GeneralTab from "./GeneralTab";
import MenuItemsTab from "./MenuItemsTab";

const RestaurantManagement = () => {
  const dispatch = useDispatch();
  const { restaurantId } = useParams();
  const restaurant = useSelector((state) => {
    return state.restaurant[restaurantId];
  });
  const restaurantItems = useSelector((state) => state.menuItems);
  const itemList = Object.values(restaurantItems);
  useEffect(async () => {
    await dispatch(fetchOneRestaurant(restaurantId));
    await dispatch(fetchMenuItemsThunk(restaurantId));
  }, [dispatch, restaurantId]);
  if (restaurant === undefined)
    return <div className="page-container">loading...</div>;
  return (
    <div className="page-container">
      <h1>Manage your restaurant {restaurant.name}</h1>
      <tabs>
        <tab>
          <Link to={`/${restaurantId}/manage`}>
            <button>General</button>
          </Link>
        </tab>
        <tab>
          <Link to={`/${restaurantId}/manage/items`}>
            <button>Items</button>
          </Link>
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
