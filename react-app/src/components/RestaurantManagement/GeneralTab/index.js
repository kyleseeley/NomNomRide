import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRestaurant } from "../../../store/restaurant";
import RestaurantForm from "../RestaurantForm";
import RestaurantInfo from "../RestaurantInfo";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";
import "./generalTab.css";
const GeneralTab = ({ restaurant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (restaurantId) => {
    await dispatch(deleteRestaurant(restaurantId));
    closeModal();
    history.push(`/`);
  };

  return (
    <div>
      <div className="general-info-container">
        {!isEditing && <RestaurantInfo restaurant={restaurant} />}
      </div>
      {isEditing && (
        <RestaurantForm
          restaurant={restaurant}
          onFinish={() => setIsEditing(false)}
        />
      )}
      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
      )}
      {!isEditing && (
        <OpenModalButton
          buttonText={
            <div>
              <i class="fa-solid fa-trash" /> Delete
            </div>
          }
          modalComponent={() => (
            <div>
              <h3>Are you sure to delete this restaurant?</h3>
              <button
                className="primary"
                onClick={() => handleDelete(restaurant.id)}
              >
                Yes
              </button>
              <button onClick={closeModal}>No</button>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default GeneralTab;
