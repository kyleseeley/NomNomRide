import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteRestaurant } from "../../../store/restaurant";
import RestaurantForm from "../RestaurantForm";
import RestaurantInfo from "../RestaurantInfo";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";

const GeneralTab = ({ restaurant }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async (restaurantId) => {
    await dispatch(deleteRestaurant(restaurantId));
    closeModal()
    history.push(`/`);
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
      <OpenModalButton
        buttonText="Delete"
        modalComponent={() => (
          <div>
            <h3>Are you sure to delete this restaurant?</h3>
            <button className="primary" onClick={() => handleDelete(restaurant.id)}>
              Yes
            </button>
            <button onClick={closeModal}>No</button>
          </div>
        )}
      />
    </div>
  );
};

export default GeneralTab;
