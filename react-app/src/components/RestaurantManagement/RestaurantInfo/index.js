import React from "react";
import OpenModalButton from "../../OpenModalButton";
import { useModal } from "../../../context/Modal";

const RestaurantInfo = ({ restaurant, onEditClick, onDeleteConfirmed }) => {
  const { closeModal } = useModal();
  return (
    <div className="login-form-container">
      <div className="form-wrapper">
        <h1>Restaurant</h1>
        <table>
          <tr>
            <td>
              <label>Name:</label>
            </td>
            <td>{restaurant.name}</td>
          </tr>
          <tr>
            <td>
              <label>Address:</label>
            </td>
            <td>
              <input type="text" value={restaurant.address} />
            </td>
          </tr>
          <tr>
            <td>
              <label>City:</label>
            </td>
            <td>
              <input type="text" value={restaurant.city} />
            </td>
          </tr>
          <tr>
            <td>
              <label>State:</label>
            </td>
            <td>
              <input type="text" value={restaurant.state} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Image:</label>
            </td>
            <td>
              <input type="text" value={restaurant.image} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Type:</label>
            </td>
            <td>
              <input type="text" value={restaurant.type} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Latitude:</label>
            </td>
            <td>
              <input type="text" value={restaurant.lat} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Longitude:</label>
            </td>
            <td>
              <input type="text" value={restaurant.lng} />
            </td>
          </tr>
        </table>
        <button className="cart-button" onClick={onEditClick}>
          <i className="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <OpenModalButton
          className="login-button"
          buttonText={
            <div>
              <i className="fa-solid fa-trash" /> Delete
            </div>
          }
          modalComponent={() => (
            <div>
              <h3>Are you sure to delete this restaurant?</h3>
              <button className="primary" onClick={onDeleteConfirmed}>
                Yes
              </button>
              <button onClick={closeModal}>No</button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default RestaurantInfo;
