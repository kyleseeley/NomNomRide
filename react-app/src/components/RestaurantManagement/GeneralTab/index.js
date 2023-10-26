import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRestaurant } from "../../../store/restaurant";
import RestaurantForm from "../RestaurantForm";
import RestaurantInfo from "../RestaurantInfo";
import "./generalTab.css";
import { useModal } from "../../../context/Modal";
const GeneralTab = ({ restaurant }) => {
  const { closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (restaurantId) => {
    await dispatch(deleteRestaurant(restaurantId));
    closeModal();
    history.push(`/`);
  };

  return (
    <div className="general-info-container">
      {!isEditing && (
        <RestaurantInfo
          restaurant={restaurant}
          onEditClick={() => setIsEditing(true)}
          onDeleteConfirmed={() => handleDelete(restaurant.id)}
        />
      )}
      {isEditing && (
        <RestaurantForm
          restaurant={restaurant}
          onFinish={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default GeneralTab;
