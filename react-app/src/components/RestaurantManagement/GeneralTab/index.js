import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRestaurant } from "../../../store/restaurant";
import RestaurantForm from "../RestaurantForm";
import RestaurantInfo from "../RestaurantInfo";
const GeneralTab = ({ restaurant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (restaurantId) => {
    dispatch(deleteRestaurant(restaurantId));
  };

  return (
    <div>
      {!isEditing && <RestaurantInfo restaurant={restaurant} />}
      {isEditing && (
        <RestaurantForm
          restaurant={restaurant}
          onSubmit={() => setIsEditing(false)}
        />
      )}
      {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
    </div>
  );
};

export default GeneralTab;
