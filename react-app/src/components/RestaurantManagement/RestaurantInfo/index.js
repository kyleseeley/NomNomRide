import React from "react";

const RestaurantInfo = ({ restaurant }) => {
  return (
    <div>
      <div>name: {restaurant.name}</div>
      <div>address: {restaurant.address}</div>
      <div>city: {restaurant.city}</div>
      <div>state: {restaurant.state}</div>
      <div>image: {restaurant.image}</div>
      <div>type: {restaurant.type}</div>
      <div>lat: {restaurant.lat}</div>
      <div>lng: {restaurant.lng}</div>
    </div>
  );
};

export default RestaurantInfo;
